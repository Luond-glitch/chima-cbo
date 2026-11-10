import { useState } from 'react';
import { Copy, Check, Heart, Send, AlertTriangle } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import FormStatus from '../components/FormStatus.jsx';
import { donate } from '../data/donate.js';
import { contact } from '../data/site.js';
import { getIcon } from '../utils/icons.js';
import { postForm } from '../utils/api.js';

function CopyValue({ value }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* ignore */ }
  };
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copy ${value}`}>
      {done ? <Check size={15} /> : <Copy size={15} />} {done ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function Donate() {
  const [active, setActive] = useState(donate.options[0].id);
  const [amount, setAmount] = useState(1000);
  const [f, setF] = useState({ name: '', email: '', phone: '', method: donate.options[0].title, message: '', website: '' });
  const [status, setStatus] = useState({ state: 'idle' });
  const [sending, setSending] = useState(false);
  const option = donate.options.find((o) => o.id === active);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const choose = (o) => { setActive(o.id); setF((x) => ({ ...x, method: o.title })); };

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setStatus({ state: 'idle' });
    try {
      await postForm('/api/donate', { ...f, amount });
      setStatus({ state: 'success', message: 'Thank you for your generosity! Your pledge has been sent to our team.' });
      setF({ name: '', email: '', phone: '', method: f.method, message: '', website: '' });
    } catch (err) { setStatus({ state: 'error', message: err.message }); }
    finally { setSending(false); }
  };

  return (
    <>
      <PageHeader title="Support Our Work" subtitle="Your gift helps young people restore land and build climate resilience" crumb="Donate" />

      <section className="section">
        <div className="container">
         

          <SectionHeading eyebrow="Ways to give" title="Choose how you would like to donate" />

          <div className="pay-tabs" role="tablist" aria-label="Payment options">
            {donate.options.map((o) => {
              const Icon = getIcon(o.icon);
              return (
                <button key={o.id} role="tab" aria-selected={o.id === active}
                  className={`pay-tab ${o.id === active ? 'active' : ''}`} onClick={() => choose(o)}>
                  <Icon size={20} /> <span>{o.title}</span>
                </button>
              );
            })}
          </div>

          <div className="pay-panel" key={option.id} role="tabpanel">
            <div>
              <h3>{option.title}</h3>
              <p className="muted">{option.note}</p>
              <dl className="pay-details">
                {option.details.map((d) => (
                  <div key={d.label}>
                    <dt>{d.label}</dt>
                    <dd><span className="big-num">{d.value}</span>{/^[A-Z0-9 ]{3,}$/i.test(d.value) && d.value !== 'Coming soon' && <CopyValue value={d.value} />}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h4>How to pay</h4>
              <ol className="steps">{option.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container two-col top">
          <Reveal variant="left">
            <span className="eyebrow">Where your gift goes</span>
            <h2>Every shilling grows something</h2>
            <p>Donations support CHIMA's constitutional objectives. Pick an area below to tell us what matters most to you.</p>
            <div className="impact-grid">
              {donate.impact.map((i) => {
                const Icon = getIcon(i.icon);
                return <div key={i.title} className="impact"><span className="icon-badge"><Icon size={22} /></span><div><strong>{i.title}</strong><p>{i.text}</p></div></div>;
              })}
            </div>
          </Reveal>

          <Reveal variant="right">
            <form className="form card" onSubmit={submit}>
              <h3><Heart size={20} /> Tell us about your gift</h3>
              <p className="muted">After paying, send us a quick note so we can thank you and issue an acknowledgement.</p>
              <FormStatus status={status} />
              <div className="amount-row" role="group" aria-label="Amount">
                {donate.presetAmounts.map((a) => (
                  <button type="button" key={a} className={`chip ${amount === a ? 'active' : ''}`} onClick={() => setAmount(a)}>{donate.currency} {a.toLocaleString()}</button>
                ))}
              </div>
              <label>Amount ({donate.currency})<input type="number" min="1" required value={amount} onChange={(e) => setAmount(Number(e.target.value))} /></label>
              <label>Payment method
                <select value={f.method} onChange={set('method')}>{donate.options.map((o) => <option key={o.id}>{o.title}</option>)}</select>
              </label>
              <div className="form-row">
                <label>Full name<input required value={f.name} onChange={set('name')} /></label>
                <label>Email<input type="email" required value={f.email} onChange={set('email')} /></label>
              </div>
              <label>Phone (optional)<input type="tel" value={f.phone} onChange={set('phone')} /></label>
              <label>Message / M-Pesa confirmation code (optional)<textarea rows="3" value={f.message} onChange={set('message')} /></label>
              <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={set('website')} />
              <button className="btn btn-gold" type="submit" disabled={sending}>{sending ? 'Sending…' : <>Send pledge <Send size={16} /></>}</button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
