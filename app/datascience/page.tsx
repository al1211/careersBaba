"use client"
import { useState } from "react";
import {
  FaChevronDown, FaStar, FaClock, FaCheckCircle, FaBell,
  FaArrowRight, FaCode, FaDatabase, FaBrain, FaChartBar,
  FaPython, FaRobot, FaFlask, FaLayerGroup, FaShieldAlt
} from "react-icons/fa";

const NAV_LINKS = ["Overview", "Courses", "Free Resources", "Curriculum", "Mentors", "Results", "FAQs"];

const COURSES = [
  { title: "Data Science Bootcamp 2026", tag: "Most Popular", price: "₹22,999", original: "₹35,000", duration: "9 months", mode: "Live Online", students: "18,400+", color: "#0f7275", features: ["Python & ML", "Deep Learning", "Real Projects", "Placement Support"] },
  { title: "Python for Data Science", tag: "Beginner Friendly", price: "₹7,499", original: "₹12,000", duration: "3 months", mode: "Self-Paced", students: "31,200+", color: "#6a3de8", features: ["Pandas & NumPy", "Data Viz", "SQL Essentials", "Capstone Project"] },
  { title: "ML Engineer Track", tag: "Advanced", price: "₹29,999", original: "₹45,000", duration: "12 months", mode: "Live + Mentored", students: "4,900+", color: "#c4412f", features: ["MLOps & Pipelines", "LLM Fine-tuning", "Cloud Deployment", "System Design"] },
  { title: "Data Analytics Fast Track", tag: "Quick Start", price: "₹5,499", original: "₹8,500", duration: "6 weeks", mode: "Self-Paced", students: "27,000+", color: "#1e5f30", features: ["Excel & Power BI", "SQL Mastery", "Tableau", "Business Case Studies"] },
];

const RESOURCES = [
  { icon: FaPython, label: "Python Cheatsheet", desc: "Pandas, NumPy, Scikit-learn", color: "#0f7275" },
  { icon: FaDatabase, label: "SQL Practice Set", desc: "100+ interview-level queries", color: "#6a3de8" },
  { icon: FaChartBar, label: "Free Mini Project", desc: "End-to-end EDA on real dataset", color: "#c4412f" },
  { icon: FaBrain, label: "ML Roadmap PDF", desc: "Structured 6-month plan", color: "#1e5f30" },
];

const CURRICULUM_DATA = {
  Foundations: [
    { label: "Duration", value: "Weeks 1–6" },
    { label: "Topics", value: "Python, NumPy, Pandas, Visualization" },
    { label: "Projects", value: "3 Hands-on Mini Projects" },
    { label: "Tools", value: "Jupyter, VS Code, Git" },
    { label: "Assessment", value: "Weekly Quizzes + Peer Review" },
    { label: "Mode", value: "Live Sessions + Recordings" },
  ],
  "ML & AI": [
    { label: "Duration", value: "Weeks 7–18" },
    { label: "Topics", value: "Regression, Classification, Deep Learning, NLP" },
    { label: "Projects", value: "5 Real-world Industry Projects" },
    { label: "Tools", value: "Scikit-learn, TensorFlow, HuggingFace" },
    { label: "Assessment", value: "Kaggle Competitions + Capstone" },
    { label: "Mode", value: "Live + Mentored Sessions" },
  ],
  Deployment: [
    { label: "Duration", value: "Weeks 19–24" },
    { label: "Topics", value: "MLOps, APIs, Cloud, LLM Apps" },
    { label: "Projects", value: "1 Production-grade Capstone" },
    { label: "Tools", value: "Docker, FastAPI, AWS/GCP, Airflow" },
    { label: "Assessment", value: "End-to-End Deployment Review" },
    { label: "Mode", value: "Project-based + Career Prep" },
  ],
};

