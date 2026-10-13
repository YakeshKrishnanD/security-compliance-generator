export const STANDARDS = {
  "ISO 27001": {
    color: "#185FA5",
    bg: "#E6F1FB",
    textColor: "#0C447C",
    borderColor: "#85B7EB",
    icon: "ti-shield-lock",
    description: "International standard for information security management systems",
    controls: [
      { id: "A.5",  name: "Information Security Policies",                        subcategory: "Organizational Controls" },
      { id: "A.6",  name: "Organization of Information Security",                 subcategory: "Organizational Controls" },
      { id: "A.7",  name: "Human Resource Security",                              subcategory: "People Controls" },
      { id: "A.8",  name: "Asset Management",                                     subcategory: "Organizational Controls" },
      { id: "A.9",  name: "Access Control",                                       subcategory: "Technological Controls" },
      { id: "A.10", name: "Cryptography",                                         subcategory: "Technological Controls" },
      { id: "A.11", name: "Physical & Environmental Security",                    subcategory: "Physical Controls" },
      { id: "A.12", name: "Operations Security",                                  subcategory: "Technological Controls" },
      { id: "A.13", name: "Communications Security",                              subcategory: "Technological Controls" },
      { id: "A.14", name: "System Acquisition, Development & Maintenance",        subcategory: "Technological Controls" },
      { id: "A.15", name: "Supplier Relationships",                               subcategory: "Organizational Controls" },
      { id: "A.16", name: "Information Security Incident Management",             subcategory: "Organizational Controls" },
      { id: "A.17", name: "Business Continuity Management",                       subcategory: "Organizational Controls" },
      { id: "A.18", name: "Compliance",                                           subcategory: "Organizational Controls" },
    ],
  },

  "NIST CSF": {
    color: "#0F6E56",
    bg: "#E1F5EE",
    textColor: "#085041",
    borderColor: "#5DCAA5",
    icon: "ti-certificate",
    description: "NIST Cybersecurity Framework for managing and reducing cyber risk",
    controls: [
      { id: "ID.AM", name: "Asset Management",                       subcategory: "Identify" },
      { id: "ID.BE", name: "Business Environment",                   subcategory: "Identify" },
      { id: "ID.GV", name: "Governance",                             subcategory: "Identify" },
      { id: "ID.RA", name: "Risk Assessment",                        subcategory: "Identify" },
      { id: "ID.SC", name: "Supply Chain Risk Management",           subcategory: "Identify" },
      { id: "PR.AC", name: "Identity Management & Access Control",   subcategory: "Protect" },
      { id: "PR.AT", name: "Awareness & Training",                   subcategory: "Protect" },
      { id: "PR.DS", name: "Data Security",                          subcategory: "Protect" },
      { id: "PR.IP", name: "Information Protection Processes",       subcategory: "Protect" },
      { id: "PR.MA", name: "Maintenance",                            subcategory: "Protect" },
      { id: "PR.PT", name: "Protective Technology",                  subcategory: "Protect" },
      { id: "DE.AE", name: "Anomalies & Events Detection",           subcategory: "Detect" },
      { id: "DE.CM", name: "Security Continuous Monitoring",         subcategory: "Detect" },
      { id: "DE.DP", name: "Detection Processes",                    subcategory: "Detect" },
      { id: "RS.RP", name: "Response Planning",                      subcategory: "Respond" },
      { id: "RS.CO", name: "Communications",                         subcategory: "Respond" },
      { id: "RS.AN", name: "Analysis",                               subcategory: "Respond" },
      { id: "RS.MI", name: "Mitigation",                             subcategory: "Respond" },
      { id: "RC.RP", name: "Recovery Planning",                      subcategory: "Recover" },
      { id: "RC.IM", name: "Improvements",                           subcategory: "Recover" },
    ],
  },

  "PCI-DSS": {
    color: "#993C1D",
    bg: "#FAECE7",
    textColor: "#712B13",
    borderColor: "#F0997B",
    icon: "ti-credit-card",
    description: "Payment Card Industry Data Security Standard v4.0",
    controls: [
      { id: "Req 1",  name: "Install and Maintain Network Security Controls",         subcategory: "Network Security" },
      { id: "Req 2",  name: "Secure Configurations for All System Components",        subcategory: "Configuration" },
      { id: "Req 3",  name: "Protect Stored Account Data",                            subcategory: "Data Protection" },
      { id: "Req 4",  name: "Protect Cardholder Data with Strong Cryptography",       subcategory: "Cryptography" },
      { id: "Req 5",  name: "Protect All Systems Against Malware",                    subcategory: "Malware Protection" },
      { id: "Req 6",  name: "Develop and Maintain Secure Systems and Software",       subcategory: "Secure Development" },
      { id: "Req 7",  name: "Restrict Access to Cardholder Data by Business Need",   subcategory: "Access Control" },
      { id: "Req 8",  name: "Identify Users and Authenticate Access to Components",  subcategory: "Authentication" },
      { id: "Req 9",  name: "Restrict Physical Access to Cardholder Data",           subcategory: "Physical Security" },
      { id: "Req 10", name: "Log and Monitor All Access to Network Resources",        subcategory: "Audit Logging" },
      { id: "Req 11", name: "Test Security of Systems and Networks Regularly",        subcategory: "Security Testing" },
      { id: "Req 12", name: "Support Information Security with Org Policies",         subcategory: "Policy & Governance" },
    ],
  },
};

export const STATUS_OPTIONS = ["Compliant", "Partial", "Non-Compliant", "Not Applicable"];

export const STATUS_STYLES = {
  Compliant:        { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
  Partial:          { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  "Non-Compliant":  { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
  "Not Applicable": { bg: "#F1EFE8", text: "#444441", border: "#B4B2A9" },
  "Not Assessed":   { bg: "#F1EFE8", text: "#888780", border: "#D3D1C7" },
};

export const RISK_STYLES = {
  Low:      { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
  Medium:   { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
  High:     { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
  Critical: { bg: "#FCEBEB", text: "#791F1F", border: "#E24B4A" },
  Unknown:  { bg: "#F1EFE8", text: "#444441", border: "#B4B2A9" },
};

export const PRIORITY_COLORS = { High: "#E24B4A", Medium: "#EF9F27", Low: "#639922" };
