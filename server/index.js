// Small mail server for the CHIMA website.
// Receives the Contact, Registration and Donation-pledge forms and emails them to MAIL_TO (info@chima.org).
// Run: npm run dev:all (development) or npm run build && npm start (production – also serves the built site).
import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const MAIL_TO = process.env.MAIL_TO || 'info@chima.org';
const isProd = process.env.NODE_ENV === 'production';
const smtpReady = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = smtpReady
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE || 'false') === 'true', // true for port 465
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

const app = express();
app.set('trust proxy', 1);
app.use(express.json({ limit: '50kb' }));

app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000, max: 20, standardHeaders: true, legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' },
}));

// ---------- helpers ----------
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const str = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const fail = (res, msg, code = 400) => res.status(code).json({ error: msg });

function table(rows) {
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;color:#555;vertical-align:top"><b>${esc(k)}</b></td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
}

async function sendMail({ subject, rows, replyTo, ack }) {
  const html = `<h2 style="font-family:Arial,sans-serif;color:#1f4d2e">${esc(subject)}</h2>${table(rows)}<p style="font-size:12px;color:#888">Sent from the CHIMA website.</p>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

  if (!transporter) {
    if (isProd) throw new Error('Email service is not configured');
    console.log(`\n[DEV – SMTP not configured, email NOT sent]\nTo: ${MAIL_TO}\nSubject: ${subject}\n${text}\n`);
    return;
  }
  const from = process.env.MAIL_FROM || `"CHIMA Website" <${process.env.SMTP_USER}>`;
  await transporter.sendMail({ from, to: MAIL_TO, replyTo, subject, text, html });

  // Courtesy acknowledgement to the sender – failure here must not fail the request.
  if (ack && replyTo) {
    transporter.sendMail({ from, to: replyTo, subject: ack.subject, text: ack.text }).catch((e) => console.error('Ack mail failed:', e.message));
  }
}

const handler = (build) => async (req, res) => {
  try {
    if (req.body?.website) return res.json({ ok: true }); // honeypot: silently drop bots
    const mail = build(req.body || {}, res);
    if (!mail) return; // validation already responded
    await sendMail(mail);
    res.json({ ok: true });
  } catch (err) {
    console.error('Mail error:', err.message);
    fail(res, 'We could not send your message right now. Please email us directly at ' + MAIL_TO + '.', 500);
  }
};

// ---------- routes ----------
app.get('/api/health', (_req, res) => res.json({ ok: true, smtpConfigured: smtpReady, mailTo: MAIL_TO }));

app.post('/api/contact', handler((b, res) => {
  const d = { name: str(b.name, 120), email: str(b.email, 160), subject: str(b.subject, 160), message: str(b.message, 5000) };
  if (!d.name || !isEmail(d.email) || !d.subject || !d.message) return void fail(res, 'Please fill in all fields with a valid email address.');
  return {
    subject: `[CHIMA Website] ${d.subject}`, replyTo: d.email,
    rows: [['Name', d.name], ['Email', d.email], ['Subject', d.subject], ['Message', d.message]],
    ack: { subject: 'We received your message – CHIMA', text: `Dear ${d.name},\n\nThank you for contacting Chipukizi wa Mazingira (CHIMA). We have received your message and will reply soon.\n\nCHIMA Team\n${MAIL_TO}` },
  };
}));

app.post('/api/register', handler((b, res) => {
  const d = {
    type: str(b.type, 80), fullName: str(b.fullName, 120), email: str(b.email, 160), phone: str(b.phone, 40),
    town: str(b.town, 120), organisation: str(b.organisation, 160), message: str(b.message, 3000),
    interests: Array.isArray(b.interests) ? b.interests.slice(0, 12).map((i) => str(i, 100)) : [],
  };
  if (!d.type || !d.fullName || !isEmail(d.email) || !d.phone || !d.town) return void fail(res, 'Please complete all required fields with a valid email address.');
  if (!b.consent) return void fail(res, 'Please accept the declaration to continue.');
  return {
    subject: `[CHIMA Website] New ${d.type} application – ${d.fullName}`, replyTo: d.email,
    rows: [['Category', d.type], ['Full name', d.fullName], ['Email', d.email], ['Phone', d.phone], ['Town / County', d.town],
      ['Organisation', d.organisation], ['Interests', d.interests.join(', ')], ['About / motivation', d.message]],
    ack: { subject: 'Your CHIMA application has been received', text: `Dear ${d.fullName},\n\nThank you for applying to join Chipukizi wa Mazingira (CHIMA) as: ${d.type}.\nYour application will be reviewed by the Executive Committee and we will contact you.\n\nCHIMA Team\n${MAIL_TO}` },
  };
}));

app.post('/api/donate', handler((b, res) => {
  const amount = Number(b.amount);
  const d = { name: str(b.name, 120), email: str(b.email, 160), phone: str(b.phone, 40), method: str(b.method, 80), message: str(b.message, 2000) };
  if (!d.name || !isEmail(d.email) || !(amount > 0)) return void fail(res, 'Please enter your name, a valid email and an amount.');
  return {
    subject: `[CHIMA Website] Donation pledge – KSh ${amount.toLocaleString('en-KE')} from ${d.name}`, replyTo: d.email,
    rows: [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Amount (KSh)', String(amount)], ['Payment method', d.method], ['Note / reference', d.message]],
    ack: { subject: 'Thank you for supporting CHIMA', text: `Dear ${d.name},\n\nThank you for your generous pledge to Chipukizi wa Mazingira (CHIMA). Our team will confirm receipt of your payment and be in touch.\n\nCHIMA Team\n${MAIL_TO}` },
  };
}));

app.use('/api', (_req, res) => fail(res, 'Not found', 404));

// ---------- serve the built site in production ----------
const dist = path.join(__dirname, '..', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`CHIMA server on http://localhost:${PORT}  (mail to ${MAIL_TO}, SMTP ${smtpReady ? 'configured' : 'NOT configured – emails will only be logged in dev'})`);
});
