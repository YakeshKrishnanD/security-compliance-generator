# 🛡️ Security Compliance Documentation Generator

AI-powered web application that generates professional compliance audit reports for **ISO 27001**, **NIST CSF**, and **PCI-DSS** — powered by **Groq API + Llama 3.3 70B** (ultra-fast, free tier available).

---

## ⚡ Quick Start (3 steps)

### Step 1 — Get a FREE Groq API Key
1. Go to **https://console.groq.com**
2. Sign up (free) → Create API Key
3. Copy the key

### Step 2 — Add your API key
Open the `.env` file and paste your key:
```
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3 — Run the app
```bash
npm install
npm run dev
```
Open **http://localhost:5173** in your browser. Done!

---

## 🏗️ Build for Production
```bash
npm run build
npm run preview
```

---

## 🤖 AI Configuration

| Setting | Value |
|---|---|
| **Provider** | Groq API |
| **Model** | `llama-3.3-70b-versatile` |
| **Speed** | ~500 tokens/sec (extremely fast) |
| **Cost** | Free tier: 30 req/min, 6000 req/day |
| **API Docs** | https://console.groq.com/docs |

---

## 📋 Features

| Feature | Description |
|---|---|
| **3 Standards** | ISO 27001, NIST CSF 2.0, PCI-DSS v4.0 |
| **Live Scoring** | Real-time compliance % updates as you assess |
| **AI Analysis** | Llama 3.3 generates executive summary, strengths, gaps & recommendations |
| **Audit Notes** | Add evidence references per control |
| **3-Tab Report** | Overview · Controls List · Prioritized Recommendations |
| **Risk Rating** | AI-determined Low / Medium / High / Critical |
| **Print/Export** | Browser print → PDF |

---

## 🗂️ Project Structure

```
compliance-app/
├── .env                    ← YOUR GROQ API KEY GOES HERE
├── .env.example            ← Template
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx             ← Groq API call lives here
    ├── main.jsx
    ├── index.css
    ├── data.js             ← All standards & controls
    ├── components.jsx      ← Score gauge, badges, shared UI
    ├── StepOrg.jsx         ← Step 1: org info
    ├── StepStandard.jsx    ← Step 2: standard picker
    ├── StepAssess.jsx      ← Step 3: controls assessment
    └── StepReport.jsx      ← Step 4: generated report
```

---

## 🎓 Demo Flow (For Faculty Presentation)

1. Enter **"Acme Corp"** as org name, fill auditor name
2. Select **PCI-DSS** (12 clear requirements — great for demo)
3. Rate ~5 Compliant, 3 Partial, 4 Non-Compliant — watch **live score bar**
4. Click **Generate AI Report** → Groq/Llama writes the full report in seconds
5. Navigate **Overview → Controls → Recommendations** tabs
6. Show **Print / Export PDF** button

---

## 📄 License
For educational and demonstration purposes.
