import { useEffect, useState } from 'react';

const hasExt = (s) => /\.(jpe?g|png|webp|avif|svg)$/i.test(s);

/**
 * Smart image. Give it a path WITHOUT an extension (e.g. "/images/gallery/gallery-1")
 * and it uses the first file that exists: .jpg → .webp → .svg (the built-in placeholder).
 * So dropping a real "gallery-1.jpg" into public/images/gallery/ replaces the placeholder
 * automatically. A path WITH an extension is used as-is, then `fallback` if it fails.
 */
export default function Photo({ src, alt = '', fallback, className = '', ...rest }) {
  const chain = hasExt(src) ? [src, fallback].filter(Boolean) : [`${src}.jpg`, `${src}.webp`, `${src}.svg`];
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [src]);
  return (
    <img
      className={className}
      src={chain[Math.min(i, chain.length - 1)]}
      alt={alt}
      onError={() => setI((n) => (n < chain.length - 1 ? n + 1 : n))}
      {...rest}
    />
  );
}
