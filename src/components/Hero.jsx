import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import BgImage from './BgImage.jsx';
import { site, mission, vision } from '../data/site.js';

export default function Hero() {
  return (
    <section className="hero">
      <BgImage src="/images/backgrounds/hero" />
      <div className="hero-overlay" />
      <span className="orb orb-1" aria-hidden="true" />
      <span className="orb orb-2" aria-hidden="true" />
      <div className="container hero-content">
        <span className="eyebrow light rise" style={{ '--d': '0ms' }}>Chipukizi wa Mazingira · CHIMA</span>
        <h1 className="rise" style={{ '--d': '120ms' }}>Young shoots growing a climate-resilient Northern&nbsp;Kenya</h1>
        <p className="hero-lead rise" style={{ '--d': '260ms' }}>
          {site.short} is a youth-driven, community-based organisation promoting environmental stewardship,
          climate resilience and self-reliance across {site.areaOfOperation}.
        </p>
        <div className="hero-actions rise" style={{ '--d': '400ms' }}>
          <Link to="/about" className="btn btn-gold">Learn More <ArrowRight size={18} /></Link>
          <Link to="/programmes" className="btn btn-outline-light">Our Programmes</Link>
          <Link to="/register" className="btn btn-outline-light">Get Involved</Link>
        </div>
        <div className="hero-cards">
          <div className="rise" style={{ '--d': '560ms' }}><strong>Our Mission</strong><p>{mission}</p></div>
          <div className="rise" style={{ '--d': '700ms' }}><strong>Our Vision</strong><p>{vision}</p></div>
        </div>
      </div>
      <a href="#who-we-are" className="scroll-cue" aria-label="Scroll down"><ChevronDown size={26} /></a>
    </section>
  );
}
