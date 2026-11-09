import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Photo from '../components/Photo.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { articles, sortedArticles } from '../data/articles.js';
import { formatDate } from '../utils/format.js';

// Very small formatter: blank line = new paragraph, "## " = heading, "- " = bullets, "_text_" = italic note.
function renderContent(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((raw, i) => {
    const block = raw.trim();
    if (block.startsWith('## ')) return <h2 key={i}>{block.slice(3)}</h2>;
    if (block.split('\n').every((l) => l.trim().startsWith('- ')))
      return <ul key={i}>{block.split('\n').map((l, j) => <li key={j}>{l.trim().slice(2)}</li>)}</ul>;
    if (/^_.*_$/.test(block)) return <p key={i}><em>{block.slice(1, -1)}</em></p>;
    return <p key={i}>{block}</p>;
  });
}

export default function ArticleDetails() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="section container center-text">
        <h1>Article not found</h1>
        <Link to="/articles" className="btn btn-primary">Back to articles</Link>
      </section>
    );
  }
  const related = sortedArticles().filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <>
      <PageHeader title={article.title} crumb="Articles" />
      <article className="section">
        <div className="container narrow">
          <Link to="/articles" className="back-link"><ArrowLeft size={16} /> All articles</Link>
          <div className="article-meta">
            <span className="tag inline">{article.category}</span>
            <span><User size={14} /> {article.author}</span>
            <span><Calendar size={14} /> <time dateTime={article.date}>{formatDate(article.date)}</time></span>
          </div>
          <Photo className="article-hero" src={article.image} alt="" />
          <div className="article-body">{renderContent(article.content)}</div>
        </div>
      </article>
      {related.length > 0 && (
        <section className="section section-cream">
          <div className="container">
            <h2 className="center-text">More articles</h2>
            <div className="grid-3 mt">{related.map((a) => <Fragment key={a.id}><ArticleCard article={a} /></Fragment>)}</div>
          </div>
        </section>
      )}
    </>
  );
}
