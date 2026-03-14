"use client"
import { useState } from "react";
import {
  FaChevronDown, FaStar, FaCheckCircle, FaBell,
  FaArrowRight, FaFileAlt, FaBook, FaClipboardList,
  FaUniversity, FaChartBar, FaShieldAlt, FaRocket,
  FaNewspaper, FaTrophy, FaUserTie, FaGraduationCap,

} from "react-icons/fa";
import type { IconType } from "react-icons";

interface Course {
  title: string;
  tag: string;
  price: string;
  original: string;
  duration: string;
  mode: string;
  students: string;
  color: string;
  features: string[];
}

interface Resource {
  icon: IconType;
  label: string;
  desc: string;
  color: string;
}

interface CurriculumRow {
  label: string;
  value: string;
}

type CurrTab = "Foundation" | "Intensive Mains" | "Interview & Final Push";

interface Mentor {
  name: string;
  role: string;
  specialty: string;
  color: string;
  initials: string;
}

interface Topper {
  name: string;
  role: string;
  batch: string;
  tag: string;
  quote: string;
}

interface Faq {
  q: string;
  a: string;
}

interface StackIcon {
  label: string;
  color: string;
}

interface ExamDate {
  event: string;
  date: string;
}

const COURSES: Course[] = [
  {
    title: "UPSC CSE Complete Prep 2026",
    tag: "Most Popular",
    price: "₹4,999",
    original: "₹12,000",
    duration: "12 months",
    mode: "Live Online",
    students: "89,000+",
    color: "#0f3460",
    features: ["GS Paper I–IV Full Coverage", "CSAT + Essay Mastery", "Daily Mains Answer Writing", "8 Full-Length Mock Tests"],
  },
  {
    title: "SSC CGL & CHSL Crash Course",
    tag: "Fast Track",
    price: "₹2,499",
    original: "₹6,000",
    duration: "3 months",
    mode: "Live + Recorded",
    students: "1,14,000+",
    color: "#7b1a1a",
    features: ["Quant, Reasoning, English", "Tier I & Tier II Strategy", "Topic-wise Speed Tests", "PYQ Deep Dives 2015–2024"],
  },
  {
    title: "Banking — IBPS PO & SBI PO",
    tag: "Trending",
    price: "₹3,499",
    original: "₹8,000",
    duration: "6 months",
    mode: "Live + Mentored",
    students: "72,500+",
    color: "#14532d",
    features: ["Prelims + Mains Coverage", "Banking Awareness (GA)", "Descriptive English Writing", "Interview Guidance"],
  },
  {
    title: "State PSC All-in-One Pack",
    tag: "Best Value",
    price: "₹3,999",
    original: "₹9,500",
    duration: "8 months",
    mode: "Self-Paced",
    students: "43,200+",
    color: "#78350f",
    features: ["UPPSC, BPSC, MPPSC, KPSC", "State-Specific GK Modules", "Regional Language Support", "10 State-Specific Mocks"],
  },
];

const RESOURCES: Resource[] = [
  { icon: FaBook, label: "NCERT Summary Sheets", desc: "Class 6–12 condensed notes", color: "#0f3460" },
  { icon: FaChartBar, label: "PYQ Analysis 2010–2024", desc: "Topic frequency heatmaps", color: "#7b1a1a" },
  { icon: FaFileAlt, label: "Current Affairs Digest", desc: "Monthly 50-page PDF free", color: "#14532d" },
  { icon: FaClipboardList, label: "Free Mock Test", desc: "100-question full-length", color: "#78350f" },
];

