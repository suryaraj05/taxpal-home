<div align="center">

# 🧾 TaxSetu — 5-Agent GST Compliance Platform

**Multi-agent AI system for Indian MSME tax compliance. Voice-first. Hindi-native. Autonomous.**

[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Gemini](https://img.shields.io/badge/LLM-Gemini%20API-4285F4?style=flat-square&logo=google)](https://ai.google.dev)
[![Firebase](https://img.shields.io/badge/Backend-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Multi-Agent](https://img.shields.io/badge/Architecture-Multi--Agent-00ff88?style=flat-square)]()

*Built at Build For India Hackathon · KSUM Kerala · Feb 2026*

</div>

---

## The Problem

88% of Indian MSMEs are underserved by English-only, desktop-first GST tools like ClearTax. Small business owners — street vendors, kiryana stores, small manufacturers — cannot afford CA fees and struggle with complex filing interfaces.

**TaxSetu solves this with voice-first, Hindi-native, autonomous AI agents.**

---

## Architecture — 5-Agent Orchestration

```
┌─────────────────────────────────────────────────────────────┐
│                      Master Planner                         │
│         Orchestrates all agents · Manages state             │
└──────────┬──────────┬──────────┬──────────┬────────────────┘
           │          │          │          │
     ┌─────▼──┐ ┌─────▼──┐ ┌────▼───┐ ┌───▼────┐ ┌──────────┐
     │WATCHER │ │CALC    │ │FILER   │ │GUARDIAN│ │NARRATOR  │
     │        │ │        │ │        │ │        │ │          │
     │OCR     │ │GST     │ │Pre-    │ │Notice  │ │Hindi     │
     │invoice │ │logic + │ │flight  │ │analysis│ │voice     │
     │ingest  │ │ITC     │ │filing  │ │+ risk  │ │explain   │
     │via     │ │recon-  │ │valid-  │ │scoring │ │ations    │
     │Gemini  │ │iliation│ │ation   │ │        │ │          │
     └────────┘ └────────┘ └────────┘ └────────┘ └──────────┘
```

**Each agent emits structured JSON:**
```json
{
  "decision": "APPROVE_FILING",
  "reasoning": "All 3 invoices validated, ITC ₹4,200 confirmed",
  "confidence": 0.94,
  "notify_flags": ["HIGH_VALUE_TRANSACTION"],
  "next_agent": "FILER"
}
```

This makes every workflow **audit-ready** and **traceable**.

---

## Input Methods

```
📸 Photo Invoice  →  Gemini OCR  →  Auto-extract  →  Firestore
🎤 Voice/Transcript  →  Parse  →  Ledger entry
📊 Bulk CSV/Excel  →  GSTIN validation  →  ITC anomaly detection
```

---

## Tech Stack

| Layer | Technology |
|:---|:---|
| Frontend | React 18, Vite, Tailwind CSS |
| LLM | Gemini API (Pro + Vision) |
| Backend | Node.js, Cloud Functions |
| Database | Firebase Firestore |
| OCR | Gemini Vision multimodal |
| Voice | Web Speech API + TTS |
| Auth | Firebase Auth |

---

## Key Differentiators vs ClearTax

| Feature | ClearTax | TaxSetu |
|:---|:---:|:---:|
| Voice input (Hindi) | ❌ | ✅ |
| Photo invoice scan | ❌ | ✅ |
| Autonomous filing validation | ❌ | ✅ |
| Works on basic smartphones | Partial | ✅ |
| Explainable AI reasoning | ❌ | ✅ |

---

<div align="center">

Built by **[Surya Raj Salve](https://linkedin.com/in/salve-surya-raj)** — Agentic AI Engineer

[LinkedIn](https://linkedin.com/in/salve-surya-raj) · [Email](mailto:suryarajsalve@gmail.com)

</div>
