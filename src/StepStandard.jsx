import { STANDARDS } from './data.js';

export default function StepStandard({ selected, onSelect, onNext, onBack }) {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 6px" }}>Choose a compliance standard</h2>
        <p style={{ color: "#6b6a64", fontSize: 14, margin: 0 }}>Select the framework your organization needs to assess against.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: "1.75rem" }}>
        {Object.entries(STANDARDS).map(([name, cfg]) => {
          const isSelected = selected === name;
          return (
            <div key={name} onClick={() => onSelect(name)} style={{
              border: isSelected ? `2px solid ${cfg.color}` : "0.5px solid rgba(0,0,0,0.12)",
              borderRadius: 12, padding: "1.4rem 1.2rem", cursor: "pointer",
              background: isSelected ? cfg.bg : "#fff",
              transition: "all 0.15s", position: "relative"
            }}>
              {isSelected && (
                <span style={{
                  position: "absolute", top: 10, right: 10, width: 20, height: 20,
                  background: cfg.color, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>
                  <i className="ti ti-check" style={{ fontSize: 12, color: "#fff" }} />
                </span>
              )}
              <i className={`ti ${cfg.icon}`} style={{
                fontSize: 30, color: isSelected ? cfg.color : "#9e9c95",
                display: "block", marginBottom: 12
              }} />
              <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, color: isSelected ? cfg.textColor : "#1a1a18" }}>{name}</p>
              <p style={{ margin: "0 0 10px", fontSize: 12, color: isSelected ? cfg.textColor : "#9e9c95", opacity: 0.8 }}>{cfg.description}</p>
              <div style={{
                display: "inline-block", fontSize: 11, fontWeight: 500,
                background: isSelected ? cfg.color : "#f0ede7",
                color: isSelected ? "#fff" : "#6b6a64",
                padding: "3px 10px", borderRadius: 6
              }}>{cfg.controls.length} controls</div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext} disabled={!selected}
          style={{ padding: "10px 24px", fontWeight: 500 }}>
          Start assessment →
        </button>
      </div>
    </div>
  );
}
