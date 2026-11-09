import { Landmark } from 'lucide-react';
import Photo from './Photo.jsx';

// One box of the organogram. Reads everything from a leadership data item.
export default function MemberCard({ member, onOpen }) {
  const isBody = member.type === 'body';

  if (isBody) {
    return (
      <button type="button" className="member-card body-card" onClick={() => onOpen(member)}
        aria-label={`View details: ${member.name}`}>
        <Landmark size={22} aria-hidden="true" />
        <strong>{member.name}</strong>
        <span>{member.position}</span>
      </button>
    );
  }

  return (
    <button type="button" className={`member-card ${member.placeholder ? 'is-placeholder' : ''}`}
      onClick={() => onOpen(member)} aria-label={`View profile: ${member.name}, ${member.position}`}>
      <Photo src={member.image} fallback="/images/leadership/placeholder.svg" alt={member.placeholder ? `Placeholder photo for ${member.position}` : `Photo of ${member.name}`} loading="lazy" />
      <span className="txt">
        <strong>{member.name}</strong>
        <span className="position">{member.position}</span>
        <span className="view">View profile</span>
      </span>
    </button>
  );
}
