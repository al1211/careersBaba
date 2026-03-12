
"use client"
import { useState } from "react";
import { 
  FaBookOpen, FaVideo, FaFileAlt, FaPen, FaAward, FaChevronDown,
  FaChevronRight, FaStar, FaUsers, FaClock, FaChartLine, FaCheckCircle,
  FaBell, FaDownload, FaPlay, FaArrowRight, FaShieldAlt, FaBullseye, FaBolt
} from "react-icons/fa";

const NAV_LINKS = ["Overview", "Courses", "Free Resources", "Exam Info", "Mentors", "Results", "FAQs"];

const COURSES = [
  { title: "UPSC Foundation Batch 2026", tag: "Most Popular", price: "₹18,999", original: "₹28,000", duration: "18 months", mode: "Live Online", students: "12,400+", color: "#1a3a6b", features: ["300+ Live Classes", "Full GS Coverage", "Essay & Ethics", "PI Prep"] },
  { title: "UPSC Prelims Crash Course", tag: "Quick Start", price: "₹6,499", original: "₹10,000", duration: "4 months", mode: "Live + Recorded", students: "8,200+", color: "#7B2FBE", features: ["100 Topic Tests", "Current Affairs", "CSAT Special", "Doubt Sessions"] },
  { title: "UPSC Mains Exclusive", tag: "Advanced", price: "₹12,999", original: "₹19,000", duration: "6 months", mode: "Offline + Online", students: "5,900+", color: "#2D6A4F", features: ["Answer Writing", "Mains Mock Tests", "Faculty Review", "Strategy Sessions"] },
  { title: "UPSC Test Series 2026", tag: "Self-Prep", price: "₹3,499", original: "₹5,000", duration: "12 months", mode: "Self-Paced", students: "22,000+", color: "#B5451B", features: ["60 Full Mocks", "PYQ Bank", "Performance Analytics", "Rank Predictor"] },
];

const RESOURCES = [
  { icon: FaFileAlt, label: "Previous Year Papers", desc: "Last 10 years solved papers", color: "#1a3a6b" },
  { icon: FaPen, label: "Free Prelims Mock", desc: "Full-length exam simulation", color: "#2D6A4F" },
  { icon: FaBookOpen, label: "UPSC Syllabus PDF", desc: "GS I-IV + Optional breakdown", color: "#B5451B" },
  { icon: FaVideo, label: "Free Video Lectures", desc: "30+ hours of expert content", color: "#7B2FBE" },
];

const EXAM_DATA = {
    Prelims: [
    { label: "Date", value: "May 25, 2026 (Expected)" },
    { label: "Papers", value: "GS Paper I + CSAT (Paper II)" },
    { label: "Total Marks", value: "400 (200 each)" },
    { label: "Duration", value: "2 hours per paper" },
    { label: "Negative Marking", value: "1/3rd for wrong answers" },
    { label: "Mode", value: "Offline (OMR Based)" },
  ],
  Mains: [
    { label: "Date", value: "Sep 19, 2026 (Expected)" },
    { label: "Papers", value: "9 Papers (4 GS + Essay + Optional x2 + Lang)" },
    { label: "Total Marks", value: "1750 (Written)" },
    { label: "Duration", value: "3 hours per paper" },
    { label: "Answer Type", value: "Descriptive/Analytical" },
    { label: "Mode", value: "Offline (Written)" },
  ],
  Interview: [
    { label: "Date", value: "Feb–May 2027 (Expected)" },
    { label: "Conducting Body", value: "UPSC Board" },
    { label: "Total Marks", value: "275 marks" },
    { label: "Duration", value: "30–45 minutes" },
    { label: "Focus Areas", value: "Personality, Current Affairs, DAF" },
    { label: "Mode", value: "In-Person, New Delhi" },
  ],
};

const MENTORS = [
  { name: "Dr. Rajeev Ahuja", role: "IAS (Retd.) | 22 yrs experience", specialty: "GS & Essay Specialist", color: "#1a3a6b", initials: "RA" },
  { name: "Priya Mehta", role: "AIR 12, CSE 2019", specialty: "Mains Answer Writing", color: "#2D6A4F", initials: "PM" },
  { name: "Ankit Sharma", role: "IPS | IIT Delhi", specialty: "CSAT & Aptitude Expert", color: "#7B2FBE", initials: "AS" },
  { name: "Sunita Rao", role: "MA Political Science, JNU", specialty: "Polity & IR Faculty", color: "#B5451B", initials: "SR" },
];

const TOPPERS = [
  { name: "Aryan Kapoor", rank: "AIR 34", batch: "Foundation 2024", quote: "The structured answer writing program at this institute transformed my Mains score completely." },
  { name: "Divya Nair", rank: "AIR 67", batch: "Crash Course 2024", quote: "Current affairs integration with static syllabus — the way they teach is something I've never experienced." },
  { name: "Rohan Tiwari", rank: "AIR 112", batch: "Test Series 2024", quote: "60 mocks with detailed analytics gave me a clear edge in the actual Prelims." },
];

