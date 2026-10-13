export default function StepOrg({ data, onChange, onNext }) {
  const { orgName, auditor, auditDate, scope, department } = data;
  const valid = orgName.trim().length > 0;

  return (
    <div className="fade-in">
      <div style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 6px" }}>Organization details</h2>
        <p style={{ color: "#6b6a64", fontSize: 14, margin: 0 }}>Basic information about the audit scope and responsible parties.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b6a64", marginBottom: 6, fontWeight: 500 }}>
            Organization name <span style={{ color: "#E24B4A" }}>*</span>
          </label>
          <input value={orgName} onChange={e => onChange("orgName", e.target.value)}
            placeholder="Acme Corporation" autoFocus />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b6a64", marginBottom: 6, fontWeight: 500 }}>Department / Business unit</label>
          <input value={department} onChange={e => onChange("department", e.target.value)}
            placeholder="IT Security / Finance / Operations" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b6a64", marginBottom: 6, fontWeight: 500 }}>Lead auditor</label>
          <input value={auditor} onChange={e => onChange("auditor", e.target.value)}
            placeholder="Jane Smith, CISA, CISSP" />
        </div>
        <div>
          <label style={{ display: "block", fontSize: 13, color: "#6b6a64", marginBottom: 6, fontWeight: 500 }}>Audit date</label>
          <input type="date" value={auditDate} onChange={e => onChange("auditDate", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", fontSize: 13, color: "#6b6a64", marginBottom: 6, fontWeight: 500 }}>Audit scope</label>
          <textarea value={scope} onChange={e => onChange("scope", e.target.value)}
            placeholder="Describe what systems, processes, or environments are in scope (e.g. cloud infrastructure, cardholder data environment, HR systems...)"
            style={{ resize: "vertical", minHeight: 80 }} />
        </div>
      </div>

      <button className="btn-primary" onClick={onNext} disabled={!valid}
        style={{ padding: "10px 24px", fontSize: 14, fontWeight: 500 }}>
        Continue →
      </button>
    </div>
  );
}
