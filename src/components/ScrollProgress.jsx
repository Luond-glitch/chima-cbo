import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

// Thin progress bar at the top + back-to-top button.
export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="progress" style={{ width: `${p}%` }} aria-hidden="true" />
      <button className={`to-top ${p > 12 ? 'show' : ''}`} aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={20} /></button>
    </>
  );
}
