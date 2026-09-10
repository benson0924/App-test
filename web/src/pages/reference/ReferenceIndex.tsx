import { Link } from 'react-router-dom';

const PAGES = [
  { path: '/reference/gates', title: 'Gate Reference', desc: 'Single- and multi-qubit gate matrices.' },
  { path: '/reference/formulas', title: 'Formula Sheet', desc: 'Key equations across chapters.' },
  { path: '/reference/complexity', title: 'Complexity', desc: 'Classical vs quantum query/time bounds.' },
  { path: '/reference/glossary', title: 'Glossary', desc: 'Terminology from navigation data.' },
  { path: '/reference/misconceptions', title: 'Misconceptions', desc: 'Common myths and corrections.' },
];

export default function ReferenceIndex() {
  return (
    <div>
      <h1>Reference</h1>
      <div className="grid-2">
        {PAGES.map((p) => (
          <Link key={p.path} to={p.path} className="card" style={{ textDecoration: 'none' }}>
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
