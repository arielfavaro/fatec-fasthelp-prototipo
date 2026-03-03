import './Badge.css';

export default function Badge({ label, color, dot = true, variant = 'status' }) {
  return (
    <span className={`badge badge-${variant}`} style={{ '--badge-color': color }}>
      {dot && <span className="badge-dot" style={{ backgroundColor: color }} />}
      {label}
    </span>
  );
}
