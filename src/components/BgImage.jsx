import { useEffect, useRef } from 'react';
import Photo from './Photo.jsx';

// Full-bleed background photo with gentle parallax and a slow "Ken Burns" zoom.
export default function BgImage({ src, parallax = true }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!parallax || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [parallax]);
  return (
    <div className="bg-layer" aria-hidden="true">
      <div ref={ref} className="bg-parallax">
        <Photo src={src} alt="" className="bg-img" fetchPriority="high" />
      </div>
    </div>
  );
}
