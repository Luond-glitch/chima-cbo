import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import Photo from './Photo.jsx';
import { formatDate } from '../utils/format.js';

export default function ArticleCard({ article, featured = false }) {
  return (
    <article className={`card article-card ${featured ? 'featured' : ''}`}>
      <Link to={`/articles/${article.slug}`} className="card-media" aria-label={article.title}>
        <Photo src={article.image} alt="" loading="lazy" />
        <span className="tag">{article.category}</span>
      </Link>
      <div className="card-body">
        <div className="meta"><Calendar size={14} aria-hidden="true" /> <time dateTime={article.date}>{formatDate(article.date)}</time></div>
        <h3><Link to={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.excerpt}</p>
        <Link to={`/articles/${article.slug}`} className="read-more">Read More <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
