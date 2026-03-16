"use client"
import { useState } from "react";
import {
  FaChevronDown, FaStar, FaCheckCircle, FaBell,
  FaArrowRight, FaBook, FaFlask, FaCalculator,
  FaGlobe, FaAtom, FaLeaf, FaLandmark, FaPlay,
  FaDownload, FaFileAlt, FaClipboardList, FaTrophy,
  FaUserGraduate, FaChartBar, FaLock, FaUnlock,
  FaPencilAlt, FaVideo, FaHeadphones
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

type SubjectTab = "Mathematics" | "Science" | "Social Science" | "English" | "Hindi";

// ─── Data ────────────────────────────────────────────────────────────────────

const SUBJECTS: Subject[] = [
  {
    name: "Mathematics",
    icon: FaCalculator,
    color: "#1a237e",
    chapters: 15,
    videos: 145,
    tests: 55,
    topics: ["Real Numbers", "Polynomials", "Quadratic Equations", "Arithmetic Progressions", "Triangles", "Probability"],
    tag: "Board Important",
  },
  {
    name: "Science",
    icon: FaFlask,
    color: "#880e4f",
    chapters: 16,
    videos: 160,
    tests: 60,
    topics: ["Chemical Reactions", "Acids, Bases & Salts", "Light — Reflection", "Electricity", "Life Processes", "Heredity"],
    tag: "Most Marks",
  },
  {
    name: "Social Science",
    icon: FaGlobe,
    color: "#1b5e20",
    chapters: 22,
    videos: 120,
    tests: 48,
    topics: ["Nationalism in India", "Resources & Dev.", "Power Sharing", "Development", "Manufacturing Industries", "Democracy"],
  },
  {
    name: "English",
    icon: FaBook,
    color: "#bf360c",
    chapters: 12,
    videos: 96,
    tests: 40,
    topics: ["First Flight Prose", "Footprints Stories", "Grammar", "Writing Skills", "Literature Analysis", "Unseen Passages"],
  },
  {
    name: "Hindi",
    icon: FaPencilAlt,
    color: "#006064",
    chapters: 18,
    videos: 105,
    tests: 42,
    topics: ["Kshitij-2", "Kritika-2", "Sparsh-2", "Sanchayan-2", "Vyakaran", "Lekhan"],
  },
];

const SUBJECT_TABS: SubjectTab[] = ["Mathematics", "Science", "Social Science", "English", "Hindi"];

const CHAPTERS: Record<SubjectTab, ChapterRow[]> = {
  "Mathematics": [
    { no: 1, title: "Real Numbers", subject: "Maths", color: "#1a237e", lessons: 7, quiz: true, notes: true, free: true },
    { no: 2, title: "Polynomials", subject: "Maths", color: "#1a237e", lessons: 6, quiz: true, notes: true, free: true },
    { no: 3, title: "Pair of Linear Equations in Two Variables", subject: "Maths", color: "#1a237e", lessons: 9, quiz: true, notes: true, free: false },
    { no: 4, title: "Quadratic Equations", subject: "Maths", color: "#1a237e", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Arithmetic Progressions", subject: "Maths", color: "#1a237e", lessons: 7, quiz: true, notes: true, free: false },
    { no: 6, title: "Triangles", subject: "Maths", color: "#1a237e", lessons: 9, quiz: true, notes: true, free: false },
    { no: 7, title: "Coordinate Geometry", subject: "Maths", color: "#1a237e", lessons: 6, quiz: true, notes: true, free: false },
    { no: 8, title: "Introduction to Trigonometry", subject: "Maths", color: "#1a237e", lessons: 8, quiz: true, notes: true, free: false },
  ],
  "Science": [
    { no: 1, title: "Chemical Reactions and Equations", subject: "Chemistry", color: "#880e4f", lessons: 8, quiz: true, notes: true, free: true },
    { no: 2, title: "Acids, Bases and Salts", subject: "Chemistry", color: "#880e4f", lessons: 9, quiz: true, notes: true, free: true },
    { no: 3, title: "Metals and Non-metals", subject: "Chemistry", color: "#880e4f", lessons: 8, quiz: true, notes: true, free: false },
    { no: 4, title: "Carbon and Its Compounds", subject: "Chemistry", color: "#880e4f", lessons: 9, quiz: true, notes: true, free: false },
    { no: 5, title: "Life Processes", subject: "Biology", color: "#880e4f", lessons: 10, quiz: true, notes: true, free: false },
    { no: 6, title: "Control and Coordination", subject: "Biology", color: "#880e4f", lessons: 8, quiz: true, notes: true, free: false },
    { no: 7, title: "Light — Reflection and Refraction", subject: "Physics", color: "#880e4f", lessons: 10, quiz: true, notes: true, free: false },
    { no: 8, title: "Electricity", subject: "Physics", color: "#880e4f", lessons: 9, quiz: true, notes: true, free: false },
  ],
  "Social Science": [
    { no: 1, title: "The Rise of Nationalism in Europe", subject: "History", color: "#1b5e20", lessons: 6, quiz: true, notes: true, free: true },
    { no: 2, title: "Nationalism in India", subject: "History", color: "#1b5e20", lessons: 8, quiz: true, notes: true, free: false },
    { no: 3, title: "Resources and Development", subject: "Geography", color: "#1b5e20", lessons: 6, quiz: true, notes: true, free: true },
    { no: 4, title: "Water Resources", subject: "Geography", color: "#1b5e20", lessons: 5, quiz: true, notes: true, free: false },
    { no: 5, title: "Power Sharing", subject: "Civics", color: "#1b5e20", lessons: 5, quiz: true, notes: true, free: false },
    { no: 6, title: "Development", subject: "Economics", color: "#1b5e20", lessons: 6, quiz: true, notes: true, free: false },
    { no: 7, title: "The Age of Industrialisation", subject: "History", color: "#1b5e20", lessons: 7, quiz: true, notes: true, free: false },
    { no: 8, title: "Agriculture", subject: "Geography", color: "#1b5e20", lessons: 6, quiz: true, notes: true, free: false },
  ],
  "English": [
    { no: 1, title: "A Letter to God (First Flight)", subject: "Literature", color: "#bf360c", lessons: 4, quiz: true, notes: true, free: true },
    { no: 2, title: "Nelson Mandela — Long Walk (First Flight)", subject: "Literature", color: "#bf360c", lessons: 4, quiz: true, notes: true, free: true },
    { no: 3, title: "A Triumph of Surgery (Footprints)", subject: "Literature", color: "#bf360c", lessons: 3, quiz: true, notes: true, free: false },
    { no: 4, title: "Grammar — Reported Speech & Clauses", subject: "Grammar", color: "#bf360c", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Writing — Formal Letter & Article", subject: "Writing", color: "#bf360c", lessons: 6, quiz: true, notes: true, free: false },
    { no: 6, title: "Unseen Passage & Comprehension", subject: "Reading", color: "#bf360c", lessons: 6, quiz: true, notes: true, free: false },
  ],
  "Hindi": [
    { no: 1, title: "सूरदास के पद (Kshitij-2)", subject: "Literature", color: "#006064", lessons: 4, quiz: true, notes: true, free: true },
    { no: 2, title: "राम-लक्ष्मण-परशुराम संवाद (Kshitij-2)", subject: "Literature", color: "#006064", lessons: 5, quiz: true, notes: true, free: true },
    { no: 3, title: "माता का आँचल (Kritika-2)", subject: "Prose", color: "#006064", lessons: 3, quiz: true, notes: true, free: false },
    { no: 4, title: "व्याकरण — रचना व अर्थ के आधार पर वाक्य", subject: "Grammar", color: "#006064", lessons: 7, quiz: true, notes: true, free: false },
    { no: 5, title: "लेखन — निबंध, पत्र, विज्ञापन", subject: "Writing", color: "#006064", lessons: 6, quiz: true, notes: true, free: false },
    { no: 6, title: "तताँरा-वामीरो कथा (Sparsh-2)", subject: "Literature", color: "#006064", lessons: 4, quiz: true, notes: true, free: false },
  ],
};

const TOPPERS: Topper[] = [
  {
    name: "Kavya Nair",
    school: "Kendriya Vidyalaya, Kochi",
    score: "99/100",
    tag: "Maths Topper",
    quote: "The Trigonometry and Quadratic Equations videos were phenomenal. The step-by-step approach for board-style answers made all the difference. I scored full marks in Section C — something I never thought possible.",
  },
  {
    name: "Rohan Verma",
    school: "DPS, Noida",
    score: "97/100",
    tag: "Science Star",
    quote: "The chapter on Electricity and Light (Reflection/Refraction) had the best diagram walkthroughs I've seen anywhere. The mock board tests exactly matched the real paper pattern. I walked into the exam with full confidence.",
  },
  {
    name: "Tanisha Reddy",
    school: "St. Ann's High School, Hyderabad",
    score: "98/100",
    tag: "SST Ace",
    quote: "Nationalism in India and Development were my weak chapters. The structured notes with timelines, maps and flowcharts transformed how I approached SST. The previous year paper analysis was incredibly accurate.",
  },
];

const RESOURCES: Resource[] = [
  { icon: FaFileAlt, label: "NCERT Solutions Class 10", desc: "All subjects, all chapters", color: "#1a237e" },
  { icon: FaClipboardList, label: "Board Sample Papers 2025–26", desc: "Latest CBSE pattern, with answers", color: "#880e4f" },
  { icon: FaChartBar, label: "Previous Year Papers", desc: "2018–2025 Board papers + solutions", color: "#1b5e20" },
  { icon: FaBook, label: "Revision Notes PDF", desc: "Chapter-wise quick revision notes", color: "#bf360c" },
];

const FEATURES: Feature[] = [
  { icon: FaVideo, title: "HD Video Lectures", desc: "2,400+ concept videos by expert teachers covering all NCERT chapters for board exam", color: "#1a237e" },
  { icon: FaClipboardList, title: "Chapter-wise Tests", desc: "250+ practice tests with instant evaluation, performance analytics and weak-area identification", color: "#880e4f" },
  { icon: FaFileAlt, title: "NCERT Solutions", desc: "Board-style step-by-step solutions to every exercise, including value-based questions", color: "#1b5e20" },
  { icon: FaHeadphones, title: "Doubt Solving", desc: "Ask doubts anytime — subject experts respond within 2 hours, live sessions before boards", color: "#bf360c" },
  { icon: FaChartBar, title: "Progress Tracker", desc: "Visual dashboards tracking chapter completion, test scores, and board readiness index", color: "#006064" },
  { icon: FaTrophy, title: "Mock Board Series", desc: "Full-syllabus mocks modeled exactly on CBSE Class 10 Board Exam pattern — with OMR practice", color: "#4a148c" },
];

const FAQS: Faq[] = [
  {
    q: "Is this course aligned with the latest CBSE Class 10 Board Exam syllabus?",
    a: "Yes, all content is fully aligned with the CBSE Class 10 curriculum for 2025–26 Board exams. We cover the reduced/rationalized syllabus as per the latest NCERT updates. Any changes by the Board are reflected within 48 hours. The course covers Mathematics, Science, Social Science, English and Hindi.",
  },
  {
    q: "How are the mock board tests structured?",
    a: "Our mock board tests follow the exact CBSE Class 10 Board paper pattern — 1-mark, 2-mark, 3-mark and 5-mark questions, internal choices, and case-based MCQs. Each mock includes detailed solution PDFs with CBSE marking scheme. You can also practice with OMR sheets to simulate the real exam environment.",
  },
  {
    q: "Does the course include case-based and competency-based questions?",
    a: "Yes. CBSE has significantly increased the weight of case-based, source-based and competency questions since 2023. Our question banks and chapter tests are specifically designed to build this skill. For Science and Social Science especially, we have dedicated modules for graph-reading, map-based and data-interpretation questions.",
  },
  {
    q: "How are doubt-solving sessions structured?",
    a: "Students can submit text or photo doubts through the app. Subject experts respond within 2 hours on weekdays and within 4 hours on weekends. We also conduct weekly live doubt-clearing sessions for high-priority chapters before board exams, with special crash sessions in February–March.",
  },
  {
    q: "Are previous year board papers included?",
    a: "Yes. The course includes official CBSE Board papers from 2018 to 2025 across all regions — Delhi, Outside Delhi, Compartment — all with detailed solutions and marking scheme explanations. We also include subject-wise analysis of most-repeated topics so you can prioritize your preparation smartly.",
  },
];

const EXAM_DATES: ExamDate[] = [
  { event: "Unit Test 1", date: "Apr 15, 2026" },
  { event: "Mid-Term Exam", date: "Sep 18, 2026" },
  { event: "Pre-Board 1", date: "Dec 10, 2026" },
  { event: "Pre-Board 2", date: "Jan 20, 2027" },
  { event: "CBSE Board Exam", date: "Feb–Mar 2027" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Class10Page() {
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
          background: "linear-gradient(160deg, #0a0a1a 0%, #12103a 50%, #080818 100%)",
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
              "radial-gradient(circle at 70% 20%, rgba(100,120,255,0.12) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(255,80,100,0.08) 0%, transparent 45%)",
            pointerEvents: "none",
          }}
        />
        {/* dot grid */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(100,120,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(100,120,255,0.04) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            pointerEvents: "none",
          }}
        />
        {/* NCERT watermark */}
        <div
          style={{
            position: "absolute", top: 52, right: 440,
            color: "rgba(120,140,255,0.07)",
            fontFamily: "'Crimson Pro', Georgia, serif",
            fontSize: 12, lineHeight: 2, pointerEvents: "none",
          }}
        >
          <div>Ch 1 — Real Numbers | Polynomials — Ch 2</div>
          <div>Science: Chemical Reactions · Acids · Electricity · Life Processes</div>
          <div>SST: Nationalism in India · Power Sharing · Development</div>
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
                background: "rgba(100,120,255,0.12)",
                border: "1px solid rgba(100,120,255,0.4)",
                borderRadius: 20, padding: "5px 14px", marginBottom: 22,
              }}
            >
              <span
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#7b8fff", display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12, color: "#a0aaff",
                  fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em",
                }}
              >
                CBSE Class 10 Board Exam — Session 2025–26
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
              Class 10 Board Prep —<br />
              <span style={{ color: "#7b8fff" }}>Score 95+ in CBSE Boards</span>
            </h1>

            <p
              style={{
                fontSize: 16, color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75, marginBottom: 32, maxWidth: 500,
              }}
            >
              Maths · Science · Social Science · English · Hindi — complete board
              preparation with{" "}
              <span
                style={{
                  background: "rgba(100,120,255,0.15)", color: "#a0aaff",
                  padding: "2px 8px", borderRadius: 4,
                  fontFamily: "monospace", fontSize: 14,
                }}
              >
                HD videos
              </span>
              ,{" "}
              <span
                style={{
                  background: "rgba(100,120,255,0.15)", color: "#a0aaff",
                  padding: "2px 8px", borderRadius: 4,
                  fontFamily: "monospace", fontSize: 14,
                }}
              >
                mock boards
              </span>
              , and NCERT solutions. Trusted by{" "}
              <strong style={{ color: "white" }}>1,80,000+ Class 10 students</strong> across India.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                style={{
                  background: "#4f5bd5", color: "white",
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
                ["2,400+", "Video Lectures"],
                ["73", "Chapters Covered"],
                ["250+", "Practice Tests"],
                ["4.9★", "Student Rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#7b8fff", fontFamily: "monospace" }}>{v}</div>
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
                background: "#0a0a1a", borderRadius: 8, padding: "12px 16px",
                marginBottom: 20, fontFamily: "monospace", fontSize: 12,
                color: "#a0aaff", lineHeight: 1.9,
                borderLeft: "3px solid #4f5bd5",
              }}
            >
              <span style={{ color: "#666" }}># Class 10 Board Planner</span><br />
              <span style={{ color: "#a0aaff" }}>student</span> = <span style={{ color: "#7b8fff" }}>Class10</span>.<span style={{ color: "#86efac" }}>enroll</span>(<span style={{ color: "#fde68a" }}>board="CBSE"</span>)<br />
              <span style={{ color: "#a0aaff" }}>student</span>.ace_boards()
            </div>

            {([
              ["Student's Full Name", "text", "Aryan Kapoor"],
              ["Parent's Mobile", "tel", "+91 9876543210"],
              ["Email", "email", "aryan@email.com"],
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
                Board
              </label>
              <select
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: "1.5px solid #e0e2ea", fontSize: 14,
                  color: "#333", background: "white", fontFamily: "sans-serif",
                }}
              >
                <option>CBSE</option>
                <option>ICSE</option>
                <option>State Board</option>
              </select>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12, fontWeight: 600, color: "#555",
                  display: "block", marginBottom: 5, fontFamily: "sans-serif",
                }}
              >
                Weakest Subject
              </label>
              <select
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 8,
                  border: "1.5px solid #e0e2ea", fontSize: 14,
                  color: "#333", background: "white", fontFamily: "sans-serif",
                }}
              >
                <option>Mathematics</option>
                <option>Science</option>
                <option>Social Science</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>

            <button
              style={{
                width: "100%", background: "#1a237e", color: "white",
                padding: 14, borderRadius: 10, fontSize: 15,
                fontWeight: 700, border: "none", cursor: "pointer",
                fontFamily: "monospace",
              }}
            >
              Get Free Board Study Plan →
            </button>
            <p
              style={{
                textAlign: "center", fontSize: 11,
                color: "#bbb", marginTop: 12, fontFamily: "sans-serif",
              }}
            >
              Free · Includes Board Pattern Notes PDF · Expert callback in 2 hrs
            </p>
          </div>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────────────────────── */}
      <div style={{ background: "#0a0a1a", padding: "10px 24px", overflow: "hidden" }}>
        <div
          style={{
            maxWidth: 1140, margin: "0 auto",
            display: "flex", alignItems: "center", gap: 16,
          }}
        >
          <span
            style={{
              background: "#4f5bd5", color: "white", fontSize: 11,
              fontWeight: 700, padding: "3px 10px", borderRadius: 4,
              whiteSpace: "nowrap", fontFamily: "monospace",
            }}
          >
            LIVE
          </span>
          <div style={{ display: "flex", gap: 36, overflow: "hidden" }}>
            {[
              "CBSE Class 10 Board Exam 2027 — Start your preparation today 📚",
              "New batch for Class 10 Maths starting April 8 — Limited seats 🎓",
              "Rohan Mehta — 100/100 in Maths, Delhi Board 2025 — GovPrep student 🏆",
              "Free NCERT Solutions Class 10 — All chapters uploaded 📄",
              "Scholarship test for Class 10 — Apr 5 — Win up to 100% fee waiver 🏅",
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

        {/* ── EXAM DATES ───────────────────────────────────────────────── */}
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
                color: "#1a237e", textTransform: "uppercase",
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
                      fontSize: 13, fontWeight: 700, color: "#4f5bd5",
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
                color: "#4f5bd5", textTransform: "uppercase",
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
              Class 10 — Subject-wise Board Courses
            </h2>
            <p
              style={{
                color: "#777", fontSize: 15, maxWidth: 520,
                margin: "0 auto", lineHeight: 1.65, fontFamily: "sans-serif",
              }}
            >
              Every subject broken into chapters, with board-pattern videos, notes, and tests — all NCERT-aligned.
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
                color: "#4f5bd5", textTransform: "uppercase",
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
              NCERT Class 10 — Chapter-wise Board Content
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
                      ? <FaCheckCircle size={14} color="#4f5bd5" />
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
                          color: "#1a237e", background: "#eff6ff",
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
                  background: "#1a237e", color: "white",
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
                color: "#4f5bd5", textTransform: "uppercase",
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
              Everything You Need to Score 95+ in Boards
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
              background: "linear-gradient(135deg, #0a0a1a, #12103a)",
              borderRadius: 24, padding: "48px 40px",
              border: "1px solid rgba(100,120,255,0.15)",
              position: "relative", overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute", top: -40, right: -40,
                width: 250, height: 250, borderRadius: "50%",
                background: "rgba(79,91,213,0.12)",
              }}
            />
            <div
              style={{
                position: "absolute", bottom: 24, right: 40,
                color: "rgba(100,120,255,0.05)",
                fontFamily: "monospace", fontSize: 11,
                lineHeight: 2, pointerEvents: "none",
              }}
            >
              <div>Trigonometry — sin²θ + cos²θ = 1</div>
              <div>Arithmetic Progressions — nth term, Sum</div>
              <div>Probability — Favourable / Total Outcomes</div>
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
                    color: "#7b8fff", textTransform: "uppercase",
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
                  Free Study Material for Class 10 Boards
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.6)", fontSize: 15,
                    lineHeight: 1.75, fontFamily: "sans-serif",
                  }}
                >
                  Download NCERT Solutions, board sample papers and revision notes — no login required. Includes previous year papers with CBSE marking schemes.
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
                color: "#4f5bd5", textTransform: "uppercase",
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
              Class 10 Board Toppers from GovPrep
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
                      fontSize: 38, color: "#4f5bd5",
                      lineHeight: 1,
                      fontFamily: "'Crimson Pro', serif",
                    }}
                  >
                    &ldquo;
                  </div>
                  <span
                    style={{
                      background: "#eef2ff", color: "#3730a3",
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
                      background: "#1a237e", color: "white",
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
                      marginLeft: "auto", background: "#eef2ff", color: "#1a237e",
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
                color: "#4f5bd5", textTransform: "uppercase",
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
          background: "linear-gradient(135deg, #0a0a1a, #12103a)",
          padding: "80px 24px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(100,120,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(100,120,255,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: 32, left: 48,
            color: "rgba(100,120,255,0.06)", fontFamily: "monospace",
            fontSize: 12, lineHeight: 2, pointerEvents: "none", textAlign: "left",
          }}
        >
          <div>while board_score &lt; 95:</div>
          <div>&nbsp;&nbsp;watch_lecture()</div>
          <div>&nbsp;&nbsp;attempt_mock_board()</div>
          <div>&nbsp;&nbsp;clear_doubts()</div>
        </div>

        <div style={{ position: "relative", padding: "16px 0" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎓</div>
          <h2
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: "clamp(1.8rem,3vw,2.5rem)",
              color: "white", marginBottom: 12,
            }}
          >
            Your Class 10 Board Success Story Starts{" "}
            <em style={{ color: "#7b8fff" }}>Today</em>
          </h2>
          <p
            style={{
              fontSize: 15, color: "rgba(255,255,255,0.55)",
              marginBottom: 32, fontFamily: "sans-serif",
            }}
          >
            Join 1,80,000+ Class 10 students who are acing their board exams with GovPrep India.
          </p>
          <div
            style={{
              display: "flex", flexWrap: "wrap",
              justifyContent: "center", gap: 16,
            }}
          >
            <button
              style={{
                background: "#4f5bd5", color: "white",
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
              Download Free Board Study Plan PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}