import { STANDARDS, STATUS_OPTIONS, STATUS_STYLES } from './data.js';
import { Spinner } from './components.jsx';

export default function StepAssess({ standard, statuses, notes, onChange, onNoteChange, onGenerate, onBack, loading }) {
  const cfg = STANDARDS[standard];
  const controls = cfg?.controls || [];

  const scored = controls.filter(c => statuses[c.id] && statuses[c.id] !== "Not Applicable");
  const compliant = scored.filter(c => statuses[c.id] === "Compliant").length;
  const partial   = scored.filter(c => statuses[c.id] === "Partial").length;
  const nonComp   = scored.filter(c => statuses[c.id] === "Non-Compliant").length;
  const score     = scored.length > 0 ? Math.round(((compliant + partial * 0.5) / scored.length) * 100) : 0;
  const scoreColor = score >= 80 ? "#639922" : score >= 50 ? "#BA7517" : "#E24B4A";

  const subcats = [...new Set(controls.map(c => c.subcategory))];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 4px" }}>Assess {standard} controls</h2>
          <p style={{ color: "#6b6a64", fontSize: 14, margin: 0 }}>Rate each control and add notes for the auditor's findings.</p>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 380 }}>
          {STATUS_OPTIONS.map(s => {
            const c = STATUS_STYLES[s];
            return (
              <span key={s} style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 500 }}>{s}</span>
            );
          })}
        </div>
      </div>

      {/* Live score bar */}
      <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, padding: "14px 18px", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
          <span style={{ color: "#6b6a64", fontWeight: 500 }}>Live compliance score</span>
          <span style={{ fontWeight: 700, color: scoreColor, fontSize: 15 }}>{score}%</span>
        </div>
        <div style={{ height: 10, background: "#E5E3DB", borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${score}%`, background: scoreColor, borderRadius: 5, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 10, fontSize: 13 }}>
          <span style={{ color: "#27500A" }}><strong>{compliant}</strong> Compliant</span>
          <span style={{ color: "#633806" }}><strong>{partial}</strong> Partial</span>
          <span style={{ color: "#791F1F" }}><strong>{nonComp}</strong> Non-Compliant</span>
          <span style={{ color: "#9e9c95" }}><strong>{controls.length - scored.length}</strong> Unassessed</span>
        </div>
      </div>

      {/* Controls by subcategory */}
      {subcats.map(cat => (
        <div key={cat} style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 600, color: "#9e9c95", textTransform: "uppercase", letterSpacing: "0.07em" }}>
            {cat}
          </p>
          <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 12, overflow: "hidden" }}>
            {controls.filter(c => c.subcategory === cat).map((ctrl, i, arr) => (
              <div key={ctrl.id} style={{
                padding: "14px 16px",
                borderBottom: i < arr.length - 1 ? "0.5px solid rgba(0,0,0,0.08)" : "none",
                display: "grid", gridTemplateColumns: "88px 1fr auto", gap: 14, alignItems: "center"
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 11, color: "#6b6a64",
                  background: "#f0ede7", borderRadius: 6, padding: "3px 8px",
                  textAlign: "center", letterSpacing: "0.02em"
                }}>{ctrl.id}</span>

                <div>
                  <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 500, color: "#1a1a18" }}>{ctrl.name}</p>
                  <input
                    value={notes[ctrl.id] || ""}
                    onChange={e => onNoteChange(ctrl.id, e.target.value)}
                    placeholder="Auditor notes, evidence references..."
                    style={{ fontSize: 12, padding: "5px 10px" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 140 }}>
                  {STATUS_OPTIONS.map(s => {
                    const c = STATUS_STYLES[s];
                    const sel = statuses[ctrl.id] === s;
                    return (
                      <button key={s} onClick={() => onChange(ctrl.id, s)} style={{
                        fontSize: 11, padding: "4px 10px", borderRadius: 6, cursor: "pointer",
                        fontWeight: sel ? 600 : 400, textAlign: "left",
                        background: sel ? c.bg : "transparent",
                        color: sel ? c.text : "#9e9c95",
                        border: sel ? `1.5px solid ${c.border}` : "0.5px solid rgba(0,0,0,0.1)",
                        transition: "all 0.12s"
                      }}>{s}</button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 10, paddingTop: "1rem", borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
        <button onClick={onBack} className="no-print">← Back</button>
        <button
          className="btn-primary no-print"
          onClick={onGenerate}
          disabled={loading || scored.length === 0}
          style={{ padding: "10px 24px", fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}
        >
          {loading ? <><Spinner size={16} color="#fff" /> Generating AI report...</> : "Generate AI Report ↗"}
        </button>
        {scored.length === 0 && (
          <span style={{ fontSize: 13, color: "#9e9c95", alignSelf: "center" }}>Rate at least one control to generate the report.</span>
        )}
      </div>
    </div>
  );
}
