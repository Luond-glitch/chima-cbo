import { useMemo, useState } from 'react';
import MemberCard from './MemberCard.jsx';
import MemberModal from './MemberModal.jsx';

// Turns the flat leadership list into trees using parentId.
function buildTrees(list) {
  const byId = new Map(list.map((m) => [m.id, { ...m, children: [] }]));
  const roots = [];
  byId.forEach((node) => {
    const parent = node.parentId != null ? byId.get(node.parentId) : null;
    if (parent) parent.children.push(node);
    else roots.push(node);
  });
  return roots;
}

function Branch({ node, onOpen }) {
  return (
    <li>
      <MemberCard member={node} onOpen={onOpen} />
      {node.children.length > 0 && (
        <ul>
          {node.children.map((c) => <Branch key={c.id} node={c} onOpen={onOpen} />)}
        </ul>
      )}
    </li>
  );
}

export default function Organogram({ data }) {
  const roots = useMemo(() => buildTrees(data), [data]);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="organogram-wrap">
        {roots.map((root) => (
          <div className="org-tree" key={root.id}>
            <ul><Branch node={root} onOpen={setSelected} /></ul>
          </div>
        ))}
      </div>
      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
