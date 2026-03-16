"use client"
import { useState } from "react";
import {
  FaChevronDown, FaStar, FaCheckCircle, FaBell,
  FaArrowRight, FaBook, FaFlask, FaCalculator,
  FaGlobe, FaAtom, FaLeaf, FaLandmark, FaPlay,
  FaDownload, FaFileAlt, FaClipboardList, FaTrophy,
  FaUserGraduate, FaChartBar, FaLock, FaUnlock,
  FaPencilAlt, FaVideo, FaHeadphones, FaBrain,
  FaDna, FaMicroscope, FaInfinity, FaRocket
} from "react-icons/fa";
import type { IconType } from "react-icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subject {
  name: string;
  icon: IconType;
  color: string;
  chapters: number;
  videos: number;
  tests: number;
  topics: string[];
  tag?: string;
}

interface ChapterRow {
  no: number;
  title: string;
  subject: string;
  color: string;
  lessons: number;
  quiz: boolean;
  notes: boolean;
  free: boolean;
}

interface Topper {
  name: string;
  school: string;
  score: string;
  tag: string;
  quote: string;
}

interface Faq {
  q: string;
  a: string;
}

interface Resource {
  icon: IconType;
  label: string;
  desc: string;
  color: string;
}

interface Feature {
  icon: IconType;
  title: string;
  desc: string;
  color: string;
}

interface ExamDate {
  event: string;
  date: string;
}

type SubjectTab = "Mathematics" | "Physics" | "Chemistry" | "Biology" | "English";

// ─── Data ────────────────────────────────────────────────────────────────────

const SUBJECTS: Subject[] = [
  {
    name: "Mathematics",
    icon: FaCalculator,
    color: "#1a237e",
    chapters: 16,
    videos: 168,
    tests: 64,
    topics: ["Sets", "Relations & Functions", "Trigonometry", "Complex Numbers", "Sequences & Series", "Limits & Derivatives"],
    tag: "JEE Foundation",
  },
  {
    name: "Physics",
    icon: FaAtom,
    color: "#4a148c",
    chapters: 15,
    videos: 155,
    tests: 58,
    topics: ["Units & Measurement", "Motion in a Plane", "Laws of Motion", "Work & Energy", "Gravitation", "Thermodynamics"],
    tag: "JEE / NEET",
  },
  {
    name: "Chemistry",
    icon: FaFlask,
    color: "#880e4f",
    chapters: 14,
    videos: 148,
    tests: 56,
    topics: ["Basic Concepts", "Atomic Structure", "Chemical Bonding", "Equilibrium", "Redox Reactions", "Organic Chemistry"],
    tag: "Most Marks",
  },
  {
    name: "Biology",
    icon: FaDna,
    color: "#1b5e20",
    chapters: 22,
    videos: 180,
    tests: 70,
    topics: ["Cell Biology", "Biomolecules", "Plant Kingdom", "Animal Kingdom", "Morphology of Plants", "Body Fluids"],
    tag: "NEET Foundation",
  },
  {
    name: "English",
    icon: FaBook,
    color: "#bf360c",
    chapters: 10,
    videos: 88,
    tests: 36,
    topics: ["Hornbill Prose", "Snapshots Stories", "Grammar", "Writing Skills", "Literature Analysis", "Unseen Passages"],
  },
];

const SUBJECT_TABS: SubjectTab[] = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];

