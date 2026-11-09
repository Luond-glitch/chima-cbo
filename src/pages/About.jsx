import { Target, Eye, CheckCircle2, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import ProgrammeCard from '../components/ProgrammeCard.jsx';
import { site, preamble, vision, mission, coreValues, objectives, proposedObjectives } from '../data/site.js';
import { programmes } from '../data/programmes.js';
import { getIcon } from '../utils/icons.js';

export default function About() {
  return (
    <>
      <PageHeader title="About CHIMA" subtitle="Chipukizi wa Mazingira – young shoots of the environment" crumb="About Us" />

      <section className="section">
        <div className="container two-col">
          <Reveal>
            <span className="eyebrow">Background</span>
            <h2>Why CHIMA exists</h2>
            {preamble.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
          <Reveal delay={100} className="profile-box">
            <h3>Organisational profile</h3>
            <dl>
              <dt>Name</dt><dd>{site.name} ({site.short})</dd>
              <dt>Legal status</dt><dd>{site.legalStatus}</dd>
              <dt>Area of operation</dt><dd>{site.areaOfOperation}, with possible expansion to other regions approved by the General Assembly</dd>
              <dt>Registered office</dt><dd><MapPin size={14} /> {site.headquarters} (headquarters)</dd>
              <dt>Financial year</dt><dd>{site.financialYear}</dd>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container grid-2">
          <Reveal className="mv-card"><span className="icon-badge"><Eye size={24} /></span><h3>Vision</h3><p>{vision}</p></Reveal>
          <Reveal className="mv-card" delay={120}><span className="icon-badge"><Target size={24} /></span><h3>Mission</h3><p>{mission}</p></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Core Values" title="What guides us" />
          <div className="values-grid">
            {coreValues.map((v, i) => {
              const Icon = getIcon(v.icon);
              return (
                <Reveal key={v.title} delay={i * 70} className="value-card">
                  <span className="icon-badge"><Icon size={24} /></span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container narrow">
          <SectionHeading eyebrow="Objectives" title="Our objectives" text="As set out in Article VI of the CHIMA Constitution." />
          <ol className="objective-list">
            {objectives.map((o) => (
              <Reveal as="li" key={o.no}><CheckCircle2 size={22} aria-hidden="true" /><div><strong>{o.no}</strong> {o.text}</div></Reveal>
            ))}
          </ol>
          <div className="note">
            <strong>Proposed additions (not yet in the Constitution):</strong>
            <ul>{proposedObjectives.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Areas of Intervention" title="How our objectives translate into action" />
          <div className="grid-3">
            {programmes.slice(0, 6).map((p, i) => <Reveal key={p.id} delay={i * 60}><ProgrammeCard programme={p} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
