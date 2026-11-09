import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Inbox, Send, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import FormStatus from '../components/FormStatus.jsx';
import { contact } from '../data/site.js';
import { getIcon } from '../utils/icons.js';
import { postForm } from '../utils/api.js';

const empty = { name: '', email: '', subject: '', message: '', website: '' };
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Hospital Road DC Road Isiolo Town Kenya')}`;

export default function Contact() {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState({ state: 'idle' });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus({ state: 'idle' });
    try {
      await postForm('/api/contact', f);
      setStatus({ state: 'success', message: 'Thank you! Your message has been sent to CHIMA. We will reply soon.' });
      setF(empty);
    } catch (err) { setStatus({ state: 'error', message: err.message }); }
    finally { setSending(false); }
  };

  const items = [
    { icon: MapPin, title: 'Physical address', body: contact.address, extra: <a href={mapsUrl} target="_blank" rel="noreferrer" className="read-more">Open in Maps <ExternalLink size={14} /></a> },
    { icon: Inbox, title: 'Postal address', body: contact.postal },
    { icon: Mail, title: 'Email', body: <a href={`mailto:${contact.email}`}>{contact.email}</a> },
    { icon: Phone, title: 'Telephone', body: <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a> },
    { icon: Clock, title: 'Office hours', body: contact.hours },
  ];

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We would love to hear from you" crumb="Contact Us" />
      <section className="section">
        <div className="container two-col top">
          <div>
            <Reveal variant="left"><h2>Get in touch</h2></Reveal>
            <ul className="contact-list">
              {items.map((it, i) => (
                <Reveal as="li" key={it.title} variant="left" delay={i * 80}>
                  <span className="icon-badge"><it.icon size={20} /></span>
                  <div><strong>{it.title}</strong><p>{it.body}</p>{it.extra}</div>
                </Reveal>
              ))}
            </ul>
            <Reveal variant="left" delay={300}>
              <h3>Follow us</h3>
              <div className="social dark">
                {contact.social.map((s) => {
                  const Icon = getIcon(s.icon);
                  return <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}><Icon size={18} /></a>;
                })}
              </div>
            </Reveal>
          </div>

          <Reveal variant="right">
            <form className="form card" onSubmit={submit}>
              <h3>Send us a message</h3>
              <FormStatus status={status} />
              <div className="form-row">
                <label>Your name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
                <label>Your email<input type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></label>
              </div>
              <label>Subject<input required value={f.subject} onChange={set('subject')} /></label>
              <label>Message<textarea rows="6" required value={f.message} onChange={set('message')} /></label>
              <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set('website')} />
              <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Sending…' : <>Send message <Send size={16} /></>}</button>
              <small className="muted">Messages are delivered to {contact.email}.</small>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
