import { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import FormStatus from '../components/FormStatus.jsx';
import { membership, contact } from '../data/site.js';
import { programmes } from '../data/programmes.js';
import { postForm } from '../utils/api.js';

const TYPES = [...membership.categories.map((c) => c.name), 'Partner / Volunteer'];
const NEEDS_ORG = ['Group / Pastoral Association', 'Institutional / Partner Member', 'Partner / Volunteer'];
const empty = { type: TYPES[0], fullName: '', email: '', phone: '', town: '', organisation: '', interests: [], message: '', consent: false, website: '' };

export default function Register() {
  const [f, setF] = useState(empty);
  const [status, setStatus] = useState({ state: 'idle' });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (t) => setF({ ...f, interests: f.interests.includes(t) ? f.interests.filter((x) => x !== t) : [...f.interests, t] });
  const fee = membership.categories.find((c) => c.name === f.type)?.fee;

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus({ state: 'idle' });
    try {
      await postForm('/api/register', f);
      setStatus({ state: 'success', message: 'Thank you! Your application has been received. The Executive Committee will review it and contact you.' });
      setF(empty);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    } finally { setSending(false); }
  };

  return (
    <>
      <PageHeader title="Become a Member or Partner" subtitle="Join the young shoots of change" crumb="Register" />
      <section className="section">
        <div className="container two-col top">
          <Reveal variant="left" className="register-side">
            <h2>Why join CHIMA?</h2>
            <p>{membership.eligibility}</p>
            <ul className="check-list big">
              <li>Take part in meetings and activities</li>
              <li>Vote and be elected (where applicable)</li>
              <li>Access organisational information</li>
              <li>Help advance climate action in your community</li>
            </ul>
            <div className="note">
              <strong>How admission works:</strong> {membership.admission}
            </div>
            <h3 className="mt">Fees</h3>
            <table className="fee-table small">
              <tbody>
                {membership.categories.map((c) => <tr key={c.name}><td>{c.name}</td><td>{c.fee}</td></tr>)}
                <tr><td>Annual renewal</td><td>KSh 100</td></tr>
              </tbody>
            </table>
          </Reveal>

          <Reveal variant="right">
            <form className="form card" onSubmit={submit} noValidate={false}>
              <h3>Registration form</h3>
              <FormStatus status={status} />
              <label>I would like to register as
                <select value={f.type} onChange={set('type')}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
              {fee && <p className="fee-hint">Fee for this category: <strong>{fee}</strong> – payable after approval.</p>}
              <div className="form-row">
                <label>Full name<input required value={f.fullName} onChange={set('fullName')} autoComplete="name" /></label>
                <label>Email<input type="email" required value={f.email} onChange={set('email')} autoComplete="email" /></label>
              </div>
              <div className="form-row">
                <label>Phone<input type="tel" required value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="07XX XXX XXX" /></label>
                <label>Town / Village / County<input required value={f.town} onChange={set('town')} /></label>
              </div>
              {NEEDS_ORG.includes(f.type) && (
                <label>Organisation / Group name<input required value={f.organisation} onChange={set('organisation')} /></label>
              )}
              <fieldset>
                <legend>Areas you are interested in</legend>
                <div className="check-grid">
                  {programmes.filter((p) => p.source === 'constitution').map((p) => (
                    <label key={p.id} className="check">
                      <input type="checkbox" checked={f.interests.includes(p.title)} onChange={() => toggle(p.title)} /> {p.title}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label>Tell us about yourself / why you want to join
                <textarea rows="4" value={f.message} onChange={set('message')} />
              </label>
              {/* honeypot – real visitors never see or fill this */}
              <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set('website')} />
              <label className="check consent">
                <input type="checkbox" required checked={f.consent} onChange={(e) => setF({ ...f, consent: e.target.checked })} />
                I agree to abide by the CHIMA Constitution and that CHIMA may contact me about my application.
              </label>
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? 'Sending…' : <>Submit application <Send size={16} /></>}
              </button>
              <small className="muted">Applications are emailed to {contact.email}.</small>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
