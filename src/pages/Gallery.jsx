import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import Photo from '../components/Photo.jsx';
import { gallery } from '../data/site.js';

export default function Gallery() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <PageHeader title="Gallery" subtitle="Community engagements, environmental projects and field activities" crumb="Gallery" />
      <section className="section">
        <div className="container">
          <p className="lead center-text narrow">Placeholder images are shown until real photographs are added. Edit the gallery list in <code>src/data/site.js</code>.</p>
          <div className="gallery-grid mt">
            {gallery.map((g, i) => (
              <Reveal key={g.id} delay={(i % 4) * 70}>
                <button className="gallery-item" onClick={() => setOpen(g)} aria-label={`Enlarge: ${g.caption}`}>
                  <Photo src={g.src} alt={g.alt} loading="lazy" />
                  <span>{g.caption}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div className="modal-backdrop lightbox" onClick={() => setOpen(null)}>
          <button className="modal-close light" onClick={() => setOpen(null)} aria-label="Close"><X size={26} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <Photo src={open.src} alt={open.alt} />
            <figcaption>{open.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
