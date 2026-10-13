import { useState } from "react";
import StepOrg from "./StepOrg.jsx";
import StepStandard from "./StepStandard.jsx";
import StepAssess from "./StepAssess.jsx";
import StepReport from "./StepReport.jsx";

const STEPS = ["Organization", "Standard", "Assessment", "Report"];

const defaultOrg = {
  orgName: "", auditor: "", auditDate: new Date().toISOString().slice(0, 10), scope: "", department: ""
};

export default function App() {
  const [step, setStep] = useState(1);
  const [orgInfo, setOrgInfo] = useState(defaultOrg);
  const [standard, setStandard] = useState("");
  const [statuses, setStatuses] = useState({});
  const [notes, setNotes] = useState({});
  const [findings, setFindings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setStep(1); setOrgInfo(defaultOrg); setStandard("");
    setStatuses({}); setNotes({}); setFindings(null); setError("");
  }

  async function generateReport() {
    setLoading(true);
    setError("");

    const { STANDARDS } = await import("./data.js");
    const controls = STANDARDS[standard]?.controls || [];
    const summary = controls.map(c =>
      `${c.id} (${c.name}): ${statuses[c.id] || "Not Assessed"}${notes[c.id] ? ` — Note: ${notes[c.id]}` : ""}`
    ).join("\n");

    const scored    = controls.filter(c => statuses[c.id] && statuses[c.id] !== "Not Applicable");
    const compliant = scored.filter(c => statuses[c.id] === "Compliant").length;
    const partial   = scored.filter(c => statuses[c.id] === "Partial").length;
    const score     = scored.length > 0 ? Math.round(((compliant + partial * 0.5) / scored.length) * 100) : 0;

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          temperature: 0.3,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: "You are a senior cybersecurity compliance auditor. Always respond with valid JSON only — no markdown, no code fences, no extra text."
            },
            {
              role: "user",
              content: `Analyze this audit data and generate a professional compliance report for ${standard}.

Organization: ${orgInfo.orgName}
Department: ${orgInfo.department || "N/A"}
Auditor: ${orgInfo.auditor || "Internal Team"}
Date: ${orgInfo.auditDate}
Scope: ${orgInfo.scope || "Enterprise IT Systems"}
Standard: ${standard}
Overall Score: ${score}%

Control assessment results:
${summary}

Return a JSON object with exactly this structure:
{
  "executiveSummary": "3-4 sentence professional summary of the overall compliance posture, key findings, and business implications",
  "keyStrengths": ["specific strength based on compliant controls", "another strength", "third strength"],
  "criticalGaps": ["specific gap from non-compliant controls", "another critical gap", "third gap"],
  "recommendations": [
    {"priority": "High", "action": "specific remediation action", "timeline": "e.g. 30 days"},
    {"priority": "High", "action": "another high priority action", "timeline": "e.g. 60 days"},
    {"priority": "Medium", "action": "medium priority action", "timeline": "e.g. 90 days"},
    {"priority": "Medium", "action": "another medium action", "timeline": "e.g. 3 months"},
    {"priority": "Low", "action": "low priority improvement", "timeline": "e.g. 6 months"}
  ],
  "riskLevel": "Low|Medium|High|Critical",
  "nextAuditDate": "specific timeframe recommendation e.g. Q1 2026 or 6 months"
}`
            }
          ]
        })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      const text = data.choices?.[0]?.message?.content || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setFindings(parsed);
      setStep(4);
    } catch (e) {
      console.error(e);
      setError("AI report generation failed. Check your Groq API key in .env file. Showing fallback results.");
      setFindings({
        executiveSummary: `Compliance assessment for ${orgInfo.orgName} under ${standard} has been completed with a score of ${score}%. Manual review of the control findings is recommended.`,
        keyStrengths: ["Controls assessed and documented", "Audit process completed", "Baseline established for future audits"],
        criticalGaps: ["Review non-compliant controls immediately", "Develop remediation plan", "Assign control owners"],
        recommendations: [
          { priority: "High", action: "Remediate all Non-Compliant controls", timeline: "30 days" },
          { priority: "Medium", action: "Develop improvement plans for Partial controls", timeline: "90 days" },
          { priority: "Low", action: "Schedule follow-up audit", timeline: "6 months" }
        ],
        riskLevel: score >= 80 ? "Low" : score >= 60 ? "Medium" : score >= 40 ? "High" : "Critical",
        nextAuditDate: "6 months"
      });
      setStep(4);
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f3", padding: "2rem 1rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* App Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <i className="ti ti-shield-check" style={{ fontSize: 26, color: "#185FA5" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: "#1a1a18" }}>Security Compliance Generator</h1>
            <p style={{ margin: 0, fontSize: 13, color: "#6b6a64" }}>
              AI-powered audit reports · ISO 27001 · NIST CSF · PCI-DSS
            </p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b6a64", background: "#EAF3DE", border: "1px solid #97C459", borderRadius: 8, padding: "5px 12px" }}>
            <i className="ti ti-bolt" style={{ color: "#3B6D11" }} />
            <span style={{ color: "#27500A", fontWeight: 500 }}></span>
          </div>
        </div>

        {/* Stepper */}
        <div style={{ display: "flex", marginBottom: "2rem", background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 10, overflow: "hidden" }}>
          {STEPS.map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done   = step > n;
            return (
              <div key={n} onClick={() => done && setStep(n)} style={{
                flex: 1, padding: "11px 8px", textAlign: "center", fontSize: 13, fontWeight: 500,
                background: active ? "#185FA5" : done ? "#E6F1FB" : "#fff",
                color: active ? "#fff" : done ? "#185FA5" : "#9e9c95",
                cursor: done ? "pointer" : "default",
                borderRight: i < 3 ? "0.5px solid rgba(0,0,0,0.10)" : "none",
                transition: "all 0.2s", userSelect: "none"
              }}>
                <span style={{ marginRight: 5 }}>{done ? "✓" : n}.</span>{label}
              </div>
            );
          })}
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background: "#FCEBEB", border: "1px solid #E24B4A", borderRadius: 10, padding: "12px 16px", marginBottom: "1.25rem", fontSize: 13, color: "#791F1F", display: "flex", gap: 10 }}>
            <i className="ti ti-alert-circle" />
            {error}
          </div>
        )}

        {/* Main content card */}
        <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 16, padding: "2rem" }}>
          {step === 1 && (
            <StepOrg data={orgInfo}
              onChange={(k, v) => setOrgInfo(p => ({ ...p, [k]: v }))}
              onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepStandard selected={standard} onSelect={setStandard}
              onNext={() => setStep(3)} onBack={() => setStep(1)} />
          )}
          {step === 3 && (
            <StepAssess standard={standard} statuses={statuses} notes={notes}
              onChange={(id, v) => setStatuses(p => ({ ...p, [id]: v }))}
              onNoteChange={(id, v) => setNotes(p => ({ ...p, [id]: v }))}
              onGenerate={generateReport} onBack={() => setStep(2)} loading={loading} />
          )}
          {step === 4 && findings && (
            <StepReport orgInfo={orgInfo} standard={standard} statuses={statuses}
              notes={notes} findings={findings}
              onBack={() => setStep(3)} onReset={reset} />
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#9e9c95", marginTop: "1.5rem" }}>
         
        </p>
      </div>
    </div>
  );
}