const MENTORS = [
  { name: "Dr. Kavita Iyer", role: "Ex-Google AI | PhD IIT Bombay", specialty: "Deep Learning & NLP", color: "#0f7275", initials: "KI" },
  { name: "Sameer Bose", role: "Ex-Amazon DS | 14 yrs exp", specialty: "ML Systems & MLOps", color: "#6a3de8", initials: "SB" },
  { name: "Riya Desai", role: "Kaggle Grandmaster", specialty: "Feature Eng & Competition ML", color: "#c4412f", initials: "RD" },
  { name: "Arjun Pillai", role: "Ex-Meta | MS Stanford", specialty: "LLMs & Generative AI", color: "#1e5f30", initials: "AP" },
];

const TOPPERS = [
  { name: "Sneha Krishnan", role: "Data Scientist @ Microsoft", batch: "Bootcamp 2024", quote: "The project-based curriculum was unlike anything I'd seen. I had a full portfolio before I even graduated." },
  { name: "Varun Mehta", role: "ML Engineer @ Flipkart", batch: "ML Track 2024", quote: "The MLOps section alone got me placed. I was building and deploying production models in week 20." },
  { name: "Aisha Khan", role: "Data Analyst @ BCG", batch: "Analytics Fast Track", quote: "Six weeks. That's all it took to go from zero SQL to cracking a consulting interview with confidence." },
];

const FAQS = [
  { q: "Do I need prior coding experience to join?", a: "No prior experience is needed for our Foundations or Analytics tracks. For the ML Engineer Track, basic Python familiarity is recommended. We offer a free Python primer to bridge any gaps." },
  { q: "How are projects structured in the program?", a: "Every course includes real-world capstone projects sourced from industry partners. You'll build an end-to-end portfolio — from data collection and cleaning to model deployment — reviewed by senior mentors." },
  { q: "What's the placement support like?", a: "Our dedicated career team provides resume reviews, LinkedIn optimization, mock technical interviews, and access to our 400+ hiring partner network. The Bootcamp comes with a placement guarantee." },
  { q: "Are classes recorded for later viewing?", a: "Yes. All live sessions are recorded and available for 12 months. Self-paced courses are available lifetime. You can learn on your schedule without missing content." },
  { q: "Which tools and languages will I learn?", a: "Core stack: Python, SQL, Pandas, Scikit-learn, TensorFlow/PyTorch, Tableau/Power BI, and cloud platforms (AWS/GCP). For the advanced track: Docker, Airflow, FastAPI, and HuggingFace transformers." },
];

type CurrTab = "Foundations" | "ML & AI" | "Deployment";
const CURR_TABS: CurrTab[] = ["Foundations", "ML & AI", "Deployment"];

const STATS = [["92%", "Placement Rate"], ["400+", "Hiring Partners"], ["50+", "Live Projects"], ["4.9★", "Avg Rating"]];

