import { useState } from "react";
import { STANDARDS, STATUS_STYLES, RISK_STYLES, PRIORITY_COLORS } from './data.js';
import { StatusBadge, ScoreGauge, SectionLabel } from './components.jsx';

export default function StepReport({ orgInfo, standard, statuses, notes, findings, onBack, onReset }) {
  const [activeTab, setActiveTab] = useState("overview");
  const cfg = STANDARDS[standard];
  const controls = cfg?.controls || [];

  const scored   = controls.filter(c => statuses[c.id] && statuses[c.id] !== "Not Applicable");
  const compliant = scored.filter(c => statuses[c.id] === "Compliant").length;
  const partial   = scored.filter(c => statuses[c.id] === "Partial").length;
  const nonComp   = scored.filter(c => statuses[c.id] === "Non-Compliant").length;
  const score     = scored.length > 0 ? Math.round(((compliant + partial * 0.5) / scored.length) * 100) : 0;

  const subcats = [...new Set(controls.map(c => c.subcategory))];
  const riskStyle = RISK_STYLES[findings.riskLevel] || RISK_STYLES.Unknown;

  const TABS = ["overview", "controls", "recommendations"];

  return (
    <div className="fade-in">
      {/* Report header card */}
      <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
              <i className={`ti ${cfg?.icon}`} style={{ fontSize: 20, color: cfg?.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: cfg?.textColor, background: cfg?.bg, padding: "3px 12px", borderRadius: 6 }}>{standard}</span>
              {findings.riskLevel && (
                <span style={{ fontSize: 12, fontWeight: 600, color: riskStyle.text, background: riskStyle.bg, border: `1px solid ${riskStyle.border}`, padding: "3px 12px", borderRadius: 6 }}>
                  {findings.riskLevel} Risk
                </span>
              )}
            </div>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 600 }}>
              {orgInfo.orgName} — Compliance Audit Report
            </h2>
            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#6b6a64", flexWrap: "wrap" }}>
              {orgInfo.department && <span><i className="ti ti-building" style={{ marginRight: 4 }} />{orgInfo.department}</span>}
              <span><i className="ti ti-user" style={{ marginRight: 4 }} />{orgInfo.auditor || "Internal Audit Team"}</span>
              <span><i className="ti ti-calendar" style={{ marginRight: 4 }} />{orgInfo.auditDate}</span>
              {orgInfo.scope && <span><i className="ti ti-scope" style={{ marginRight: 4 }} />{orgInfo.scope}</span>}
            </div>
          </div>
          <ScoreGauge score={score} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "1.5rem", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            flex: 1, padding: "11px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer",
            background: activeTab === tab ? "#185FA5" : "#fff",
            color: activeTab === tab ? "#fff" : "#6b6a64",
            borderRight: i < TABS.length - 1 ? "0.5px solid rgba(0,0,0,0.10)" : "none",
            borderRadius: 0
          }}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="fade-in">
          {/* Metric cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
            {[
              { label: "Compliant",     value: compliant,                    ...STATUS_STYLES.Compliant },
              { label: "Partial",       value: partial,                      ...STATUS_STYLES.Partial },
              { label: "Non-Compliant", value: nonComp,                      ...STATUS_STYLES["Non-Compliant"] },
              { label: "Not Assessed",  value: controls.length - scored.length, bg: "#f0ede7", text: "#6b6a64", border: "#D3D1C7" },
            ].map(m => (
              <div key={m.label} style={{ background: m.bg, border: `1px solid ${m.border}`, borderRadius: 10, padding: "14px 16px" }}>
                <p style={{ margin: "0 0 4px", fontSize: 12, color: m.text, opacity: 0.85 }}>{m.label}</p>
                <p style={{ margin: 0, fontSize: 30, fontWeight: 700, color: m.text }}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* Executive Summary */}
          {findings.executiveSummary && (
            <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.25rem" }}>
              <SectionLabel>Executive summary</SectionLabel>
              <p style={{ margin: 0, fontSize: 14, color: "#3d3d3a", lineHeight: 1.75 }}>{findings.executiveSummary}</p>
            </div>
          )}

          {/* Strengths & Gaps */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: "1.25rem" }}>
            {findings.keyStrengths?.length > 0 && (
              <div style={{ background: "#EAF3DE", border: "1px solid #97C459", borderRadius: 12, padding: "1.2rem" }}>
                <SectionLabel><i className="ti ti-circle-check" style={{ marginRight: 6 }} />Key strengths</SectionLabel>
                {findings.keyStrengths.map((s, i) => (
                  <p key={i} style={{ margin: "0 0 8px", fontSize: 13, color: "#27500A", display: "flex", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                  </p>
                ))}
              </div>
            )}
            {findings.criticalGaps?.length > 0 && (
              <div style={{ background: "#FCEBEB", border: "1px solid #E24B4A", borderRadius: 12, padding: "1.2rem" }}>
                <SectionLabel><i className="ti ti-alert-triangle" style={{ marginRight: 6 }} />Critical gaps</SectionLabel>
                {findings.criticalGaps.map((g, i) => (
                  <p key={i} style={{ margin: "0 0 8px", fontSize: 13, color: "#791F1F", display: "flex", gap: 8, lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}>✗</span>{g}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Next audit */}
          {findings.nextAuditDate && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#6b6a64", background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 8, padding: "12px 16px" }}>
              <i className="ti ti-calendar-event" style={{ fontSize: 18, color: "#185FA5" }} />
              <span>Next recommended audit: <strong style={{ color: "#185FA5" }}>{findings.nextAuditDate}</strong></span>
            </div>
          )}
        </div>
      )}

      {/* CONTROLS TAB */}
      {activeTab === "controls" && (
        <div className="fade-in">
          {subcats.map(cat => (
            <div key={cat} style={{ marginBottom: "1.25rem" }}>
              <SectionLabel>{cat}</SectionLabel>
              <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 12, overflow: "hidden" }}>
                {controls.filter(c => c.subcategory === cat).map((ctrl, i, arr) => (
                  <div key={ctrl.id} style={{
                    display: "grid", gridTemplateColumns: "88px 1fr auto",
                    gap: 14, padding: "13px 16px", alignItems: "center",
                    borderBottom: i < arr.length - 1 ? "0.5px solid rgba(0,0,0,0.08)" : "none"
                  }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6b6a64", background: "#f0ede7", borderRadius: 6, padding: "3px 8px", textAlign: "center" }}>{ctrl.id}</span>
                    <div>
                      <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 500 }}>{ctrl.name}</p>
                      {notes[ctrl.id] && <p style={{ margin: 0, fontSize: 12, color: "#9e9c95", fontStyle: "italic" }}>{notes[ctrl.id]}</p>}
                    </div>
                    <StatusBadge status={statuses[ctrl.id] || "Not Assessed"} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RECOMMENDATIONS TAB */}
      {activeTab === "recommendations" && (
        <div className="fade-in">
          {findings.recommendations?.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {findings.recommendations.map((rec, i) => (
                <div key={i} style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: "1.25rem", display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 64 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "#fff",
                      background: PRIORITY_COLORS[rec.priority] || "#888",
                      borderRadius: 6, padding: "4px 10px", width: "100%", textAlign: "center"
                    }}>{rec.priority}</span>
                    <span style={{ fontSize: 11, color: "#9e9c95", fontWeight: 600 }}>#{i + 1}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 500, lineHeight: 1.5 }}>{rec.action}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b6a64" }}>
                      <i className="ti ti-clock" />
                      Timeline: <strong>{rec.timeline}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#9e9c95", fontSize: 14 }}>No recommendations were generated.</p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="no-print" style={{ display: "flex", gap: 10, marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
        <button onClick={onBack}>← Edit assessment</button>
        <button onClick={onReset} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <i className="ti ti-plus" /> New report
        </button>
        <button className="btn-primary" onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
          <i className="ti ti-printer" /> Print / Export PDF
        </button>
      </div>
    </div>
  );
}
