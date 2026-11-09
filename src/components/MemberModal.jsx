import { useEffect, useRef } from 'react';
import { X, Mail, Phone, Linkedin } from 'lucide-react';
import Photo from './Photo.jsx';

export default function MemberModal({ member, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!member) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [member, onClose]);

  if (!member) return null;
  const isBody = member.type === 'body';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={member.name} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close"><X size={22} /></button>
        <div className={`modal-head ${isBody ? 'body' : ''}`}>
          {!isBody && <Photo src={member.image} fallback="/images/leadership/placeholder.svg" alt={`Photo of ${member.name}`} />}
          <div>
            <h3>{member.name}</h3>
            <p className="position">{member.position}</p>
          </div>
        </div>
        <p>{member.biography}</p>
        {member.duties?.length > 0 && (
          <>
            <h4>Responsibilities under the Constitution</h4>
            <ul className="check-list">{member.duties.map((d) => <li key={d}>{d}</li>)}</ul>
          </>
        )}
        {(member.email || member.phone || member.linkedin) && (
          <div className="modal-contact">
            {member.email && <a href={`mailto:${member.email}`}><Mail size={16} /> {member.email}</a>}
            {member.phone && <a href={`tel:${member.phone}`}><Phone size={16} /> {member.phone}</a>}
            {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>}
          </div>
        )}
      </div>
    </div>
  );
}
