import { useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import Reveal from '../components/Reveal.jsx';
import { sortedArticles } from '../data/articles.js';

export default function Articles() {
  const all = useMemo(() => sortedArticles(), []);
  const categories = useMemo(() => ['All', ...new Set(all.map((a) => a.category))], [all]);
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? all : all.filter((a) => a.category === cat);
  const [lead, ...rest] = list;

  return (
    <>
      <PageHeader title="Articles & Publications" subtitle="News, insights and stories from CHIMA" crumb="Articles" />
      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} className={c === cat ? 'chip active' : 'chip'} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          {list.length === 0 && <p className="center-text">No articles yet.</p>}
          {lead && <Reveal className="mt"><ArticleCard article={lead} featured /></Reveal>}
          <div className="grid-3 mt">
            {rest.map((a, i) => <Reveal key={a.id} delay={(i % 3) * 90}><ArticleCard article={a} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  );
}