const CHAPTERS: Record<SubjectTab, ChapterRow[]> = {
  "Mathematics": [
    { no: 1, title: "Sets", subject: "Maths", color: "#1a237e", lessons: 6, quiz: true, notes: true, free: true },
    { no: 2, title: "Relations and Functions", subject: "Maths", color: "#1a237e", lessons: 7, quiz: true, notes: true, free: true },
    { no: 3, title: "Trigonometric Functions", subject: "Maths", color: "#1a237e", lessons: 10, quiz: true, notes: true, free: false },
    { no: 4, title: "Complex Numbers and Quadratic Equations", subject: "Maths", color: "#1a237e", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Linear Inequalities", subject: "Maths", color: "#1a237e", lessons: 5, quiz: true, notes: true, free: false },
    { no: 6, title: "Permutations and Combinations", subject: "Maths", color: "#1a237e", lessons: 7, quiz: true, notes: true, free: false },
    { no: 7, title: "Binomial Theorem", subject: "Maths", color: "#1a237e", lessons: 6, quiz: true, notes: true, free: false },
    { no: 8, title: "Sequences and Series", subject: "Maths", color: "#1a237e", lessons: 9, quiz: true, notes: true, free: false },
  ],
  "Physics": [
    { no: 1, title: "Physical World & Units and Measurements", subject: "Physics", color: "#4a148c", lessons: 6, quiz: true, notes: true, free: true },
    { no: 2, title: "Motion in a Straight Line", subject: "Kinematics", color: "#4a148c", lessons: 8, quiz: true, notes: true, free: true },
    { no: 3, title: "Motion in a Plane", subject: "Kinematics", color: "#4a148c", lessons: 9, quiz: true, notes: true, free: false },
    { no: 4, title: "Laws of Motion", subject: "Dynamics", color: "#4a148c", lessons: 10, quiz: true, notes: true, free: false },
    { no: 5, title: "Work, Energy and Power", subject: "Dynamics", color: "#4a148c", lessons: 9, quiz: true, notes: true, free: false },
    { no: 6, title: "Gravitation", subject: "Physics", color: "#4a148c", lessons: 8, quiz: true, notes: true, free: false },
    { no: 7, title: "Thermodynamics", subject: "Heat", color: "#4a148c", lessons: 8, quiz: true, notes: true, free: false },
    { no: 8, title: "Oscillations and Waves", subject: "Physics", color: "#4a148c", lessons: 10, quiz: true, notes: true, free: false },
  ],
  "Chemistry": [
    { no: 1, title: "Some Basic Concepts of Chemistry", subject: "Physical", color: "#880e4f", lessons: 7, quiz: true, notes: true, free: true },
    { no: 2, title: "Structure of Atom", subject: "Physical", color: "#880e4f", lessons: 9, quiz: true, notes: true, free: true },
    { no: 3, title: "Classification of Elements & Periodicity", subject: "Inorganic", color: "#880e4f", lessons: 7, quiz: true, notes: true, free: false },
    { no: 4, title: "Chemical Bonding and Molecular Structure", subject: "Physical", color: "#880e4f", lessons: 10, quiz: true, notes: true, free: false },
    { no: 5, title: "States of Matter", subject: "Physical", color: "#880e4f", lessons: 8, quiz: true, notes: true, free: false },
    { no: 6, title: "Equilibrium", subject: "Physical", color: "#880e4f", lessons: 9, quiz: true, notes: true, free: false },
    { no: 7, title: "Redox Reactions", subject: "Physical", color: "#880e4f", lessons: 6, quiz: true, notes: true, free: false },
    { no: 8, title: "Hydrocarbons", subject: "Organic", color: "#880e4f", lessons: 10, quiz: true, notes: true, free: false },
  ],
  "Biology": [
    { no: 1, title: "The Living World", subject: "Diversity", color: "#1b5e20", lessons: 5, quiz: true, notes: true, free: true },
    { no: 2, title: "Biological Classification", subject: "Diversity", color: "#1b5e20", lessons: 6, quiz: true, notes: true, free: true },
    { no: 3, title: "Plant Kingdom", subject: "Botany", color: "#1b5e20", lessons: 8, quiz: true, notes: true, free: false },
    { no: 4, title: "Animal Kingdom", subject: "Zoology", color: "#1b5e20", lessons: 9, quiz: true, notes: true, free: false },
    { no: 5, title: "Morphology of Flowering Plants", subject: "Botany", color: "#1b5e20", lessons: 8, quiz: true, notes: true, free: false },
    { no: 6, title: "Cell — The Unit of Life", subject: "Cell Bio", color: "#1b5e20", lessons: 9, quiz: true, notes: true, free: false },
    { no: 7, title: "Biomolecules", subject: "Biochemistry", color: "#1b5e20", lessons: 8, quiz: true, notes: true, free: false },
    { no: 8, title: "Body Fluids and Circulation", subject: "Physiology", color: "#1b5e20", lessons: 9, quiz: true, notes: true, free: false },
  ],
  "English": [
    { no: 1, title: "The Portrait of a Lady (Hornbill)", subject: "Prose", color: "#bf360c", lessons: 4, quiz: true, notes: true, free: true },
    { no: 2, title: "A Photograph / The Laburnum Top (Poetry)", subject: "Poetry", color: "#bf360c", lessons: 3, quiz: true, notes: true, free: true },
    { no: 3, title: "The Address (Snapshots)", subject: "Prose", color: "#bf360c", lessons: 3, quiz: true, notes: true, free: false },
    { no: 4, title: "Grammar — Tenses, Voice & Narration", subject: "Grammar", color: "#bf360c", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Writing — Notice, Article & Letter", subject: "Writing", color: "#bf360c", lessons: 6, quiz: true, notes: true, free: false },
    { no: 6, title: "Unseen Passage & Comprehension", subject: "Reading", color: "#bf360c", lessons: 6, quiz: true, notes: true, free: false },
  ],
};

const TOPPERS: Topper[] = [
  {
    name: "Aarav Sharma",
    school: "DPS R.K. Puram, New Delhi",
    score: "98/100",
    tag: "Maths Topper",
    quote: "The Trigonometry and Complex Numbers modules were exceptional — the JEE-pattern problems alongside board questions gave me mastery over both. I cleared my school finals with 98 and cracked JEE Advanced the next year. The progressive difficulty in each chapter is perfectly designed.",
  },
  {
    name: "Priya Nambiar",
    school: "Kendriya Vidyalaya, Thiruvananthapuram",
    score: "99/100",
    tag: "Biology Star",
    quote: "Biology Class 11 is tough — Animal Kingdom, Morphology, Biomolecules — but the diagram-based videos with NEET-style MCQs made everything stick. I scored 99 in boards and my NEET Biology score was in the 99th percentile. The chapter-wise tests are as tough as real NEET questions.",
  },
  {
    name: "Harsh Patel",
    school: "Narayana Jr. College, Ahmedabad",
    score: "97/100",
    tag: "Physics Ace",
    quote: "Laws of Motion and Thermodynamics used to paralyze me. The vector diagrams and derivation walkthroughs here are far better than any textbook. I scored full marks in the Numericals section. The mock tests in Physics also helped me crack JEE Mains in my first attempt.",
  },
];

const RESOURCES: Resource[] = [
  { icon: FaFileAlt, label: "NCERT Solutions Class 11", desc: "All subjects, all chapters", color: "#1a237e" },
  { icon: FaClipboardList, label: "School Exam Sample Papers", desc: "Latest CBSE Class 11 pattern", color: "#880e4f" },
  { icon: FaChartBar, label: "JEE / NEET Foundation Notes", desc: "Chapter-wise concept sheets", color: "#4a148c" },
  { icon: FaBook, label: "Revision Notes PDF", desc: "Quick-revision notes, all subjects", color: "#1b5e20" },
];

const FEATURES: Feature[] = [
  { icon: FaVideo, title: "HD Concept Videos", desc: "2,700+ lectures covering every NCERT Class 11 chapter — with board-pattern and JEE/NEET-level problem solving side by side.", color: "#1a237e" },
  { icon: FaClipboardList, title: "Chapter-wise Tests", desc: "300+ practice tests — school-exam MCQs and JEE/NEET-style questions both included for each chapter.", color: "#880e4f" },
  { icon: FaAtom, title: "JEE & NEET Foundation", desc: "Every PCM/PCB chapter mapped to JEE Mains & NEET patterns — build the competitive exam foundation in Class 11 itself.", color: "#4a148c" },
  { icon: FaHeadphones, title: "Doubt Solving", desc: "Ask doubts anytime via text or photo — subject experts respond within 2 hours, with live sessions during exam season.", color: "#bf360c" },
  { icon: FaChartBar, title: "Progress Tracker", desc: "Visual dashboards: chapter completion %, test scores, JEE/NEET readiness index, and weak topic heatmaps.", color: "#006064" },
  { icon: FaTrophy, title: "Full-Syllabus Mock Tests", desc: "School mid-term and annual exam mocks with detailed CBSE marking scheme — plus JEE/NEET mock series for PCM/PCB students.", color: "#1b5e20" },
];

const FAQS: Faq[] = [
  {
    q: "Is this course aligned with the latest CBSE Class 11 syllabus?",
    a: "Yes, all content is fully aligned with CBSE Class 11 curriculum for 2025–26. We cover the latest NCERT rationalized syllabus across Mathematics, Physics, Chemistry, Biology and English. Any CBSE syllabus updates are reflected within 48 hours. The course also maps content to JEE Mains and NEET patterns for PCM/PCB students.",
  },
  {
    q: "Does Class 11 content also cover JEE and NEET foundation?",
    a: "Absolutely. Class 11 is the most critical year for JEE and NEET preparation. Every chapter in Physics, Chemistry, Maths and Biology is taught with both the CBSE board exam and the JEE/NEET exam pattern in mind. We include JEE-level numericals for Maths and Physics, and NEET-level MCQs for Biology and Chemistry — alongside standard NCERT exercises.",
  },
  {
    q: "How are the practice tests structured?",
    a: "Chapter tests follow the school annual exam pattern — 1-mark, 3-mark and 5-mark questions as per CBSE. We also have JEE-style (single correct, multi-correct, integer type) and NEET-style (4-option MCQ) tests for each chapter. Students can choose the test type based on their goal. Full-syllabus mocks simulate the school annual exam and competitive exam environments.",
  },
  {
    q: "Is Class 11 Biology covered for NEET aspirants?",
    a: "Yes, Biology Class 11 is covered in full depth for NEET aspirants. All 22 chapters — from The Living World and Classification through Cell Biology, Biomolecules, Plant and Animal Morphology, to Physiology — are covered with NEET-style MCQ tests, diagram-based questions and previous year NEET papers mapped to each chapter.",
  },
  {
    q: "Are NCERT solutions and previous year papers included?",
    a: "Yes. The course includes complete NCERT Solutions for all Class 11 subjects, including solved examples, exercise questions and exemplar problems. We also include school annual exam papers from CBSE schools across India — with solutions and marking scheme explanations. JEE and NEET previous year questions are tagged to corresponding Class 11 chapters.",
  },
];

const EXAM_DATES: ExamDate[] = [
  { event: "Unit Test 1", date: "Apr 18, 2026" },
  { event: "Mid-Term Exam", date: "Sep 22, 2026" },
  { event: "Pre-Annual", date: "Dec 15, 2026" },
  { event: "Annual Exam", date: "Feb–Mar 2027" },
  { event: "JEE Mains (Yr 2)", date: "Jan 2028" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Class11Page() {
  const [activeSubject, setActiveSubject] = useState<SubjectTab>("Mathematics");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSubjectCard, setActiveSubjectCard] = useState<string | null>(null);

  const activeSubjectData = SUBJECTS.find((s) => s.name === activeSubject)!;
  const activeChapters = CHAPTERS[activeSubject];

  return (
    <div
      style={{
        fontFamily: "'Crimson Pro', Georgia, serif",
        background: "#F5F3EE",
        minHeight: "100vh",
        color: "#111",
      }}
    >
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(160deg, #06000f 0%, #0d0a2e 50%, #04000c 100%)",
          padding: "72px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "radial-gradient(circle at 70% 20%, rgba(120,80,255,0.14) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(255,60,120,0.08) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
        {/* dot grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(130,100,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(130,100,255,0.05) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            pointerEvents: "none",
          }}
        />
        {/* NCERT watermark */}
        <div
          style={{
            position: "absolute", top: 52, right: 440,
            color: "rgba(140,110,255,0.07)",
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 12, lineHeight: 2, pointerEvents: "none",
          }}
        >
          <div>Ch 1 — Sets | Relations & Functions — Ch 2</div>
          <div>Physics: Laws of Motion · Gravitation · Thermodynamics</div>
          <div>Biology: Cell Biology · Biomolecules · Plant Kingdom</div>
        </div>

        <div
          style={{
            maxWidth: 1140, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 380px",
            gap: 48, alignItems: "center", position: "relative",
          }}
        >
          {/* LEFT */}
          <div>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(130,100,255,0.12)",
                border: "1px solid rgba(130,100,255,0.4)",
                borderRadius: 20, padding: "5px 14px", marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#a07fff", display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12, color: "#c0aaff",
                  fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em",
                }}
              >
                CBSE Class 11 — Session 2025–26 · PCM · PCB · Commerce
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "white", marginBottom: 16,
                lineHeight: 1.2, fontWeight: 700, letterSpacing: "-0.02em",
              }}
            >
              Class 11 Board + Entrance Prep —<br />
              <span style={{ color: "#a07fff" }}>Score 95+ & Crack JEE / NEET</span>
            </h1>

            <p
              style={{
                fontSize: 16, color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75, marginBottom: 32, maxWidth: 500,
              }}
            >
              Maths · Physics · Chemistry · Biology · English — complete Class 11
              preparation with{" "}
              <span
                style={{
                  background: "rgba(130,100,255,0.15)", color: "#c0aaff",
                  padding: "2px 8px", borderRadius: 4,
                  fontFamily: "monospace", fontSize: 14,
                }}
              >
                HD videos
              </span>
              ,{" "}
              <span
                style={{
                  background: "rgba(130,100,255,0.15)", color: "#c0aaff",
                  padding: "2px 8px", borderRadius: 4,
                  fontFamily: "monospace", fontSize: 14,
                }}
              >
                JEE/NEET foundation
              </span>
              , and NCERT solutions. Trusted by{" "}
              <strong style={{ color: "white" }}>1,50,000+ Class 11 students</strong> across India.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                style={{
                  background: "#6d28d9", color: "white",
                  padding: "13px 28px", borderRadius: 10,
                  fontSize: 15, fontWeight: 700, border: "none",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Start Learning Free →
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.07)", color: "white",
                  padding: "13px 28px", borderRadius: 10, fontSize: 15,
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
                }}
              >
                ▶ Watch Demo Lecture
              </button>
            </div>

            {/* stats */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 36, marginTop: 40 }}>
              {[
                ["2,700+", "Video Lectures"],
                ["77", "Chapters Covered"],
                ["300+", "Practice Tests"],
                ["4.9★", "Student Rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#a07fff", fontFamily: "monospace" }}>{v}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3, fontFamily: "sans-serif" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Form */}
          <div
            style={{
              background: "white", borderRadius: 20, padding: 32,
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                background: "#06000f", borderRadius: 8, padding: "12px 16px",
                marginBottom: 20, fontFamily: "monospace", fontSize: 12,
                color: "#c0aaff", lineHeight: 1.9,
                borderLeft: "3px solid #6d28d9",
              }}
            >
              <span style={{ color: "#666" }}># Class 11 Planner</span><br />
              <span style={{ color: "#c0aaff" }}>student</span> = <span style={{ color: "#a07fff" }}>Class11</span>.<span style={{ color: "#86efac" }}>enroll</span>(<span style={{ color: "#fde68a" }}>stream="PCM"</span>)<br />
              <span style={{ color: "#c0aaff" }}>student</span>.ace_boards_and_jee()
            </div>

            {([
              ["Student's Full Name", "text", "Ishaan Mehta"],
              ["Parent's Mobile", "tel", "+91 9876543210"],
              ["Email", "email", "ishaan@email.com"],
            ] as [string, string, string][]).map(([label, type, ph]) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12, fontWeight: 600, color: "#555",
                    display: "block", marginBottom: 5, fontFamily: "sans-serif",
                  }}
                >
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={ph}
                  style={{
                    width: "100%", padding: "11px 14px", borderRadius: 8,
                    border: "1.5px solid #e0e2ea", fontSize: 14,
                    outline: "none", color: "#333",
                    boxSizing: "border-box", fontFamily: "sans-serif",
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  fontSize: 12, fontWeight: 600, color: "#555",
                  display: "block", marginBottom: 5, fontFamily: "sans-serif",
                }}
              >
                Stream
              </label>
              <select
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: "1.5px solid #e0e2ea", fontSize: 14,
                  color: "#333", background: "white", fontFamily: "sans-serif",
                }}
              >
                <option>PCM (Physics, Chemistry, Maths)</option>
                <option>PCB (Physics, Chemistry, Biology)</option>
                <option>PCMB (All four)</option>
                <option>Commerce</option>
                <option>Humanities / Arts</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12, fontWeight: 600, color: "#555",
                  display: "block", marginBottom: 5, fontFamily: "sans-serif",
                }}
              >
                Target Exam
              </label>
              <select
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: "1.5px solid #e0e2ea", fontSize: 14,
                  color: "#333", background: "white", fontFamily: "sans-serif",
                }}
              >
                <option>JEE Mains + Advanced</option>
                <option>NEET</option>
                <option>School / Board Exams Only</option>
                <option>CA Foundation</option>
                <option>Not decided yet</option>
              </select>
            </div>

            <button
              style={{
                width: "100%", background: "#3b0764", color: "white",
                padding: 14, borderRadius: 10, fontSize: 15,
                fontWeight: 700, border: "none", cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              Get Free Class 11 Study Plan →
            </button>
            <p
              style={{
                textAlign: "center", fontSize: 11,
                color: "#bbb", marginTop: 12, fontFamily: "sans-serif",
              }}
            >
              Free · Includes JEE / NEET Roadmap PDF · Expert callback in 2 hrs
            </p>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div style={{ background: "#06000f", padding: "10px 24px", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 1140, margin: "0 auto",
            display: "flex", alignItems: "center", gap: 16,
          }}
        >
          <span
            style={{
              background: "#6d28d9", color: "white", fontSize: 11,
              fontWeight: 700, padding: "3px 10px", borderRadius: 4,
              whiteSpace: "nowrap", fontFamily: "monospace",
            }}
          >
            LIVE
          </span>
          <div style={{ display: "flex", gap: 36, overflow: "hidden" }}>
            {[
              "CBSE Class 11 Annual Exam 2027 — Start strong from Day 1 📚",
              "New PCM batch for Class 11 starting April 10 — Limited seats 🎓",
              "Aarav Mehta — AIR 847 JEE Advanced 2026 — GovPrep Class 11 student 🏆",
              "Free NCERT Solutions Class 11 — All chapters available 📄",
              "JEE Foundation Workshop — Apr 12 — Register Free 🧪",
            ].map((t, i) => (
              <span key={i} style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", whiteSpace: "nowrap" }}>
                <FaBell size={11} style={{ marginRight: 5, verticalAlign: "middle", opacity: 0.6 }} />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* ── STREAM BANNER ─────────────────────────────────────────────── */}
        <section style={{ padding: "40px 0 0" }}>
          <div
            style={{
              background: "white", borderRadius: 20,
              border: "1px solid #e4d9c8", padding: "24px 32px",
            }}
          >
            <p
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 16, fontFamily: "sans-serif",
              }}
            >
              🔬 Choose Your Stream
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
              {[
                { label: "PCM", sub: "Maths + Physics + Chemistry", color: "#1a237e", badge: "JEE", icon: "📐" },
                { label: "PCB", sub: "Physics + Chemistry + Biology", color: "#1b5e20", badge: "NEET", icon: "🧬" },
                { label: "PCMB", sub: "All four science subjects", color: "#4a148c", badge: "JEE + NEET", icon: "⚗️" },
                { label: "Commerce", sub: "Accounts + Economics + BSt", color: "#bf360c", badge: "CA / BBA", icon: "📊" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 14, padding: "16px 18px",
                    background: s.color + "0a",
                    border: `1.5px solid ${s.color}22`,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: s.color, fontFamily: "monospace", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: "#777", fontFamily: "sans-serif", marginBottom: 8, lineHeight: 1.4 }}>{s.sub}</div>
                  <span
                    style={{
                      fontSize: 10, fontWeight: 700, color: s.color,
                      background: s.color + "18", padding: "2px 8px",
                      borderRadius: 20, fontFamily: "monospace",
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXAM DATES ───────────────────────────────────────────────── */}
        <section style={{ padding: "24px 0 0" }}>
          <div
            style={{
              background: "white", borderRadius: 20,
              border: "1px solid #e4d9c8", padding: "24px 32px",
            }}
          >
            <p
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 20, fontFamily: "sans-serif",
              }}
            >
              📅 Important Exam Dates 2026–27
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              {EXAM_DATES.map((d, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: 13, fontWeight: 700, color: "#6d28d9",
                      fontFamily: "monospace", marginBottom: 4,
                    }}
                  >
                    {d.date}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.4, fontFamily: "sans-serif" }}>{d.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUBJECT CARDS ─────────────────────────────────────────────── */}
        <section style={{ padding: "48px 0 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 10, fontFamily: "sans-serif",
              }}
            >
              All Subjects
            </p>
            <h2
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(1.8rem,3vw,2.5rem)", color: "#111",
                marginBottom: 14, letterSpacing: "-0.02em",
              }}
            >
              Class 11 — Subject-wise Courses
            </h2>
            <p
              style={{
                color: "#777", fontSize: 15, maxWidth: 540,
                margin: "0 auto", lineHeight: 1.65, fontFamily: "sans-serif",
              }}
            >
              Every subject broken into chapters with board-pattern videos, NCERT solutions, and JEE/NEET foundation tests.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
            {SUBJECTS.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: 18, overflow: "hidden",
                  border: `2px solid ${activeSubjectCard === s.name ? s.color : "#e4d9c8"}`,
                  transition: "transform 0.2s, border-color 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setActiveSubjectCard(s.name);
                  setActiveSubject(s.name as SubjectTab);
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ padding: "22px 20px 18px", background: s.color }}>
                  {s.tag && (
                    <span
                      style={{
                        background: "rgba(255,255,255,0.18)", color: "white",
                        fontSize: 10, fontWeight: 700, padding: "3px 9px",
                        borderRadius: 20, display: "inline-block",
                        marginBottom: 10, fontFamily: "sans-serif",
                      }}
                    >
                      {s.tag}
                    </span>
                  )}
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: "rgba(255,255,255,0.15)",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", marginBottom: 12,
                    }}
                  >
                    <s.icon size={22} color="white" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Crimson Pro', Georgia, serif",
                      fontSize: 16, fontWeight: 700, color: "white", lineHeight: 1.2,
                    }}
                  >
                    {s.name}
                  </h3>
                </div>

                <div style={{ padding: "16px 20px 20px" }}>
                  <div
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 8, marginBottom: 16,
                    }}
                  >
                    {[
                      [s.chapters, "Chapters"],
                      [s.videos, "Videos"],
                      [s.tests, "Tests"],
                    ].map(([val, lbl], j) => (
                      <div
                        key={j}
                        style={{
                          textAlign: "center", background: "#f9f7f4",
                          borderRadius: 8, padding: "8px 4px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 16, fontWeight: 700,
                            color: s.color, fontFamily: "monospace",
                          }}
                        >
                          {val}
                        </div>
                        <div
                          style={{
                            fontSize: 10, color: "#999",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {lbl}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    style={{
                      width: "100%", color: "white",
                      padding: "9px", borderRadius: 8, fontSize: 12,
                      fontWeight: 700, border: "none", cursor: "pointer",
                      background: s.color, fontFamily: "sans-serif",
                    }}
                  >
                    Explore Chapters →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHAPTER LIST ─────────────────────────────────────────────── */}
        <section style={{ padding: "48px 0" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 10, fontFamily: "sans-serif",
              }}
            >
              Chapter Index
            </p>
            <h2
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111",
              }}
            >
              NCERT Class 11 — Chapter-wise Content
            </h2>
          </div>

          <div
            style={{
              background: "white", borderRadius: 20,
              border: "1px solid #e4d9c8", overflow: "hidden",
            }}
          >
            {/* tabs */}
            <div
              style={{
                display: "flex", borderBottom: "1px solid #e4d9c8",
                overflowX: "auto",
              }}
            >
              {SUBJECT_TABS.map((t) => {
                const subj = SUBJECTS.find((s) => s.name === t)!;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveSubject(t)}
                    style={{
                      flex: 1, padding: "14px 12px",
                      fontSize: 13, fontWeight: 600,
                      cursor: "pointer", border: "none",
                      whiteSpace: "nowrap", minWidth: 120,
                      background: activeSubject === t ? subj.color : "white",
                      color: activeSubject === t ? "white" : "#555",
                      fontFamily: activeSubject === t ? "monospace" : "sans-serif",
                      transition: "all 0.2s",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* chapter rows */}
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr 100px 80px 70px 70px 80px",
                  padding: "10px 24px",
                  background: "#f9f7f4",
                  borderBottom: "1px solid #e4d9c8",
                }}
              >
                {["#", "Chapter", "Subject Tag", "Lessons", "Quiz", "Notes", "Access"].map((h, i) => (
                  <div
                    key={h}
                    style={{
                      fontSize: 10, fontWeight: 700, color: "#aaa",
                      textTransform: "uppercase", letterSpacing: "0.08em",
                      fontFamily: "sans-serif",
                      textAlign: i > 2 ? "center" : "left",
                    }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {activeChapters.map((ch, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 100px 80px 70px 70px 80px",
                    padding: "14px 24px",
                    borderBottom: "1px solid #f5f0e8",
                    alignItems: "center",
                    transition: "background 0.15s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#faf8f5")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <div
                    style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: ch.color, color: "white",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 12,
                      fontWeight: 700, fontFamily: "monospace",
                    }}
                  >
                    {ch.no}
                  </div>
                  <div
                    style={{
                      fontSize: 14, fontWeight: 600,
                      color: "#111", fontFamily: "sans-serif",
                      paddingRight: 16, lineHeight: 1.3,
                    }}
                  >
                    {ch.title}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 10, fontWeight: 700,
                        color: ch.color, background: ch.color + "18",
                        padding: "2px 8px", borderRadius: 4,
                        fontFamily: "monospace",
                      }}
                    >
                      {ch.subject}
                    </span>
                  </div>
                  <div style={{ textAlign: "center", fontSize: 13, fontFamily: "monospace", color: "#555" }}>
                    {ch.lessons} lessons
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {ch.quiz
                      ? <FaCheckCircle size={14} color="#6d28d9" />
                      : <span style={{ fontSize: 12, color: "#ddd" }}>—</span>}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {ch.notes
                      ? <FaCheckCircle size={14} color="#1b5e20" />
                      : <span style={{ fontSize: 12, color: "#ddd" }}>—</span>}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {ch.free ? (
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center",
                          gap: 4, fontSize: 11, fontWeight: 700,
                          color: "#1b5e20", background: "#dcfce7",
                          padding: "3px 8px", borderRadius: 20,
                          fontFamily: "monospace",
                        }}
                      >
                        <FaUnlock size={9} /> Free
                      </span>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex", alignItems: "center",
                          gap: 4, fontSize: 11, fontWeight: 700,
                          color: "#3b0764", background: "#f3e8ff",
                          padding: "3px 8px", borderRadius: 20,
                          fontFamily: "monospace",
                        }}
                      >
                        <FaLock size={9} /> Pro
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* footer */}
            <div
              style={{
                padding: "16px 24px",
                background: "#f9f7f4",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid #e4d9c8",
              }}
            >
              <p style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>
                Showing {activeChapters.length} of {activeSubjectData.chapters} chapters •{" "}
                <span style={{ color: "#1b5e20", fontWeight: 700 }}>
                  {activeChapters.filter((c) => c.free).length} free
                </span>{" "}
                chapters available
              </p>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 8,
                  background: "#3b0764", color: "white",
                  fontSize: 12, fontWeight: 700, border: "none",
                  cursor: "pointer", fontFamily: "monospace",
                }}
              >
                View All Chapters <FaArrowRight size={10} />
              </button>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 10, fontFamily: "sans-serif",
              }}
            >
              What's Included
            </p>
            <h2
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111",
              }}
            >
              Everything You Need to Score 95+ & Crack JEE / NEET
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {FEATURES.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: 18,
                  padding: "28px 24px", border: "1px solid #e4d9c8",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: f.color + "18",
                    display: "flex", alignItems: "center",
                    justifyContent: "center", marginBottom: 16,
                  }}
                >
                  <f.icon size={22} color={f.color} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, serif",
                    fontSize: 17, fontWeight: 700, color: "#111",
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </h4>
                <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.65, fontFamily: "sans-serif" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FREE RESOURCES ────────────────────────────────────────────── */}
        <section style={{ paddingBottom: 48 }}>
          <div
            style={{
              background: "linear-gradient(135deg, #06000f, #0d0a2e)",
              borderRadius: 24, padding: "48px 40px",
              border: "1px solid rgba(130,100,255,0.15)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute", top: -40, right: -40,
                width: 250, height: 250, borderRadius: "50%",
                background: "rgba(109,40,217,0.12)",
              }}
            />
            <div
              style={{
                position: "absolute", bottom: 24, right: 40,
                color: "rgba(130,100,255,0.05)",
                fontFamily: "monospace", fontSize: 11,
                lineHeight: 2, pointerEvents: "none",
              }}
            >
              <div>f(x) = sin(x) · cos(x) — Trig Identities</div>
              <div>F = ma — Newton's Second Law</div>
              <div>ΔH = ΣE(bonds broken) − ΣE(bonds formed)</div>
            </div>

            <div
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: 48, alignItems: "center", position: "relative",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                    color: "#a07fff", textTransform: "uppercase",
                    marginBottom: 10, fontFamily: "sans-serif",
                  }}
                >
                  100% Free Resources
                </p>
                <h2
                  style={{
                    fontFamily: "'Crimson Pro', Georgia, serif",
                    fontSize: "clamp(1.6rem,2.5vw,2rem)",
                    color: "white", marginBottom: 14,
                  }}
                >
                  Free Study Material for Class 11
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)", fontSize: 15,
                    lineHeight: 1.75, fontFamily: "sans-serif",
                  }}
                >
                  Download NCERT Solutions, school exam papers and JEE/NEET foundation notes — no login required. Includes revision notes with marking scheme.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {RESOURCES.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.06)", borderRadius: 16,
                      padding: "18px 16px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", flexDirection: "column", gap: 10,
                      cursor: "pointer", transition: "transform 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                  >
                    <div
                      style={{
                        width: 42, height: 42, borderRadius: 10,
                        display: "flex", alignItems: "center",
                        justifyContent: "center", background: r.color + "30",
                      }}
                    >
                      <r.icon size={18} color={r.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 3 }}>{r.label}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif" }}>{r.desc}</div>
                    </div>
                    <div
                      style={{
                        display: "flex", alignItems: "center",
                        gap: 4, fontSize: 12, fontWeight: 600,
                        color: r.color, marginTop: 2,
                      }}
                    >
                      <FaDownload size={10} /> Free Download
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TOPPERS ───────────────────────────────────────────────────── */}
        <section style={{ paddingBottom: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 10, fontFamily: "sans-serif",
              }}
            >
              Student Success Stories
            </p>
            <h2
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111",
              }}
            >
              Class 11 Toppers from GovPrep
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TOPPERS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "white", borderRadius: 18,
                  padding: 28, border: "1px solid #e4d9c8",
                }}
              >
                <div
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 38, color: "#6d28d9",
                      lineHeight: 1,
                      fontFamily: "'Crimson Pro', serif",
                    }}
                  >
                    &ldquo;
                  </div>
                  <span
                    style={{
                      background: "#f3e8ff", color: "#6d28d9",
                      fontSize: 11, fontWeight: 700, padding: "4px 10px",
                      borderRadius: 20, fontFamily: "monospace",
                    }}
                  >
                    {t.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14, color: "#555", lineHeight: 1.75,
                    marginBottom: 20, fontFamily: "sans-serif",
                  }}
                >
                  {t.quote}
                </p>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingTop: 16, borderTop: "1px solid #f5f0e8",
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: "50%",
                      background: "#3b0764", color: "white",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontWeight: 700,
                      fontSize: 16, fontFamily: "serif",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700, fontSize: 14, color: "#111",
                        fontFamily: "'Crimson Pro', serif",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", fontFamily: "sans-serif" }}>
                      {t.school}
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto", background: "#f3e8ff", color: "#3b0764",
                      fontSize: 12, fontWeight: 700, padding: "4px 10px",
                      borderRadius: 20, fontFamily: "monospace",
                    }}
                  >
                    {t.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQs ─────────────────────────────────────────────────────── */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p
              style={{
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                color: "#6d28d9", textTransform: "uppercase",
                marginBottom: 10, fontFamily: "sans-serif",
              }}
            >
              Got Questions?
            </p>
            <h2
              style={{
                fontFamily: "'Crimson Pro', Georgia, serif",
                fontSize: "clamp(1.8rem,3vw,2.4rem)", color: "#111",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {FAQS.map((f, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  background: "white", borderRadius: 14, marginBottom: 10,
                  border: "1px solid #e4d9c8", overflow: "hidden", cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between", padding: "16px 24px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14, fontWeight: 600, color: "#111",
                      paddingRight: 20, fontFamily: "sans-serif",
                    }}
                  >
                    {f.q}
                  </span>
                  <FaChevronDown
                    size={16}
                    color="#888"
                    style={{
                      flexShrink: 0,
                      transform: openFaq === i ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  />
                </div>
                {openFaq === i && (
                  <div
                    style={{
                      padding: "16px 24px 20px", fontSize: 14,
                      color: "#666", lineHeight: 1.75,
                      borderTop: "1px solid #f5f0e8", fontFamily: "sans-serif",
                    }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FOOTER CTA ───────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #06000f, #0d0a2e)",
          padding: "80px 24px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(130,100,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(130,100,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 32, left: 48,
            color: "rgba(130,100,255,0.06)", fontFamily: "monospace",
            fontSize: 12, lineHeight: 2, pointerEvents: "none", textAlign: "left",
          }}
        >
          <div>while exam_score &lt; 95:</div>
          <div>&nbsp;&nbsp;watch_lecture()</div>
          <div>&nbsp;&nbsp;attempt_mock_test()</div>
          <div>&nbsp;&nbsp;solve_jee_problems()</div>
          <div>&nbsp;&nbsp;clear_doubts()</div>
        </div>

        <div style={{ position: "relative", padding: "16px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚀</div>
          <h2
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: "clamp(1.8rem,3vw,2.5rem)",
              color: "white", marginBottom: 12,
            }}
          >
            Your Class 11 & JEE / NEET Journey Starts{" "}
            <em style={{ color: "#a07fff" }}>Today</em>
          </h2>
          <p
            style={{
              fontSize: 15, color: "rgba(255,255,255,0.55)",
              marginBottom: 32, fontFamily: "sans-serif",
            }}
          >
            Join 1,50,000+ Class 11 students building their foundation for top scores and competitive exams with GovPrep India.
          </p>
          <div
            style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: 16,
            }}
          >
            <button
              style={{
                background: "#6d28d9", color: "white",
                padding: "12px 32px", borderRadius: 10,
                fontSize: 15, fontWeight: 700, border: "none",
                cursor: "pointer", fontFamily: "'Crimson Pro', serif",
              }}
            >
              Start Free Trial
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.07)", color: "white",
                padding: "12px 32px", borderRadius: 10, fontSize: 15,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer",
              }}
            >
              Download Free Class 11 Study Plan PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}