const CURRICULUM_DATA: Record<CurrTab, CurriculumRow[]> = {
  "Foundation": [
    { label: "Duration", value: "Months 1–3" },
    { label: "History & Geography", value: "Ancient, Medieval, Modern India + Indian & World Geography" },
    { label: "Polity & Economy", value: "Indian Constitution, Governance, Budget & Economic Survey" },
    { label: "Projects", value: "NCERT Consolidation, Monthly CA Binders, Mind Maps" },
    { label: "Tools", value: "Testbook App, Drishti IAS Notes, Hindu PDF Archives, ForumIAS" },
    { label: "Assessment", value: "Weekly 50-Q Test + 250-Word Answer Writing" },
  ],
  "Intensive Mains": [
    { label: "Duration", value: "Months 4–8" },
    { label: "GS Papers", value: "GS I (Society, Culture), GS II (Polity, IR), GS III (Economy, Env, Tech)" },
    { label: "Techniques", value: "Answer Structuring, Keyword Insertion, Diagram Usage, Ethics Case Studies" },
    { label: "Projects", value: "15 Full Mains Answers/Week, Essay Peer Review, Optional Subject Kickoff" },
    { label: "Tools", value: "Insights IAS Answer Copy, Vision IAS Material, Shankar IAS Environment" },
    { label: "Assessment", value: "Evaluated Mains Copy + Mentor Feedback in 72 Hours" },
  ],
  "Interview & Final Push": [
    { label: "Duration", value: "Months 9–12" },
    { label: "Topics", value: "DAF Analysis, Current Affairs 360°, Personality Development, Stress Mock" },
    { label: "Practice", value: "10 Mock Interviews by Retired IAS/IPS Officers, Group Discussions" },
    { label: "Projects", value: "Hometown & Hobbies Deep Dive, Optional Expert Sessions, Revision Sprints" },
    { label: "Tools", value: "Unacademy Interview Prep, InsightsIAS Secure Initiative, AllIASNews" },
    { label: "Assessment", value: "Board Simulation + Scored Feedback Report" },
  ],
};

const CURR_TABS: CurrTab[] = ["Foundation", "Intensive Mains", "Interview & Final Push"];

const MENTORS: Mentor[] = [
  { name: "Anjali Srivastava", role: "IAS 2019 | AIR 34 | LBSNAA", specialty: "GS Strategy & Essay Writing", color: "#0f3460", initials: "AS" },
  { name: "Suresh Pandey", role: "IPS 2017 | Ex-DMPQ Faculty", specialty: "Mains Answer Writing", color: "#7b1a1a", initials: "SP" },
  { name: "Kavitha Menon", role: "SSC CGL AIR 12 | 7 Yrs Faculty", specialty: "Quant, Reasoning & English", color: "#14532d", initials: "KM" },
  { name: "Rohit Jha", role: "IBPS PO 2018 | SBI Faculty", specialty: "Banking Awareness & GA", color: "#78350f", initials: "RJ" },
];

const TOPPERS: Topper[] = [
  {
    name: "Divya Agarwal",
    role: "IAS Officer — Bihar Cadre",
    batch: "UPSC 2024 Batch",
    tag: "AIR 47",
    quote: "The answer writing program was a complete game-changer. Structured daily feedback from a sitting IAS officer in the mentorship sessions gave me the edge I needed. Cleared in my second attempt.",
  },
  {
    name: "Manish Kumar",
    role: "SSC CGL — Income Tax Inspector",
    batch: "SSC Batch 2024",
    tag: "Tier I: 182/200",
    quote: "The PYQ analysis tool showed me exactly which topics to prioritize. I stopped studying everything and started studying smart. Scored 182 in Tier I — highest in my coaching centre.",
  },
  {
    name: "Asha Pillai",
    role: "IBPS PO — Punjab National Bank",
    batch: "Banking 2024",
    tag: "Final Merit List",
    quote: "Banking awareness was always my weak point. The weekly GA capsules and the mock interview module with ex-bank employees fixed that completely. Got through in 4 months of joining.",
  },
];

const FAQS: Faq[] = [
  {
    q: "Can I prepare for UPSC while working a job?",
    a: "Absolutely. Our self-paced recorded tracks are designed for working professionals. All live sessions are recorded and available on-demand within 2 hours. Most successful candidates in our 2024 batch were working professionals who dedicated 4–5 hours daily. We also provide a dedicated 'Working Professionals' study planner.",
  },
  {
    q: "Which exam should I target — UPSC, SSC, or Banking?",
    a: "It depends on your timeline, academic background, and salary expectations. UPSC has the highest prestige but takes 2–4 years. SSC CGL results come in 8–12 months and offers Group B & C posts. Banking exams are conducted 4–5 times a year with quick results. Book a free counselling session and our advisors will map the right exam to your profile.",
  },
  {
    q: "Do you cover optional subjects for UPSC Mains?",
    a: "Yes. We offer dedicated optional modules for the top 12 optionals including Public Administration, Sociology, Geography, History, Political Science, Anthropology, and PSIR. Optional faculty are subject matter experts with proven track records. The optional module is available as an add-on or bundled with the flagship program.",
  },
  {
    q: "How current is your Current Affairs coverage?",
    a: "We publish a daily 2-page Current Affairs brief every morning by 7AM IST, a weekly 15-page consolidated PDF every Sunday, and a monthly 50-page Current Affairs magazine. All content is exam-mapped — every news item is tagged to the relevant GS paper and topic so you study smarter, not more.",
  },
  {
    q: "What does the mock test series include?",
    a: "Our mock series includes full-length Prelims mocks (100 MCQ × 2 papers), subject-wise sectional tests, mains GS answer writing with evaluated feedback, and mock interview panels with retired UPSC board members and serving IAS/IPS officers. All tests come with detailed solutions, rank analysis, and topic-wise performance reports.",
  },
];

