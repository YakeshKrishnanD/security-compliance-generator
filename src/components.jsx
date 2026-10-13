import { STATUS_STYLES } from './data.js';

export function StatusBadge({ status }) {
  const s = status || "Not Assessed";
  const c = STATUS_STYLES[s] || STATUS_STYLES["Not Assessed"];
  return (
    <span style={{
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 500,
      whiteSpace: "nowrap", display: "inline-block"
    }}>{s}</span>
  );
}

export function ScoreGauge({ score }) {
  const color = score >= 80 ? "#639922" : score >= 50 ? "#BA7517" : "#E24B4A";
  const r = 40, cx = 50, cy = 50;
  const circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="110" height="110" viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#E5E3DB" strokeWidth="9" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={`${dash} ${circumference}`} strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1)" }} />
        <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 20, fontWeight: 700, fill: color }}>{score}%</text>
        <text x={cx} y={cy + 14} textAnchor="middle"
          style={{ fontSize: 9, fill: "#888780" }}>compliance</text>
      </svg>
    </div>
  );
}

export function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)",
      borderRadius: 12, padding: "1.25rem", ...style
    }}>{children}</div>
  );
}

export function SectionLabel({ children }) {
  return (
    <p style={{
      margin: "0 0 8px", fontSize: 11, fontWeight: 600,
      color: "#9e9c95", textTransform: "uppercase", letterSpacing: "0.07em"
    }}>{children}</p>
  );
}

export function Spinner({ size = 20, color = "#185FA5" }) {
  return (
    <span style={{
      display: "inline-block", width: size, height: size,
      border: `2.5px solid rgba(0,0,0,0.1)`, borderTopColor: color,
      borderRadius: "50%", animation: "spin 0.7s linear infinite"
    }} />
  );
}
