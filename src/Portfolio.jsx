import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   DATA  — all sourced from real GitHub repos
═══════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    icon: "🤖",
    title: "AI / GenAI Development",
    desc: "Building RAG pipelines, LLM-powered tools, and document intelligence systems using LangChain, FAISS, Ollama and local LLaMA models.",
  },
  {
    icon: "⚙️",
    title: "Backend Technologies",
    desc: "Actively expanding my skillset to master modern backend architectures, including REST APIs, FastAPI, and Node.js for scalable applications.",
  },
  {
    icon: "🌐",
    title: "Full-Stack Web Development",
    desc: "Crafting production-grade web apps with Next.js 14, React, TypeScript, Supabase, Firebase, PostgreSQL and Tailwind CSS.",
  },
  {
    icon: "🚀",
    title: "Continuous AI & ML Learning",
    desc: "A highly motivated student who adapts and learns daily to excel in Machine Learning and Generative AI through hands-on practice.",
  },
];

const EXPERIENCE = [
  {
    title: "Freelance Software Developer",
    company: "Self-Employed",
    period: "2023 – 2024",
    points: [
      "Led multiple end-to-end projects as technical lead — gathering requirements, building Python solutions, and delivering working software on time.",
      "Built AI-assisted tools in Python using RAG pipelines and LLM inference for natural language querying over structured and unstructured datasets.",
      "Worked with CSV and PDF datasets to build data processing scripts and client dashboards.",
    ],
  },
];

const EDUCATION = [
  {
    school: "Chandigarh University, Mohali",
    period: "2022 — 2026",
    degree: "B.E. Computer Science (Big Data Analytics) — CGPA: 7.46",
  },
  {
    school: "DAV Public School, Dhanbad",
    period: "2022",
    degree: "12th Standard — 80.83%  |  10th Standard — 84.67%",
  },
];

const RESUME_PROJECTS = [
  {
    title: "File Analysis AI Query System (PDF RAG Chatbot)",
    tech: "Python · LangChain · FAISS · Ollama · Streamlit · Tesseract OCR",
    points: [
      "Full-featured PDF-based RAG system: users upload PDFs, content is chunked and converted into vector embeddings via nomic-embed-text, then queried conversationally.",
      "Implemented multi-query retrieval with LangChain and FAISS vector DB for fast approximate nearest-neighbour search.",
      "Local LLM inference via Ollama (llama3.2 / llama3.1) — zero cloud cost, full privacy. Chat-style Streamlit UI with session memory and one-click DB reset.",
    ],
  },
  {
    title: "MoonzNails — Full-Stack E-Commerce Store",
    tech: "React 18 · Vite · Firebase · Firestore · Tailwind CSS · Google Auth",
    points: [
      "Complete e-commerce platform for nail products with product catalog, image galleries, cart, coupon system (₹100/₹200 off), order tracking and wishlist.",
      "Firebase Authentication with Google Login; Firestore for real-time data; admin dashboard for product and order management with role-gated routes.",
      "Deployed live on Vercel. 21 commits, production build with Vite for fast load times.",
    ],
  },
  {
    title: "CUReSell — University Campus Resale Marketplace",
    tech: "Next.js 14 · TypeScript · Supabase · PostgreSQL · Tailwind CSS",
    points: [
      "Full-stack peer-to-peer marketplace for university students to buy and sell used campus items — books, electronics, and more.",
      "Supabase for auth, real-time DB operations and row-level security; PostgreSQL for structured listings; middleware-protected routes for role-based access.",
      "95% TypeScript codebase with Prettier + ESLint + Husky pre-commit hooks ensuring code quality.",
    ],
  }, {
    title: "AI Powered Real-Time Stock Tracker",
    tech: "Python · Financial APIs · Data Visualization",
    points: [
      "Developed a system to fetch and monitor live stock prices using financial APIs.",
      "Implemented data visualization to track market trends and price fluctuations.",
      "Designed scalable architecture for monitoring multiple stocks simultaneously.",
    ],
  },
];