const STACK_ICONS: StackIcon[] = [
  { label: "UPSC CSE", color: "#0f3460" },
  { label: "SSC CGL", color: "#7b1a1a" },
  { label: "SSC CHSL", color: "#7b1a1a" },
  { label: "IBPS PO", color: "#14532d" },
  { label: "SBI PO", color: "#14532d" },
  { label: "RBI Grade B", color: "#1e3a5f" },
  { label: "UPSC CAPF", color: "#0f3460" },
  { label: "State PSC", color: "#78350f" },
  { label: "Railways RRB", color: "#312e81" },
  { label: "EPFO/ESIC", color: "#374151" },
  { label: "NDA/CDS", color: "#1e3a5f" },
  { label: "CLAT/Judiciary", color: "#6b2737" },
];

const STATS: [string, string][] = [
  ["4.9★", "Avg Rating"],
];

const EXAM_DATES: ExamDate[] = [
  { event: "New UPSC Batch", date: "Apr 5, 2026" },
  { event: "Early Bird Ends", date: "Mar 28, 2026" },
  { event: "Free Demo Class", date: "Mar 23, 2026" },
  { event: "Scholarship Test", date: "Mar 30, 2026" },
  { event: "UPSC Prelims", date: "May 25, 2026" },
];

export default function GovJobsPage() {
  const [activeTab, setActiveTab] = useState<CurrTab>("Foundation");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Crimson Pro', Georgia, serif", background: "#F5F3EE", minHeight: "100vh", color: "#111" }}>

      {/* HERO */}
      <section style={{
        background: "linear-gradient(160deg, #06112a 0%, #0f2044 50%, #091830 100%)",
        padding: "72px 24px 80px",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 70% 20%, rgba(255,153,0,0.12) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(19,136,8,0.08) 0%, transparent 45%)",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", top: 48, right: 420,
          color: "rgba(255,153,0,0.09)", fontFamily: "'Crimson Pro', Georgia, serif",
          fontSize: 13, lineHeight: 1.9, pointerEvents: "none"
        }} className="hidden xl:block">
          <div>Article 315 — Public Service Commission</div>
          <div>Article 320 — Functions of PSC</div>
          <div>Article 323A — Admin Tribunals</div>
          <div style={{ marginTop: 12 }}>Preamble: We, the People of India...</div>
          <div>Schedule VII — Union &amp; State Lists</div>
        </div>

        <div style={{ maxWidth: 1140, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 48, alignItems: "center", position: "relative" }} className="grid-cols-1 lg:grid-cols-[1fr_380px]">
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,153,0,0.12)", border: "1px solid rgba(255,153,0,0.4)",
              borderRadius: 20, padding: "5px 14px", marginBottom: 22
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff9900", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#ffb84d", fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
                India&apos;s #1 Government Job Preparation Platform
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "white", marginBottom: 16,
              lineHeight: 1.2, fontWeight: 700,
              letterSpacing: "-0.02em"
            }}>
              Crack UPSC, SSC &amp; Banking —<br />
              <span style={{ color: "#ff9900" }}>Serve the Nation with Pride</span>
            </h1>

            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 32, maxWidth: 500 }}>
              From{" "}
              <span style={{ background: "rgba(255,153,0,0.15)", color: "#ffb84d", padding: "2px 8px", borderRadius: 4, fontFamily: "monospace", fontSize: 14 }}>Prelims</span>{" "}to
              the UPSC Interview — expert-led coaching for civil services, banking, and
              staff selection exams. Over{" "}
              <strong style={{ color: "white" }}>2,80,000+ students</strong> selected in government services.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button style={{
                background: "#d97706", color: "white",
                padding: "13px 28px", borderRadius: 10, fontSize: 15,
                fontWeight: 700, border: "none", cursor: "pointer",
                fontFamily: "inherit"
              }}>
                Explore Courses →
              </button>
              <button style={{
                background: "rgba(255,255,255,0.07)", color: "white",
                padding: "13px 28px", borderRadius: 10, fontSize: 15,
                fontWeight: 600, border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer"
              }}>
                ▶ Free Demo Class
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 36, marginTop: 40 }}>
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#ff9900", fontFamily: "monospace" }}>{v}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Form */}
          <div style={{ background: "white", borderRadius: 20, padding: 32, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }}>
            <div style={{ background: "#06112a", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontFamily: "monospace", fontSize: 12, color: "#ffb84d", lineHeight: 1.9, borderLeft: "3px solid #d97706" }}>
              <span style={{ color: "#666" }}># Your Government Service Journey</span><br />
              <span style={{ color: "#ffb84d" }}>exam</span> = <span style={{ color: "#ff9900" }}>UPSC</span>.<span style={{ color: "#86efac" }}>CSE</span>(<span style={{ color: "#fde68a" }}>year=2026</span>)<br />
              <span style={{ color: "#ffb84d" }}>you</span>.get_free_roadmap()
            </div>

            {([
              ["Full Name", "text", "Rahul Mishra"],
              ["Mobile Number", "tel", "+91 9876543210"],
              ["Email", "email", "rahul@email.com"],
            ] as [string, string, string][]).map(([label, type, ph]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, fontFamily: "sans-serif" }}>{label}</label>
                <input type={type} placeholder={ph} style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: "1.5px solid #e0e2ea", fontSize: 14, outline: "none",
                  color: "#333", boxSizing: "border-box", fontFamily: "sans-serif"
                }} />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, fontFamily: "sans-serif" }}>Target Exam</label>
              <select style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e0e2ea", fontSize: 14, color: "#333", background: "white", fontFamily: "sans-serif" }}>
                <option>UPSC Civil Services (IAS/IPS)</option>
                <option>SSC CGL / CHSL</option>
                <option>IBPS PO / SBI PO</option>
                <option>State PSC (UPPSC / BPSC etc.)</option>
                <option>Railway RRB / NDA / CDS</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#555", display: "block", marginBottom: 5, fontFamily: "sans-serif" }}>Preparation Stage</label>
              <select style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid #e0e2ea", fontSize: 14, color: "#333", background: "white", fontFamily: "sans-serif" }}>
                <option>Just Starting Out</option>
                <option>6+ Months into Prep</option>
                <option>Appeared Before — Want to Crack This Year</option>
              </select>
            </div>

            <button style={{
              width: "100%", background: "#0f3460", color: "white",
              padding: 14, borderRadius: 10, fontSize: 15, fontWeight: 700,
              border: "none", cursor: "pointer", fontFamily: "monospace"
            }}>
              Get My Free Roadmap →
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: "#bbb", marginTop: 12, fontFamily: "sans-serif" }}>Free · No spam · Expert callback in 2 hrs</p>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: "#06112a", padding: "10px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ background: "#d97706", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap", fontFamily: "monospace" }}>LIVE</span>
          <div style={{ display: "flex", gap: 36, overflow: "hidden" }}>
            {[
              "UPSC Prelims 2026 date announced — May 25 🏛️",
              "Divya Agarwal — AIR 47, IAS Bihar Cadre — Zero to Hero batch 2024",
              "SSC CGL 2025 Notification OUT — 17,727 vacancies",
              "Free Current Affairs class — Every Monday 8PM IST",
            ].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
                <FaBell size={11} style={{ marginRight: 5, verticalAlign: "middle", opacity: 0.6 }} />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* BATCH DATES */}
        <section style={{ padding: "40px 0 0" }}>
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #e4d9c8", padding: "24px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#0f3460", textTransform: "uppercase", marginBottom: 20, fontFamily: "sans-serif" }}>
              📅 Important Dates &amp; Batches
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              {EXAM_DATES.map((d, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#d97706", fontFamily: "monospace", marginBottom: 4 }}>{d.date}</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4, fontFamily: "sans-serif" }}>{d.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#d97706", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>Our Programs</p>
            <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#111", marginBottom: 14, letterSpacing: "-0.02em" }}>Government Job Preparation Courses</h2>
            <p style={{ color: "#777", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.65, fontFamily: "sans-serif" }}>
              Choose your track — whether UPSC Civil Services, SSC, Banking, or State PSC — and get expert-led preparation with proven results.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: 24 }}>
            {COURSES.map((c, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 18,
                overflow: "hidden", border: "1px solid #e4d9c8",
                transition: "transform 0.2s", cursor: "pointer"
              }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ padding: "24px 24px 20px", background: c.color }}>
                  <span style={{ background: "rgba(255,255,255,0.18)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "inline-block", marginBottom: 12, fontFamily: "sans-serif" }}>{c.tag}</span>
                  <h3 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: 17, fontWeight: 700, color: "white", lineHeight: 1.3 }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "sans-serif" }}>⏱ {c.duration}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "sans-serif" }}>📡 {c.mode}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <ul style={{ listStyle: "none", marginBottom: 20, padding: 0 }}>
                    {c.features.map((f) => (
                      <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#444", marginBottom: 8, fontFamily: "sans-serif" }}>
                        <FaCheckCircle size={13} color={c.color} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                    <button style={{
                      color: "white", padding: "10px 18px", borderRadius: 10,
                      fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
                      background: c.color, fontFamily: "sans-serif"
                    }}>
                      Enrol Now
                    </button>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: c.color, fontFamily: "monospace" }}>{c.price}</div>
                      <div style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through", fontFamily: "sans-serif" }}>{c.original}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXAMS COVERED STRIP */}
        <section style={{ paddingBottom: 40 }}>
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #e4d9c8", padding: "28px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#0f3460", textTransform: "uppercase", marginBottom: 24, fontFamily: "sans-serif" }}>
              🏛 Exams We Cover
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {STACK_ICONS.map((s, i) => (
                <span key={i} style={{
                  padding: "7px 14px", borderRadius: 8, fontSize: 12,
                  fontWeight: 700, fontFamily: "monospace", color: "white",
                  background: s.color + "ee"
                }}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FREE RESOURCES */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{
            background: "linear-gradient(135deg, #06112a, #0f2044)",
            borderRadius: 24, padding: "48px 40px",
            border: "1px solid rgba(255,153,0,0.15)",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 250, height: 250, borderRadius: "50%",
              background: "rgba(217,119,6,0.12)"
            }} />
            <div style={{
              position: "absolute", bottom: 24, right: 40,
              color: "rgba(255,153,0,0.05)", fontFamily: "monospace",
              fontSize: 11, lineHeight: 2, pointerEvents: "none"
            }} className="hidden lg:block">
              <div>Part XIV — Services Under the Union and States</div>
              <div>Article 309 — Recruitment &amp; Conditions of Service</div>
              <div>Article 311 — Dismissal, Removal, Reduction in Rank</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", position: "relative" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#ff9900", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>100% Free</p>
                <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.6rem,2.5vw,2rem)", color: "white", marginBottom: 14 }}>
                  Free Study Resources
                </h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.75, fontFamily: "sans-serif" }}>
                  Not sure which exam to target? Start with our free resources — no login required. Test your GK, explore exam patterns, and attempt a free mock test before committing to any course.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {RESOURCES.map((r, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.06)", borderRadius: 16,
                    padding: "18px 16px", border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", flexDirection: "column", gap: 10,
                    cursor: "pointer", transition: "transform 0.3s"
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <div style={{ width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: r.color + "30" }}>
                      <r.icon size={18} color={r.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 3 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>{r.desc}</div>
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

        {/* CURRICULUM */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#d97706", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>What You&apos;ll Learn</p>
            <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111" }}>UPSC CSE Curriculum Overview</h2>
          </div>
          <div style={{ background: "white", borderRadius: 20, border: "1px solid #e4d9c8", overflow: "hidden" }}>
            <div style={{ display: "flex", borderBottom: "1px solid #e4d9c8" }}>
              {CURR_TABS.map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  flex: 1, padding: "16px", fontSize: 13, fontWeight: 600,
                  cursor: "pointer", border: "none", whiteSpace: "nowrap",
                  background: activeTab === t ? "#0f3460" : "white",
                  color: activeTab === t ? "white" : "#555",
                  fontFamily: activeTab === t ? "monospace" : "sans-serif"
                }}>
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {CURRICULUM_DATA[activeTab].map((row, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "16px 28px",
                  borderBottom: "1px solid #f5f0e8",
                  borderRight: i % 2 === 0 ? "1px solid #f5f0e8" : "none"
                }}>
                  <FaUniversity size={14} color="#d97706" style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3, fontFamily: "sans-serif" }}>{row.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#111", fontFamily: "sans-serif" }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORS */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#d97706", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>Learn From The Best</p>
            <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111" }}>Expert Instructors &amp; Toppers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {MENTORS.map((m, i) => (
              <div key={i} style={{
                background: "white", borderRadius: 18, padding: "28px 20px",
                textAlign: "center", border: "1px solid #e4d9c8",
                transition: "transform 0.2s", cursor: "pointer"
              }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: m.color, color: "white", fontSize: 22, fontWeight: 700,
                  fontFamily: "monospace"
                }}>
                  {m.initials}
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 15, color: "#111", marginBottom: 4, fontFamily: "'Crimson Pro', serif" }}>{m.name}</h4>
                <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: m.color, fontFamily: "sans-serif" }}>{m.role}</p>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5, fontFamily: "sans-serif" }}>{m.specialty}</p>
                <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, s) => <FaStar key={s} size={12} fill="#d97706" color="#d97706" />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOPPERS */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#d97706", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>Success Stories</p>
            <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111" }}>Our Students Are Serving the Nation</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TOPPERS.map((t, i) => (
              <div key={i} style={{ background: "white", borderRadius: 18, padding: 28, border: "1px solid #e4d9c8" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontSize: 38, color: "#d97706", lineHeight: 1, fontFamily: "'Crimson Pro', serif" }}>&ldquo;</div>
                  <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, fontFamily: "monospace" }}>{t.tag}</span>
                </div>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, marginBottom: 20, fontFamily: "sans-serif" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #f5f0e8" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#0f3460", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, fontFamily: "serif" }}>{t.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#111", fontFamily: "'Crimson Pro', serif" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>{t.role}</div>
                  </div>
                  <span style={{ marginLeft: "auto", background: "#eff6ff", color: "#0f3460", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, fontFamily: "sans-serif" }}>{t.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "#d97706", textTransform: "uppercase", marginBottom: 10, fontFamily: "sans-serif" }}>Got Questions?</p>
            <h2 style={{ fontFamily: "'Crimson Pro', Georgia, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111" }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                background: "white", borderRadius: 14, marginBottom: 10,
                border: "1px solid #e4d9c8", overflow: "hidden", cursor: "pointer"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#111", paddingRight: 20, fontFamily: "sans-serif" }}>{f.q}</span>
                  <FaChevronDown size={16} color="#888" style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </div>
                {openFaq === i && (
                  <div style={{ padding: "16px 24px 20px", fontSize: 14, color: "#666", lineHeight: 1.75, borderTop: "1px solid #f5f0e8", fontFamily: "sans-serif" }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <div style={{
        background: "linear-gradient(135deg, #06112a, #0f2044)",
        padding: "80px 24px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(255,153,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,153,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div style={{
          position: "absolute", bottom: 32, left: 48,
          color: "rgba(255,153,0,0.05)", fontFamily: "monospace",
          fontSize: 12, lineHeight: 2, pointerEvents: "none", textAlign: "left"
        }} className="hidden lg:block">
          <div>while not_selected:</div>
          <div>&nbsp;&nbsp;study()</div>
          <div>&nbsp;&nbsp;revise()</div>
          <div>&nbsp;&nbsp;attempt()</div>
        </div>
        <div style={{ position: "relative", padding: "16px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏛️</div>
          <h2 style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: "clamp(1.8rem,3vw,2.5rem)",
            color: "white", marginBottom: 12
          }}>
            Your Government Service Journey Starts <em style={{ color: "#ff9900" }}>Today</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", marginBottom: 32, fontFamily: "sans-serif" }}>
            Join 2,80,000+ aspirants who cracked UPSC, SSC &amp; Banking with GovPrep India.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
            <button style={{
              background: "#d97706", color: "white", padding: "12px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none",
              cursor: "pointer", fontFamily: "'Crimson Pro', serif"
            }}>
              Start Free Trial
            </button>
            <button style={{
              background: "rgba(255,255,255,0.07)", color: "white", padding: "12px 32px",
              borderRadius: 10, fontSize: 15, fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer"
            }}>
              Download Study Plan PDF
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}