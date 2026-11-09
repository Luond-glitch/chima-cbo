import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { site, contact } from '../data/site.js';
import { getIcon } from '../utils/icons.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/logo.jpeg" alt="CHIMA logo" />
          <p>{site.tagline}.</p>
          <div className="social">
            {contact.social.map((s) => {
              const Icon = getIcon(s.icon);
              return <a key={s.name} href={s.url} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name}><Icon size={18} /></a>;
            })}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/programmes">Our Programmes</Link></li>
            <li><Link to="/leadership">Leadership</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/register">Get Involved</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><MapPin size={16} /> <span>{contact.address}<br />{contact.postal}</span></li>
            <li><Mail size={16} /> <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><Phone size={16} /> <a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></li>
            <li><Clock size={16} /> {contact.hours}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>© {new Date().getFullYear()} {site.name} (CHIMA). All rights reserved.</span>
          <span>{site.legalStatus}</span>
        </div>
      </div>
    </footer>
  );
}
