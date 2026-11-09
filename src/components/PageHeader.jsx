import { Link } from 'react-router-dom';
import BgImage from './BgImage.jsx';

export default function PageHeader({ title, subtitle, crumb, image = '/images/backgrounds/page-header' }) {
  return (
    <header className="page-header">
      <BgImage src={image} />
      <div className="page-header-overlay" />
      <div className="container page-header-content">
        <nav aria-label="Breadcrumb" className="breadcrumb rise" style={{ '--d': '0ms' }}>
          <Link to="/">Home</Link> <span>/</span> <span>{crumb || title}</span>
        </nav>
        <h1 className="rise" style={{ '--d': '120ms' }}>{title}</h1>
        {subtitle && <p className="rise" style={{ '--d': '240ms' }}>{subtitle}</p>}
      </div>
    </header>
  );
}