const SKILLS_LIST = [
  { label: "Languages", value: "Python, C++, SQL" },
  { label: "Core CS", value: "OOP, DBMS, OS, Data Structures & Algorithms" },
  { label: "AI / GenAI", value: "LangChain, Ollama, FAISS, RAG Pipelines, NLP, Prompt Engineering, nomic-embed-text" },
  { label: "Web Technologies", value: "React 18, Next.js 14, TypeScript, Tailwind CSS, Vite" },
  { label: "Backend & DB", value: "Supabase, Firebase, Firestore, PostgreSQL, REST APIs" },
  { label: "Tools & DevOps", value: "Git, GitHub, Vercel, Docker, ESLint, Husky, Tesseract OCR" },
];

const PROJECTS = [
  {
    title: "File Analysis AI Query System",
    subtitle: "PDF RAG Chatbot",
    category: "AI / ML",
    tech: ["Python", "LangChain", "FAISS", "Ollama", "Streamlit"],
    desc: "Upload any PDF and chat with it. Local LLaMA model + FAISS vector search + multi-query RAG pipeline. Zero cloud cost, full privacy.",
    github: "https://github.com/OmGupta2473/File-Analysis-AI-Query-System",
    live: null,
    emoji: "🧠",
    highlight: "Local LLM · RAG · Vector DB",
  },
  {
    title: "MoonzNails",
    subtitle: "E-Commerce Platform",
    category: "Web Development",
    tech: ["React 18", "Vite", "Firebase", "Tailwind CSS"],
    desc: "Full e-commerce store with cart, coupon system, Google Auth, admin dashboard and real-time Firestore. Deployed live on Vercel.",
    github: "https://github.com/OmGupta2473/moonz-nail-store",
    live: "https://moonz-nail-store.vercel.app",
    emoji: "💅",
    highlight: "Live on Vercel · Firebase · Admin Panel",
  },
  {
    title: "CUReSell",
    subtitle: "Campus Resale Marketplace",
    category: "Web Development",
    tech: ["Next.js 14", "TypeScript", "Supabase", "PostgreSQL"],
    desc: "Peer-to-peer marketplace for university students. Role-based access, protected routes, Supabase RLS, 95% TypeScript, strict linting.",
    github: "https://github.com/OmGupta2473/CUReSell",
    live: "https://curesell.vercel.app/",
    emoji: "🛍️",
    highlight: "Next.js 14 · Supabase RLS · TypeScript",
  },
  {
    title: "AI Powered Real-Time Stock Tracker",
    subtitle: "Financial Data Dashboard",
    category: "AI / ML",
    tech: ["Python", "APIs", "Data Visualization"],
    desc: "Real-time stock monitoring system that fetches live market data, tracks price movements and visualizes financial trends for multiple stocks.",
    github: "https://github.com/OmGupta2473/ai-powered-real-time-stock-tracker",
    live: null,
    emoji: "📈",
    highlight: "Real-Time Market Data · Analytics",
  },

  {
    title: "Enterprise AI Agent",
    subtitle: "Autonomous AI Workflow System",
    category: "AI / ML",
    tech: ["Python", "LLMs", "AI Agents"],
    desc: "AI agent system designed for enterprise workflows capable of automating tasks, processing requests and integrating with multiple tools.",
    github: "https://github.com/OmGupta2473/enterprise-agent",
    live: null,
    emoji: "🤖",
    highlight: "AI Agents · Automation",
  },

  {
    title: "AI Chat Integration",
    subtitle: "AI Chat Interface Integration",
    category: "AI / ML",
    tech: ["JavaScript", "AI APIs", "React"],
    desc: "Chat interface that integrates AI models into web applications enabling conversational interactions inside products.",
    github: "https://github.com/OmGupta2473/AIChatIntegration",
    live: null,
    emoji: "💬",
    highlight: "AI Chat · API Integration",
  },
];