export default function DataSciencePage() {
  const [activeTab, setActiveTab] = useState<CurrTab>("Foundations");
  const [openFaq, setOpenFaq] = useState<null | number>(null);
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4F5F7", minHeight: "100vh", color: "#111" }}>

      {/* NAVBAR
      <nav style={{ background: "#fff", borderBottom: "1px solid #e4e5ea", position: "sticky", top: 0, zIndex: 100, padding: "0 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0f7275", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaDatabase size={15} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 17, color: "#0f2a2b", letterSpacing: "-0.03em" }}>DataPath</span>
            <span style={{ color: "#ccc", margin: "0 4px" }}>|</span>
            <span style={{ fontSize: 13, color: "#777", fontWeight: 500 }}>Data Science</span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => setActiveNav(l)}
                style={{ border: "none", fontSize: 13, fontWeight: 500, padding: "6px 12px", borderRadius: 6, cursor: "pointer",
                  color: activeNav === l ? "#0f7275" : "#555",
                  background: activeNav === l ? "#e8f5f5" : "transparent" }}>
                {l}
              </button>
            ))}
          </div>
          <button style={{ background: "#0f7275", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
            Free Counselling
          </button>
        </div>
      </nav> */}

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #071a1b 0%, #0f2a2b 50%, #0a2040 100%)", padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 80% 20%, rgba(15,114,117,0.18) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(106,61,232,0.12) 0%, transparent 50%)" }} />
        {/* grid lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(15,114,117,0.2)", border: "1px solid rgba(15,114,117,0.4)", borderRadius: 20, padding: "5px 14px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2de0a7", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#2de0a7", fontFamily: "'Space Mono', monospace", fontWeight: 600 }}>India's #1 Data Science Platform</span>
            </div>
            <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(2rem,4vw,3rem)", color: "#fff", marginBottom: 16, lineHeight: 1.2, letterSpacing: "-0.04em" }}>
              Launch Your Career in<br />
              <span style={{ color: "#2de0a7" }}>Data Science & AI</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 32, maxWidth: 500 }}>
              From Python basics to production ML — a structured, mentor-led program built for real job outcomes. Over <strong style={{ color: "#fff" }}>12,000+ placements</strong> at top tech, consulting, and product companies.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{ background: "#2de0a7", color: "#071a1b", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
                Explore Courses →
              </button>
              <button style={{ background: "rgba(255,255,255,0.07)", color: "#fff", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
                ▶ Watch Free Demo
              </button>
            </div>
            <div style={{ display: "flex", gap: 36, marginTop: 40 }}>
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#2de0a7", fontFamily: "'Space Mono', monospace" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
            <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, color: "#0f2a2b", marginBottom: 6, letterSpacing: "-0.03em" }}>Get a Free Career Roadmap</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Tailored to your background & goals</p>
            {[["Full Name", "text", "Priya Sharma"], ["Mobile Number", "tel", "+91 9876543210"], ["Email", "email", "priya@email.com"]].map(([label, type, ph]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{label}</label>
                <input type={type} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e0e2ea", fontSize: 14, outline: "none", color: "#333", boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Experience Level</label>
              <select style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e0e2ea", fontSize: 14, color: "#333", background: "#fff" }}>
                <option>Complete Beginner</option>
                <option>Some Python Knowledge</option>
                <option>Working Professional</option>
              </select>
            </div>
            <button style={{ width: "100%", background: "#0f7275", color: "#fff", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Book Free Session
            </button>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#0f2a2b", padding: "10px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, overflow: "hidden" }}>
          <span style={{ background: "#2de0a7", color: "#071a1b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap", fontFamily: "'Space Mono', monospace" }}>LIVE</span>
          <div style={{ display: "flex", gap: 36, overflow: "hidden" }}>
            {["New Batch Starting Feb 1 — 40 Seats Left", "Hiring Partners now include 12 new unicorn startups", "Free Python Bootcamp every Saturday 10AM IST", "Placement Record: 3 offers in 8 days — Sneha K., Bootcamp 2024"].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
                <FaBell size={11} style={{ marginRight: 5, verticalAlign: "middle", opacity: 0.6 }} />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* COURSES */}
        <section style={{ padding: "72px 0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#0f7275", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>Our Programs</p>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#111", marginBottom: 14, letterSpacing: "-0.04em" }}>Data Science Courses</h2>
            <p style={{ color: "#777", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
              From your first line of Python to deploying LLMs in production — choose the track that matches where you are.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: 24 }}>
            {COURSES.map((c, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid #e4e5ea", transition: "transform 0.2s", cursor: "pointer" }}>
                <div style={{ background: c.color, padding: "24px 24px 20px" }}>
                  <span style={{ background: "rgba(255,255,255,0.18)", color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "inline-block", marginBottom: 12 }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.4, letterSpacing: "-0.02em" }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>⏱ {c.duration}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>📡 {c.mode}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <ul style={{ listStyle: "none", marginBottom: 20, padding: 0 }}>
                    {c.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444", marginBottom: 8 }}>
                        <FaCheckCircle size={13} color={c.color} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: c.color, fontFamily: "'Space Mono', monospace" }}>{c.price}</div>
                      <div style={{ fontSize: 12, color: "#bbb", textDecoration: "line-through" }}>{c.original}</div>
                      <div style={{ fontSize: 11, color: "#999" }}>{c.students} enrolled</div>
                    </div>
                    <button style={{ background: c.color, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREE RESOURCES */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ background: "linear-gradient(135deg, #071a1b, #0f2a2b)", borderRadius: 24, padding: "48px 40px", border: "1px solid rgba(45,224,167,0.15)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 250, height: 250, borderRadius: "50%", background: "rgba(15,114,117,0.15)" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#2de0a7", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>100% Free</p>
                <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.6rem,2.5vw,2rem)", color: "#fff", marginBottom: 14, letterSpacing: "-0.03em" }}>
                  Free Resources to Get Started
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.75 }}>
                  No signup needed. Explore our free tools to gauge where you stand — then decide if a full program is right for you.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {RESOURCES.map((r, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: "18px 16px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: 10, cursor: "pointer" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: r.color + "25", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <r.icon size={18} color={r.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{r.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: r.color, marginTop: 2 }}>
                      Access Free <FaArrowRight size={11} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM / EXAM INFO equivalent */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#0f7275", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>What You'll Learn</p>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111", letterSpacing: "-0.04em" }}>Curriculum Overview</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e4e5ea", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #e4e5ea" }}>
              {CURR_TABS.map(t => (
                <button key={t} onClick={() => setActiveTab(t as CurrTab)}
                  style={{ flex: 1, padding: "16px", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer",
                    background: activeTab === t ? "#0f7275" : "#fff",
                    color: activeTab === t ? "#fff" : "#555",
                    fontFamily: activeTab === t ? "'Space Mono', monospace" : "inherit" }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {CURRICULUM_DATA[activeTab].map((row, i) => (
                <div key={i} style={{ padding: "18px 28px", borderBottom: "1px solid #f0f1f5", borderRight: i % 2 === 0 ? "1px solid #f0f1f5" : "none", display: "flex", gap: 14 }}>
                  <FaCode size={15} color="#0f7275" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORS */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#0f7275", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>Learn From The Best</p>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111", letterSpacing: "-0.04em" }}>Expert Mentors & Instructors</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {MENTORS.map((m, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 18, padding: "28px 20px", textAlign: "center", border: "1px solid #e4e5ea" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: m.color, color: "#fff", fontSize: 22, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Space Mono', monospace" }}>
                  {m.initials}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 4 }}>{m.name}</h4>
                <p style={{ fontSize: 12, color: m.color, fontWeight: 600, marginBottom: 6 }}>{m.role}</p>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{m.specialty}</p>
                <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 2 }}>
                  {[...Array(5)].map((_, s) => <FaStar key={s} size={12} fill="#f5a623" color="#f5a623" />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOPPERS / RESULTS */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#0f7275", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>Success Stories</p>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111", letterSpacing: "-0.04em" }}>Our Alumni Are Thriving</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TOPPERS.map((t, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid #e4e5ea" }}>
                <div style={{ fontSize: 38, color: "#0f7275", lineHeight: 1, marginBottom: 14, fontFamily: "'Space Mono', monospace" }}>"</div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #f0f1f5" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0f7275", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{t.role}</div>
                  </div>
                  <span style={{ background: "#e8f5f5", color: "#0f7275", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, marginLeft: "auto" }}>{t.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: "48px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#0f7275", textTransform: "uppercase", marginBottom: 10, fontFamily: "'Space Mono', monospace" }}>Got Questions?</p>
            <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111", letterSpacing: "-0.04em" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "#fff", borderRadius: 14, marginBottom: 10, border: "1px solid #e4e5ea", overflow: "hidden", cursor: "pointer" }}>
                <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111", paddingRight: 20 }}>{f.q}</span>
                  <FaChevronDown size={16} color="#888" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", paddingTop: 16, fontSize: 14, color: "#666", lineHeight: 1.75, borderTop: "1px solid #f0f1f5" }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: "linear-gradient(135deg, #071a1b, #0f2a2b)", padding: "60px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(45,224,167,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,224,167,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#fff", marginBottom: 12, letterSpacing: "-0.04em" }}>
            Your Data Career Starts <span style={{ color: "#2de0a7", fontStyle: "italic" }}>Now</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, marginBottom: 32 }}>Join 12,000+ data professionals who launched their careers with us.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: "#2de0a7", color: "#071a1b", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Start Free Trial
            </button>
            <button style={{ background: "rgba(255,255,255,0.07)", color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer" }}>
              Download Syllabus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}