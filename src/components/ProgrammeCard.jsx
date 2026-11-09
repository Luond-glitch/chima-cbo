import { getIcon } from '../utils/icons.js';
import Photo from './Photo.jsx';

export default function ProgrammeCard({ programme }) {
  const Icon = getIcon(programme.icon);
  return (
    <article className="card programme-card">
      <div className="card-media">
        <Photo src={programme.image} alt={`${programme.title} – illustrative image`} loading="lazy" />
        <span className="icon-badge"><Icon size={22} aria-hidden="true" /></span>
        {programme.source === 'proposed' && <span className="tag tag-proposed">Proposed</span>}
      </div>
      <div className="card-body">
        <h3>{programme.title}</h3>
        <p>{programme.summary}</p>
        {programme.objectives.length > 0 && (
          <small className="muted">Constitution objective{programme.objectives.length > 1 ? 's' : ''} {programme.objectives.join(', ')}</small>
        )}
      </div>
    </article>
  );
}