const CERTS = [
  { name: "HackerRank SQL Skill Certification", year: "2025", link: "https://www.hackerrank.com/certificates/f108c90b1369" },
  { name: "Problem Solving — Intermediate (HackerRank)", year: "2025", link: "https://www.hackerrank.com/certificates/5665ba69c2b9" },
  { name: "University Artificial Intelligence — ACP Chandigarh University", year: "2024", link: "https://drive.google.com/file/d/1WUfl_NE20Loeo4y7VqZ1oHY7-5WGDbIV/edit?pli=1" },
];

/* ═══════════════════════════════════════════════════════════
   STYLES (Apple Glassmorphism UI)
═══════════════════════════════════════════════════════════ */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=SF+Pro+Display:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-color: #000000;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    --glass-highlight: inset 0 1px 1px rgba(255,255,255,0.1);
    
    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.6);
    --text-tertiary: rgba(255, 255, 255, 0.4);
    
    --accent: #fff;
    --accent-glow: rgba(255, 255, 255, 0.2);
    
    --radius-lg: 24px;
    --radius-md: 16px;
    --radius-sm: 10px;
    --radius-pill: 9999px;
  }

  html, body { 
    background-color: var(--bg-color);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Animated Mesh Gradient Background */
  .ambient-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -1;
    background: radial-gradient(circle at 15% 50%, rgba(60, 60, 100, 0.15), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(40, 80, 120, 0.15), transparent 25%);
    background-color: #000;
  }
  
  .ambient-blob-1, .ambient-blob-2 {
    position: absolute;
    filter: blur(80px);
    opacity: 0.5;
    border-radius: 50%;
    animation: float 20s infinite ease-in-out alternate;
  }
  .ambient-blob-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(100,50,255,0.1) 0%, transparent 70%);
    top: -100px; left: -100px;
  }
  .ambient-blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0,150,255,0.1) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    animation-delay: -10s;
  }

  @keyframes float {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(50px, 50px) scale(1.1); }
  }

  /* Glassmorphism Utilities */
  .glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
    border-radius: var(--radius-lg);
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
    box-shadow: var(--glass-highlight);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Typography */
  h1, h2, h3, h4 { font-weight: 600; letter-spacing: -0.02em; }
  p { line-height: 1.6; letter-spacing: -0.01em; }

  /* Layout */
  .pw {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 40px 24px;
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
    min-height: 100vh;
  }

  /* ── SIDEBAR ── */
  .sb {
    width: 320px;
    flex-shrink: 0;
    position: sticky;
    top: 40px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .av-container {
    position: relative;
    width: 120px; height: 120px;
    border-radius: 50%;
    padding: 4px;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
    box-shadow: 0 0 20px rgba(255,255,255,0.05);
  }
  .av {
    width: 100%; height: 100%;
    background: #111;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.1);
  }

  .sb-name {
    font-size: 24px; font-weight: 700;
    text-align: center; line-height: 1.2;
    background: linear-gradient(180deg, #fff, #a0a0a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .sb-role {
    color: var(--text-secondary);
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.05em; text-transform: uppercase;
    text-align: center;
    background: rgba(255,255,255,0.05);
    padding: 6px 12px; border-radius: var(--radius-pill);
    border: 1px solid var(--glass-border);
  }

  .sb-sep {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--glass-border), transparent);
  }

  .sb-links {
    width: 100%;
    display: flex; flex-direction: column; gap: 12px;
  }

  .contact-link {
    display: flex; align-items: center; gap: 16px;
    padding: 12px;
    border-radius: var(--radius-md);
    background: rgba(255,255,255,0.02);
    border: 1px solid transparent;
    transition: all 0.3s ease;
    text-decoration: none;
    cursor: pointer;
  }
  /* Hover handled by Framer Motion mostly, but fallback here */
  .contact-link:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.1);
  }

  .contact-icon-wrap {
    width: 36px; height: 36px;
    background: rgba(255,255,255,0.05);
    border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; color: var(--text-primary);
    box-shadow: var(--glass-highlight);
    border: 1px solid var(--glass-border);
  }

  .contact-info { display: flex; flex-direction: column; overflow: hidden; }
  .contact-lbl { font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px; }
  .contact-val { font-size: 13px; color: var(--text-primary); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ── MAIN ── */
  .mn {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Apple-style floating nav */
  .top-nav-container {
    position: sticky; top: 40px; z-index: 50;
    display: flex; justify-content: center;
  }
  .top-nav {
    display: inline-flex;
    padding: 6px;
    border-radius: var(--radius-pill);
    background: rgba(20, 20, 20, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05);
  }

  .nav-btn {
    position: relative;
    background: transparent; border: none;
    color: var(--text-secondary);
    font-size: 13px; font-weight: 500;
    padding: 10px 20px;
    border-radius: var(--radius-pill);
    cursor: pointer;
    transition: color 0.3s;
    z-index: 1;
  }
  .nav-btn:hover { color: var(--text-primary); }
  .nav-btn.active { color: #000; font-weight: 600; }
  
  .nav-highlight {
    position: absolute;
    inset: 0;
    background: var(--text-primary);
    border-radius: var(--radius-pill);
    z-index: -1;
  }

  .tc {
    padding: 40px;
    min-height: 600px;
  }

  .page-title {
    font-size: 32px; font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 8px;
    letter-spacing: -0.03em;
  }

  .title-sep {
    width: 60px; height: 3px;
    background: var(--text-primary);
    border-radius: 2px;
    margin-bottom: 32px;
    opacity: 0.2;
  }

  /* ── ABOUT ── */
  .bio-text {
    font-size: 15px; line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 24px;
    font-weight: 400;
  }
  .bio-text strong { color: var(--text-primary); font-weight: 500; }

  .section-subtitle {
    font-size: 20px; font-weight: 600;
    color: var(--text-primary);
    margin: 40px 0 24px;
  }

  .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .service-card { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
  .service-icon-wrap {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02));
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .service-title { font-size: 15px; font-weight: 600; color: var(--text-primary); }
  .service-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; }

  /* ── RESUME ── */
  .resume-section { margin-bottom: 48px; }
  .resume-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
  }
  .rh-icon {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; border: 1px solid rgba(255,255,255,0.1);
  }
  .rh-title { font-size: 20px; font-weight: 600; }

  .timeline {
    position: relative; padding-left: 24px;
  }
  .timeline::before {
    content: ''; position: absolute; left: 6px; top: 6px; bottom: 0; width: 1px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.05));
  }
  .tl-item { position: relative; padding-bottom: 32px; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-dot {
    position: absolute; left: -22.5px; top: 6px;
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--text-primary);
    box-shadow: 0 0 0 4px rgba(255,255,255,0.1);
  }
  .tl-title { font-size: 16px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
  .tl-period { font-size: 12px; font-weight: 500; color: var(--text-tertiary); margin-bottom: 8px; font-variant-numeric: tabular-nums; }
  .tl-subtitle { font-size: 14px; color: var(--text-secondary); margin-bottom: 12px; font-weight: 500; }
  .tl-points { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .tl-points li { font-size: 13px; color: var(--text-secondary); line-height: 1.6; position: relative; padding-left: 16px; }
  .tl-points li::before { content: '→'; position: absolute; left: 0; color: var(--text-tertiary); font-size: 12px; }

  .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; }
  .skill-item { padding: 16px 20px; }
  .skill-label { font-size: 12px; color: var(--text-tertiary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
  .skill-value { font-size: 14px; color: var(--text-primary); line-height: 1.5; font-weight: 500; }

  /* ── PROJECTS ── */
  .filter-row { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }
  .filter-btn {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-secondary);
    padding: 8px 16px; border-radius: var(--radius-pill);
    font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.3s;
  }
  .filter-btn:hover { background: rgba(255,255,255,0.08); color: var(--text-primary); }
  .filter-btn.active { background: var(--text-primary); color: #000; border-color: var(--text-primary); }

  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  
  .project-card {
    display: flex; flex-direction: column;
    overflow: hidden; height: 100%;
    transform-style: preserve-3d;
  }
  
  .project-img-wrap {
    position: relative; height: 160px;
    background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01));
    display: flex; align-items: center; justify-content: center;
    font-size: 56px;
    border-bottom: 1px solid var(--glass-border);
  }
  
  .project-links-overlay {
    position: absolute; inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center; gap: 12px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .project-card:hover .project-links-overlay { opacity: 1; }
  
  .btn-apple {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    padding: 8px 16px; border-radius: var(--radius-pill);
    font-size: 12px; font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }
  .btn-apple:hover { background: #fff; color: #000; transform: scale(1.05); }

  .project-content { padding: 20px; flex: 1; display: flex; flex-direction: column; }
  .project-highlight { font-size: 10px; font-weight: 600; color: var(--text-primary); opacity: 0.7; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
  .project-title { font-size: 18px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; line-height: 1.3; }
  .project-subtitle { font-size: 13px; color: var(--text-tertiary); margin-bottom: 12px; font-weight: 500; }
  .project-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px; flex: 1; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; }
  .project-tag { 
    font-size: 11px; font-weight: 500;
    padding: 4px 8px; border-radius: 6px;
    background: rgba(255,255,255,0.05);
    color: var(--text-secondary); 
    border: 1px solid rgba(255,255,255,0.05);
  }

  /* ── CERTS ── */
  .certs-list { display: flex; flex-direction: column; gap: 16px; }
  .cert-card {
    padding: 20px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px;
  }
  .cert-info { display: flex; align-items: center; gap: 16px; }
  .cert-icon { font-size: 24px; }
  .cert-name { font-size: 15px; font-weight: 600; color: var(--text-primary); }
  .cert-year { font-size: 13px; color: var(--text-tertiary); margin-top: 4px; }
  
  /* ── CONTACT ── */
  .contact-wrapper { max-width: 600px; margin: 0 auto; }
  .contact-form { padding: 32px; display: flex; flex-direction: column; gap: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  
  .input-field {
    width: 100%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--text-primary);
    padding: 14px 16px;
    border-radius: var(--radius-md);
    font-family: inherit; font-size: 14px;
    transition: border-color 0.3s, background 0.3s;
    outline: none;
  }
  .input-field::placeholder { color: var(--text-tertiary); }
  .input-field:focus { border-color: rgba(255,255,255,0.3); background: rgba(0,0,0,0.4); }
  
  textarea.input-field { min-height: 150px; resize: vertical; }

  .submit-btn {
    background: var(--text-primary);
    color: #000;
    border: none;
    padding: 16px;
    border-radius: var(--radius-md);
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
  }
  
  .success-msg {
    padding: 24px; text-align: center;
    background: rgba(255,255,255,0.05);
    border-radius: var(--radius-md);
    color: var(--text-primary); font-weight: 500;
    border: 1px solid rgba(255,255,255,0.1);
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg-color); }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }

  @media (max-width: 960px) {
    .pw { flex-direction: column; padding: 24px; gap: 24px; }
    .sb { width: 100%; position: static; padding: 24px; }
    .sb-links { flex-direction: row; flex-wrap: wrap; justify-content: center; }
    .contact-link { padding: 10px; width: calc(50% - 6px); }
  }
  @media (max-width: 600px) {
    .top-nav { max-width: 100%; overflow-x: auto; padding: 4px; border-radius: var(--radius-md); }
    .nav-btn { padding: 8px 12px; font-size: 12px; white-space: nowrap; }
    .top-nav-container { padding: 0 16px; }
    .tc { padding: 24px; }
    .form-row { grid-template-columns: 1fr; gap: 16px; }
    .contact-link { width: 100%; }
  }
`;

/* ═══════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════ */

const pageTransition = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(10px)" },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

function Sidebar() {
  const contacts = [
    { icon: "✉", lbl: "Email", val: "omgupta2473@gmail.com", href: "mailto:omgupta2473@gmail.com" },
    { icon: "⬇", lbl: "Resume", val: "Download Resume", href: "#" },
    { icon: "in", lbl: "LinkedIn", val: "om-gupta-265b80268", href: "https://linkedin.com/in/om-gupta-265b80268" },
    { icon: "gh", lbl: "GitHub", val: "OmGupta2473", href: "https://github.com/OmGupta2473" },
    { icon: "📍", lbl: "Location", val: "India", href: null },
  ];

  return (
    <motion.aside
      className="sb glass-panel"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="av-container">
        <div className="av">👨‍💻</div>
      </div>
      <div>
        <div className="sb-name">Om Kumar</div>
        <div style={{ marginTop: 8 }} className="sb-role">AI & Full-Stack Eng</div>
      </div>

      <div className="sb-sep" />

      <div className="sb-links">
        {contacts.map((c, i) => {
          const inner = (
            <>
              <div className="contact-icon-wrap" style={{ fontFamily: (c.icon === "in" || c.icon === "gh") ? "serif" : "inherit" }}>
                {c.icon === "gh" ? "GH" : c.icon}
              </div>
              <div className="contact-info">
                <div className="contact-lbl">{c.lbl}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            </>
          );
          return c.href ? (
            <motion.a
              key={c.lbl} className="contact-link" href={c.href} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
            >
              {inner}
            </motion.a>
          ) : (
            <motion.div key={c.lbl} className="contact-link">
              {inner}
            </motion.div>
          );
        })}
      </div>
    </motion.aside>
  );
}

/* ─── About ─── */
function AboutTab() {
  return (
    <motion.div {...pageTransition}>
      <h1 className="page-title">About Me</h1>
      <div className="title-sep" />
      <p className="bio-text">
        I'm <strong>Om Kumar</strong>, a Computer Science undergraduate specialising in Big Data Analytics at Chandigarh University.
        I have a strong passion for AI-driven applications — building RAG pipelines, LLM inference systems and
        intelligent document query tools using LangChain, FAISS and Ollama.
      </p>
      <p className="bio-text">
        On the web side I ship full-stack products with Next.js 14, React, TypeScript, Supabase and Firebase —
        from campus marketplaces to e-commerce stores with live admin dashboards. Always learning, always building.
      </p>

      <h2 className="section-subtitle">What I'm Doing</h2>
      <div className="services-grid">
        {SERVICES.map((s, i) => (
          <motion.div
            className="service-card glass-card" key={s.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="service-icon-wrap">{s.icon}</div>
            <div>
              <div className="service-title">{s.title}</div>
              <div className="service-desc">{s.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Resume ─── */
function ResumeTab() {
  return (
    <motion.div {...pageTransition}>
      <h1 className="page-title">Resume</h1>
      <div className="title-sep" />

      <div className="resume-section">
        <div className="resume-header"><div className="rh-icon">💼</div><div className="rh-title">Experience</div></div>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <motion.div className="tl-item" key={e.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="tl-dot" />
              <div className="tl-title">{e.title}</div>
              <div className="tl-subtitle">{e.company}</div>
              <div className="tl-period">{e.period}</div>
              <ul className="tl-points">{e.points.map((p, j) => <li key={j}>{p}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <div className="resume-header"><div className="rh-icon">📖</div><div className="rh-title">Education</div></div>
        <div className="timeline">
          {EDUCATION.map((e, i) => (
            <motion.div className="tl-item" key={e.school} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="tl-dot" />
              <div className="tl-title">{e.school}</div>
              <div className="tl-period">{e.period}</div>
              <div className="tl-subtitle">{e.degree}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <div className="resume-header"><div className="rh-icon">⭐</div><div className="rh-title">Featured Work</div></div>
        <div className="timeline">
          {RESUME_PROJECTS.map((p, i) => (
            <motion.div className="tl-item" key={p.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="tl-dot" />
              <div className="tl-title">{p.title}</div>
              <div className="tl-subtitle" style={{ color: 'var(--text-primary)', opacity: 0.8 }}>{p.tech}</div>
              <ul className="tl-points">{p.points.map((pt, j) => <li key={j}>{pt}</li>)}</ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="resume-section">
        <div className="resume-header"><div className="rh-icon">🔧</div><div className="rh-title">Technical Skills</div></div>
        <div className="skills-grid">
          {SKILLS_LIST.map((s, i) => (
            <motion.div className="skill-item glass-card" key={s.label} whileHover={{ scale: 1.02 }}>
              <div className="skill-label">{s.label}</div>
              <div className="skill-value">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects ─── */
function ProjectsTab() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Web Development", "AI / ML"];
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <motion.div {...pageTransition}>
      <h1 className="page-title">Portfolio</h1>
      <div className="title-sep" />

      <div className="filter-row">
        {filters.map(f => (
          <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                y: -10,
                rotateX: 2,
                rotateY: -2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)"
              }}
              style={{ perspective: 1000 }}
              className="project-card glass-card" key={p.title}
            >
              <div className="project-img-wrap">
                <span>{p.emoji}</span>
                <div className="project-links-overlay">
                  {p.github && (
                    <motion.a whileHover={{ scale: 1.05 }} className="btn-apple" href={p.github} target="_blank" rel="noreferrer">
                      GitHub
                    </motion.a>
                  )}
                  {p.live && (
                    <motion.a whileHover={{ scale: 1.05 }} className="btn-apple" style={{ background: '#fff', color: '#000' }} href={p.live} target="_blank" rel="noreferrer">
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
              <div className="project-content">
                <div className="project-highlight">{p.highlight}</div>
                <div className="project-title">{p.title}</div>
                <div className="project-subtitle">{p.subtitle}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tech.map(t => <span className="project-tag" key={t}>{t}</span>)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* ─── Certifications ─── */
function CertsTab() {
  return (
    <motion.div {...pageTransition}>
      <h1 className="page-title">Certifications</h1>
      <div className="title-sep" />

      <div className="certs-list">
        {CERTS.map((c, i) => (
          <motion.div
            className="cert-card glass-card" key={c.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="cert-info">
              <div className="cert-icon">🏅</div>
              <div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-year">{c.year}</div>
              </div>
            </div>
            {c.link !== "#" && <a className="btn-apple" href={c.link} target="_blank" rel="noreferrer" style={{ background: 'transparent' }}>View ↗</a>}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Contact ─── */
function ContactTab() {
  const [sent, setSent] = useState(false);
  const [n, setN] = useState(""); const [e, setE] = useState(""); const [m, setM] = useState("");

  return (
    <motion.div {...pageTransition}>
      <h1 className="page-title">Get in Touch</h1>
      <div className="title-sep" />

      <div className="contact-wrapper">
        <motion.div className="contact-form glass-panel" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {sent ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="success-msg">
              <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
              Message sent successfully!<br />I'll get back to you soon.
            </motion.div>
          ) : (
            <>
              <div className="form-row">
                <input className="input-field" placeholder="Full Name" value={n} onChange={x => setN(x.target.value)} />
                <input className="input-field" placeholder="Email Address" type="email" value={e} onChange={x => setE(x.target.value)} />
              </div>
              <textarea className="input-field" placeholder="Your Message" value={m} onChange={x => setM(x.target.value)} />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="submit-btn"
                onClick={() => { if (n && e && m) setSent(true); }}
              >
                Send Message
              </motion.button>
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
export default function Portfolio() {
  const [tab, setTab] = useState("About");
  const tabs = ["About", "Resume", "Projects", "Certifications", "Contact"];

  return (
    <>
      <style>{css}</style>
      <div className="ambient-bg">
        <div className="ambient-blob-1" />
        <div className="ambient-blob-2" />
      </div>

      <div className="pw">
        <Sidebar />
        <main className="mn">
          <div className="top-nav-container">
            <nav className="top-nav">
              {tabs.map(t => (
                <button
                  key={t}
                  className={`nav-btn ${tab === t ? "active" : ""}`}
                  onClick={() => setTab(t)}
                >
                  {tab === t && (
                    <motion.div
                      layoutId="nav-highlight"
                      className="nav-highlight"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 2 }}>{t}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="tc glass-panel">
            <AnimatePresence mode="wait">
              {tab === "About" && <AboutTab key="About" />}
              {tab === "Resume" && <ResumeTab key="Resume" />}
              {tab === "Projects" && <ProjectsTab key="Projects" />}
              {tab === "Certifications" && <CertsTab key="Certifications" />}
              {tab === "Contact" && <ContactTab key="Contact" />}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </>
  );
}
