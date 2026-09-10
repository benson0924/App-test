import { misconceptions } from '../../data/navigation';

export default function MisconceptionsPage() {
  return (
    <article>
      <h1>Common Misconceptions</h1>
      {misconceptions.map(({ myth, correction }, i) => (
        <div key={i} className="card">
          <p><strong>Myth:</strong> {myth}</p>
          <p style={{ marginBottom: 0 }}><strong>Correction:</strong> {correction}</p>
        </div>
      ))}
    </article>
  );
}
