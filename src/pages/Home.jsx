import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, MapPin, Building2, ShieldCheck } from 'lucide-react';
import Photo from '../components/Photo.jsx';
import BgImage from '../components/BgImage.jsx';
import Hero from '../components/Hero.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProgrammeCard from '../components/ProgrammeCard.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { programmes } from '../data/programmes.js';
import { sortedArticles } from '../data/articles.js';
import { site, preamble, mission, vision } from '../data/site.js';
import { getIcon } from '../utils/icons.js';

export default function Home() {
  const featured = programmes.filter((p) => p.source === 'constitution').slice(0, 3);
  const latest = sortedArticles().slice(0, 3);

  return (
    <>
      <Hero />

      {/* WHO WE ARE */}
      <section className="section" id="who-we-are">
        <div className="container two-col">
          <Reveal variant="left" className="about-image">
            <Photo src="/images/backgrounds/about" alt="Green restoration landscape in the drylands" loading="lazy" />
          </Reveal>
          <Reveal variant="right" delay={100}>
            <span className="eyebrow">Who We Are</span>
            <h2>A youth-driven voice for the environment</h2>
            <p>{preamble[0]}</p>
            <p>{preamble[1]}</p>
            <ul className="fact-list">
              <li><Building2 size={18} /> {site.legalStatus}</li>
              <li><MapPin size={18} /> Headquarters: {site.headquarters}</li>
              <li><ShieldCheck size={18} /> Guided by Articles 10, 42, 69 and 174 of the Constitution of Kenya</li>
            </ul>
            <Link to="/about" className="btn btn-primary">About CHIMA <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section section-sand">
        <div className="container grid-2">
          <Reveal variant="left" className="mv-card">
            <span className="icon-badge"><Target size={24} /></span>
            <h3>Our Mission</h3>
            <p>{mission}</p>
          </Reveal>
          <Reveal variant="right" className="mv-card" delay={120}>
            <span className="icon-badge"><Eye size={24} /></span>
            <h3>Our Vision</h3>
            <p>{vision}</p>
          </Reveal>
        </div>
      </section>

      {/* KEY AREAS OF FOCUS */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Key Areas of Focus" title="Where we work"
            text="Our objectives, set out in Article VI of the Constitution, shape these areas of intervention." />
          <div className="focus-grid">
            {programmes.filter((p) => p.source === 'constitution').map((p, i) => {
              const Icon = getIcon(p.icon);
              return (
                <Reveal key={p.id} variant="zoom" delay={i * 70} className="focus-item">
                  <span className="icon-badge"><Icon size={24} /></span>
                  <h3>{p.title}</h3>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PROGRAMMES */}
      <section className="section section-cream">
        <div className="container">
          <SectionHeading eyebrow="Programmes & Activities" title="Featured programmes" />
          <div className="grid-3">
            {featured.map((p, i) => <Reveal key={p.id} delay={i * 100}><ProgrammeCard programme={p} /></Reveal>)}
          </div>
          <div className="center-text mt"><Link to="/programmes" className="btn btn-primary">View all programmes <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Articles & Publications" title="Latest articles" />
          <div className="grid-3">
            {latest.map((a, i) => <Reveal key={a.id} delay={i * 100}><ArticleCard article={a} /></Reveal>)}
          </div>
          <div className="center-text mt"><Link to="/articles" className="btn btn-primary">All articles <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <BgImage src="/images/backgrounds/cta" />
        <div className="cta-overlay" />
        <div className="container center-text cta-content">
          <Reveal>
            <h2>Join the young shoots of change</h2>
            <p>Membership is open to residents of Northern Kenya and the Upper Eastern Region, with priority for youth, women and pastoralist communities.</p>
            <div className="hero-actions center">
              <Link to="/register" className="btn btn-gold">Get Involved</Link>
              <Link to="/donate" className="btn btn-outline-light">Donate</Link>
              <Link to="/contact" className="btn btn-outline-light">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