const FAQS = [
    { q: "What is the eligibility for UPSC CSE?", a: "Candidates must hold a Bachelor's degree from a recognised university. The minimum age is 21 years and maximum is 32 (with relaxations for reserved categories). General candidates can attempt up to 6 times." },
    { q: "How long does UPSC preparation typically take?", a: "Most aspirants take 1–2 years for serious preparation. With a strong academic background and dedicated strategy, 12–14 months of focused study can yield results in the first attempt." },
    { q: "Which optional subject is best for UPSC Mains?", a: "The best optional depends on your academic background, interest level, and overlap with GS syllabus. Popular choices include Anthropology, PSIR, History, Geography, and Sociology." },
    { q: "Does your institute offer offline classes?", a: "Yes, we offer classroom coaching in major cities alongside live online and recorded options. Our hybrid model ensures flexibility without compromising on quality." },
    { q: "What free resources do you provide for UPSC?", a: "We provide free Previous Year Papers, a full-length Prelims Mock Test, the official UPSC Syllabus PDF, and 30+ hours of introductory video lectures — all without registration." },
];
type ExamTab = "Prelims" | "Mains" | "Interview";
const EXAM_TABS:ExamTab[] = ["Prelims", "Mains", "Interview"];

export default function UPSCPage() {
  const [activeTab, setActiveTab] = useState<ExamTab>("Prelims");
  const [openFaq, setOpenFaq] = useState<null | number>(null);
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F5F4F0", minHeight: "100vh", color: "#1a1a1a"}}>
   

      

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #0f2448 0%, #1a3a6b 55%, #1e4d8c 100%)", padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* bg decor */}
        <div style={{ position: "absolute", top: -60, right: -60, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ position: "absolute", bottom: -80, left: "30%", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "center" }}>
          <div className="hero-anim">
            <span className="badge" style={{ background: "rgba(255,200,60,0.15)", color: "#ffd44d", marginBottom: 20 }}>
              ★ India's #1 UPSC Coaching Platform
            </span>
            <h1 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", marginBottom: 16 }}>
              Crack UPSC CSE <br />
              <span style={{ fontStyle: "italic", color: "#ffd44d" }}>with Expert Guidance</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, marginBottom: 32, maxWidth: 520 }}>
              From Prelims strategy to Interview coaching — a complete ecosystem built for serious aspirants. Over <strong style={{ color: "#fff" }}>15,000+ selections</strong> across IAS, IPS, IFS and allied services.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ background: "#ffd44d", color: "#1a1a1a", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700 }}>
                Explore Courses →
              </button>
              <button className="btn-primary" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "1px solid rgba(255,255,255,0.25)" }}>
                ▶ Watch Free Demo
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 36 }}>
              {[["15,000+", "Selections"], ["50+", "Expert Faculty"], ["60+", "Mock Tests"], ["9.2/10", "Student Rating"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#ffd44d", fontFamily: "'Playfair Display', serif" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead form */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#1a3a6b", marginBottom: 6 }}>Get 1:1 UPSC Guidance</h3>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 24 }}>Speak with an expert counsellor — free</p>
            {[["Full Name", "text", "Rahul Sharma"], ["Mobile Number", "tel", "+91 9876543210"], ["Email", "email", "rahul@email.com"]].map(([label, type, ph]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>{label}</label>
                <input type={type} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e2e0da", fontSize: 14, outline: "none", color: "#333" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5 }}>Target Year</label>
              <select style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e2e0da", fontSize: 14, color: "#333", background: "#fff" }}>
                <option>CSE 2026</option>
                <option>CSE 2027</option>
                <option>Not decided yet</option>
              </select>
            </div>
            <button className="btn-primary" style={{ width: "100%", background: "#1a3a6b", color: "#fff", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 700 }}>
              Book Free Session
            </button>
          </div>
        </div>
      </section>

      {/* UPDATES TICKER */}
      <div style={{ background: "#1a3a6b", padding: "10px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ background: "#ffd44d", color: "#1a1a1a", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>LIVE UPDATES</span>
          <div style={{ display: "flex", gap: 32, overflow: "hidden" }}>
            {["UPSC CSE 2026 Notification expected in Feb 2026", "Prelims Date: May 25, 2026 (Expected)", "New batch starting Jan 15 — Limited seats", "Free Mock Test live now — Attempt before it closes"].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
                <FaBell size={12} style={{ marginRight: 5, verticalAlign: "middle", opacity: 0.7 }} />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* COURSES */}
        <section style={{ padding: "72px 0 48px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label" style={{ marginBottom: 10 }}>Our Programs</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", color: "#1a1a1a", marginBottom: 14 }}>
              UPSC Coaching Programs
            </h2>
            <p style={{ color: "#777", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
              From foundations to final interview — we have a program calibrated to exactly where you are in your journey.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {COURSES.map((c, i) => (
              <div key={i} className="course-card" style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid #ebe9e2" }}>
                <div style={{ background: c.color, padding: "24px 24px 20px" }}>
                  <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", marginBottom: 12 }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>⏱ {c.duration}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>📡 {c.mode}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <ul style={{ listStyle: "none", marginBottom: 20 }}>
                    {c.features.map(f => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444", marginBottom: 8 }}>
                        <FaCheckCircle size={14} color={c.color} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: c.color, fontFamily: "'Playfair Display',serif" }}>{c.price}</div>
                      <div style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through" }}>{c.original}</div>
                      <div style={{ fontSize: 11, color: "#888" }}>{c.students} enrolled</div>
                    </div>
                    <button className="btn-primary" style={{ background: c.color, color: "#fff", padding: "10px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600 }}>
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
          <div style={{ background: "linear-gradient(135deg, #fdf9f0, #fff8eb)", borderRadius: 24, padding: "48px 40px", border: "1px solid #ede8da" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <p className="section-label" style={{ marginBottom: 10, color: "#B5451B" }}>100% Free</p>
                <h2 className="section-title" style={{ fontSize: "clamp(1.6rem,2.8vw,2.2rem)", color: "#1a1a1a", marginBottom: 14 }}>
                  Free Resources for UPSC Preparation
                </h2>
                <p style={{ color: "#777", fontSize: 15, lineHeight: 1.7 }}>
                  Before committing to a full program, test yourself. Our free tools give every aspirant a fair shot at evaluating their preparation level — no signup needed.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {RESOURCES.map((r, i) => (
                  <div key={i} className="resource-card" style={{ background: "#fff", borderRadius: 16, padding: "20px 18px", border: "1.5px solid #ebe8df", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: r.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <r.icon size={20} color={r.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", marginBottom: 3 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{r.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: r.color, marginTop: 4 }}>
                      Access Free <FaArrowRight size={12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXAM INFO */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ marginBottom: 10 }}>Know the Battleground</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#1a1a1a" }}>UPSC CSE Exam Details</h2>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #ebe9e2", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #ebe9e2" }}>
              {EXAM_TABS.map(t => (
                <button key={t} className="tab-btn" onClick={() => setActiveTab(t)}
                  style={{ flex: 1, padding: "16px", fontSize: 14, fontWeight: 600, background: activeTab === t ? "#1a3a6b" : "#fff", color: activeTab === t ? "#fff" : "#555" }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
              {EXAM_DATA[activeTab].map((row, i) => (
                <div key={i} style={{ padding: "18px 28px", borderBottom: "1px solid #f0efe9", borderRight: i % 2 === 0 ? "1px solid #f0efe9" : "none", display: "flex", gap: 16 }}>
                  <FaBell size={16} color="#1a3a6b" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORS */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ marginBottom: 10 }}>Learn From The Best</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#1a1a1a" }}>Top UPSC Mentors in India</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {MENTORS.map((m, i) => (
              <div key={i} className="mentor-card" style={{ background: "#fff", borderRadius: 18, padding: "28px 20px", textAlign: "center", border: "1px solid #ebe9e2" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: m.color, color: "#fff", fontSize: 24, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontFamily: "'Playfair Display',serif" }}>
                  {m.initials}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 4 }}>{m.name}</h4>
                <p style={{ fontSize: 12, color: m.color, fontWeight: 600, marginBottom: 6 }}>{m.role}</p>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{m.specialty}</p>
                <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 2 }}>
                  {[...Array(5)].map((_, s) => <FaStar key={s} size={12} fill="#ffd44d" color="#ffd44d" />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOPPERS */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ marginBottom: 10 }}>Success Stories</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#1a1a1a" }}>What Our UPSC Toppers Say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {TOPPERS.map((t, i) => (
              <div key={i} className="topper-card" style={{ background: "#fff", borderRadius: 18, padding: 28, border: "1px solid #ebe9e2" }}>
                <div style={{ fontSize: 36, color: "#1a3a6b", lineHeight: 1, marginBottom: 16, fontFamily: "Georgia, serif" }}>"</div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #f0efe9" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#1a3a6b", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{t.rank} · {t.batch}</div>
                  </div>
                  <span className="badge" style={{ background: "#eef1f8", color: "#1a3a6b", marginLeft: "auto", fontSize: 10 }}>{t.rank}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ padding: "48px 0 72px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ marginBottom: 10 }}>Got Questions?</p>
            <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#1a1a1a" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-row" onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ background: "#fff", borderRadius: 14, marginBottom: 12, border: "1px solid #ebe9e2", overflow: "hidden" }}>
                <div style={{ padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", paddingRight: 20 }}>{f.q}</span>
                  <FaChevronDown size={18} color="#888" style={{ transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px", fontSize: 14, color: "#666", lineHeight: 1.7, borderTop: "1px solid #f0efe9", paddingTop: 16 }}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: "linear-gradient(135deg, #0f2448, #1a3a6b)", padding: "56px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: "#fff", marginBottom: 12 }}>
          Your IAS Journey Starts <span style={{ fontStyle: "italic", color: "#ffd44d" }}>Today</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, marginBottom: 28 }}>Join 15,000+ successful officers who trusted us with their dream.</p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" style={{ background: "#ffd44d", color: "#1a1a1a", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 700 }}>
            Start Free Trial
          </button>
          <button className="btn-primary" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", padding: "14px 32px", borderRadius: 10, fontSize: 15, fontWeight: 600, border: "1px solid rgba(255,255,255,0.25)" }}>
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
}