"use client"
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Subject {
  name: string;
  icon: string;
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
  icon: string;
  label: string;
  desc: string;
  color: string;
}

interface Feature {
  icon: string;
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
  { name: "Mathematics", icon: "🧮", color: "#0f3460", chapters: 15, videos: 120, tests: 45, topics: ["Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations", "Triangles", "Statistics"], tag: "High Scoring" },
  { name: "Science", icon: "⚗️", color: "#7b1a1a", chapters: 15, videos: 140, tests: 50, topics: ["Matter in Our Surroundings", "Atoms & Molecules", "Motion", "Force & Laws", "Tissues", "Cell"], tag: "Most Asked" },
  { name: "Social Science", icon: "🌍", color: "#14532d", chapters: 21, videos: 110, tests: 42, topics: ["French Revolution", "India Size & Location", "Democracy", "Poverty", "Forest & Wildlife", "Electoral Politics"] },
  { name: "English", icon: "📖", color: "#78350f", chapters: 11, videos: 88, tests: 35, topics: ["Beehive Prose", "Moments Stories", "Grammar", "Writing Skills", "Literature", "Unseen Passages"] },
  { name: "Hindi", icon: "✏️", color: "#1e3a5f", chapters: 17, videos: 95, tests: 38, topics: ["Kshitij", "Kritika", "Sparsh", "Sanchayan", "Vyakaran", "Lekhan"] },
];

const SUBJECT_TABS: SubjectTab[] = ["Mathematics", "Science", "Social Science", "English", "Hindi"];

const CHAPTERS: Record<SubjectTab, ChapterRow[]> = {
  Mathematics: [
    { no: 1, title: "Number Systems", subject: "Maths", color: "#0f3460", lessons: 8, quiz: true, notes: true, free: true },
    { no: 2, title: "Polynomials", subject: "Maths", color: "#0f3460", lessons: 7, quiz: true, notes: true, free: true },
    { no: 3, title: "Coordinate Geometry", subject: "Maths", color: "#0f3460", lessons: 5, quiz: true, notes: true, free: false },
    { no: 4, title: "Linear Equations in Two Variables", subject: "Maths", color: "#0f3460", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Introduction to Euclid's Geometry", subject: "Maths", color: "#0f3460", lessons: 4, quiz: true, notes: true, free: false },
    { no: 6, title: "Lines and Angles", subject: "Maths", color: "#0f3460", lessons: 6, quiz: true, notes: true, free: false },
    { no: 7, title: "Triangles", subject: "Maths", color: "#0f3460", lessons: 9, quiz: true, notes: true, free: false },
    { no: 8, title: "Quadrilaterals", subject: "Maths", color: "#0f3460", lessons: 7, quiz: true, notes: true, free: false },
  ],
  Science: [
    { no: 1, title: "Matter in Our Surroundings", subject: "Science", color: "#7b1a1a", lessons: 7, quiz: true, notes: true, free: true },
    { no: 2, title: "Is Matter Around Us Pure?", subject: "Science", color: "#7b1a1a", lessons: 8, quiz: true, notes: true, free: true },
    { no: 3, title: "Atoms and Molecules", subject: "Science", color: "#7b1a1a", lessons: 9, quiz: true, notes: true, free: false },
    { no: 4, title: "Structure of the Atom", subject: "Science", color: "#7b1a1a", lessons: 7, quiz: true, notes: true, free: false },
    { no: 5, title: "The Fundamental Unit of Life", subject: "Science", color: "#7b1a1a", lessons: 6, quiz: true, notes: true, free: false },
    { no: 6, title: "Tissues", subject: "Science", color: "#7b1a1a", lessons: 8, quiz: true, notes: true, free: false },
    { no: 7, title: "Motion", subject: "Science", color: "#7b1a1a", lessons: 10, quiz: true, notes: true, free: false },
    { no: 8, title: "Force and Laws of Motion", subject: "Science", color: "#7b1a1a", lessons: 8, quiz: true, notes: true, free: false },
  ],
  "Social Science": [
    { no: 1, title: "The French Revolution", subject: "History", color: "#14532d", lessons: 6, quiz: true, notes: true, free: true },
    { no: 2, title: "Socialism in Europe & Russian Revolution", subject: "History", color: "#14532d", lessons: 7, quiz: true, notes: true, free: false },
    { no: 3, title: "India — Size and Location", subject: "Geography", color: "#14532d", lessons: 5, quiz: true, notes: true, free: true },
    { no: 4, title: "Physical Features of India", subject: "Geography", color: "#14532d", lessons: 6, quiz: true, notes: true, free: false },
    { no: 5, title: "What is Democracy? Why Democracy?", subject: "Civics", color: "#14532d", lessons: 5, quiz: true, notes: true, free: false },
    { no: 6, title: "The Story of Village Palampur", subject: "Economics", color: "#14532d", lessons: 5, quiz: true, notes: true, free: false },
    { no: 7, title: "Forest Society and Colonialism", subject: "History", color: "#14532d", lessons: 6, quiz: true, notes: true, free: false },
    { no: 8, title: "Drainage", subject: "Geography", color: "#14532d", lessons: 7, quiz: true, notes: true, free: false },
  ],
  English: [
    { no: 1, title: "The Fun They Had (Beehive)", subject: "Literature", color: "#78350f", lessons: 4, quiz: true, notes: true, free: true },
    { no: 2, title: "The Sound of Music (Beehive)", subject: "Literature", color: "#78350f", lessons: 4, quiz: true, notes: true, free: true },
    { no: 3, title: "The Lost Child (Moments)", subject: "Literature", color: "#78350f", lessons: 3, quiz: true, notes: true, free: false },
    { no: 4, title: "Grammar — Tenses & Voice", subject: "Grammar", color: "#78350f", lessons: 8, quiz: true, notes: true, free: false },
    { no: 5, title: "Writing — Letter & Notice", subject: "Writing", color: "#78350f", lessons: 5, quiz: true, notes: true, free: false },
    { no: 6, title: "Unseen Passage Practice", subject: "Reading", color: "#78350f", lessons: 6, quiz: true, notes: true, free: false },
  ],
  Hindi: [
    { no: 1, title: "दो बैलों की कथा (Kshitij)", subject: "Literature", color: "#1e3a5f", lessons: 4, quiz: true, notes: true, free: true },
    { no: 2, title: "ल्हासा की ओर (Kshitij)", subject: "Literature", color: "#1e3a5f", lessons: 4, quiz: true, notes: true, free: true },
    { no: 3, title: "उपवन (Sparsh)", subject: "Poetry", color: "#1e3a5f", lessons: 3, quiz: true, notes: true, free: false },
    { no: 4, title: "व्याकरण — संज्ञा, सर्वनाम", subject: "Grammar", color: "#1e3a5f", lessons: 7, quiz: true, notes: true, free: false },
    { no: 5, title: "लेखन — अनुच्छेद व पत्र", subject: "Writing", color: "#1e3a5f", lessons: 5, quiz: true, notes: true, free: false },
    { no: 6, title: "माटी वाली (Kritika)", subject: "Literature", color: "#1e3a5f", lessons: 4, quiz: true, notes: true, free: false },
  ],
};

const TOPPERS: Topper[] = [
  { name: "Priya Sharma", school: "DAV Public School, Delhi", score: "98/100", tag: "Maths Topper", quote: "The chapter-wise video explanations for Triangles and Circles were incredibly clear. I used to fear Geometry but now it's my strongest chapter. Got full marks in the unit test!" },
  { name: "Arjun Mehta", school: "Kendriya Vidyalaya, Pune", score: "96/100", tag: "Science Star", quote: "The animated diagrams for Atoms & Molecules and Motion chapters made everything click. The practice tests after every chapter helped me identify weak spots before the exam." },
  { name: "Simran Kaur", school: "DPS, Chandigarh", score: "97/100", tag: "SST Ace", quote: "Social Science felt overwhelming with History, Geography, Civics and Economics together. The structured notes and timeline diagrams for the French Revolution chapter were a game changer." },
];

const RESOURCES: Resource[] = [
  { icon: "📄", label: "NCERT Solutions Class 9", desc: "All subjects, all chapters", color: "#0f3460" },
  { icon: "📋", label: "Sample Papers 2025–26", desc: "Board pattern, with answers", color: "#7b1a1a" },
  { icon: "📊", label: "Previous Year Papers", desc: "2018–2025 with solutions", color: "#14532d" },
  { icon: "📚", label: "Revision Notes PDF", desc: "Chapter-wise quick notes", color: "#78350f" },
];

const FEATURES: Feature[] = [
  { icon: "🎬", title: "HD Video Lectures", desc: "2000+ concept videos by expert teachers, chapter-wise and topic-wise", color: "#0f3460" },
  { icon: "📋", title: "Chapter-wise Tests", desc: "200+ practice tests with instant evaluation and performance analytics", color: "#7b1a1a" },
  { icon: "📄", title: "NCERT Solutions", desc: "Step-by-step solutions to every exercise question across all subjects", color: "#14532d" },
  { icon: "🎧", title: "Doubt Solving", desc: "Ask doubts anytime — answered by subject experts within 2 hours", color: "#78350f" },
  { icon: "📈", title: "Progress Tracker", desc: "Visual dashboards showing chapter completion, test scores and weak areas", color: "#1e3a5f" },
  { icon: "🏆", title: "Mock Exam Series", desc: "Full-syllabus mocks modeled on school and board exam patterns", color: "#166534" },
];

const FAQS: Faq[] = [
  { q: "Is this course aligned with the latest CBSE Class 9 syllabus?", a: "Yes, all content is fully aligned with the CBSE Class 9 curriculum for 2025–26. Whenever NCERT updates chapters or the board revises the syllabus, we update our videos, notes and tests within 48 hours. The course covers Mathematics, Science, Social Science, English and Hindi." },
  { q: "Can I access recorded lectures if I miss a live class?", a: "Absolutely. Every live class is recorded and available on-demand within 2 hours of the session. You can watch it as many times as you want. Most students re-watch key concept videos before exams for quick revision." },
  { q: "Does the course cover all four parts of Social Science?", a: "Yes. The Social Science course is divided into four clear modules: History (India and the Contemporary World), Geography (Contemporary India), Democratic Politics (Civics), and Economics. Each module has separate chapter videos, notes and tests." },
  { q: "How are doubt-solving sessions structured?", a: "Students can submit text or photo doubts through the app. Subject experts respond within 2 hours on weekdays and within 4 hours on weekends. We also conduct weekly live doubt-clearing sessions for high-priority chapters before exams." },
  { q: "Are sample papers and previous year papers included?", a: "Yes. The course includes official CBSE sample papers for 2025–26, school-level sample papers, and previous year question papers from 2018 to 2025 — all with detailed solutions and marking scheme explanations." },
];

const EXAM_DATES: ExamDate[] = [
  { event: "Unit Test 1", date: "Apr 12, 2026" },
  { event: "Half Yearly Exam", date: "Sep 15, 2026" },
  { event: "Pre-Board Mock", date: "Jan 10, 2027" },
  { event: "Annual Exam", date: "Mar 5, 2027" },
  { event: "Result Declaration", date: "May 2027" },
];

const NAV_LINKS = ["Overview", "Subjects", "Chapters", "Features", "Results", "FAQs"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Class9Page() {
  const [activeSubject, setActiveSubject] = useState<SubjectTab>("Mathematics");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeSubjectData = SUBJECTS.find((s) => s.name === activeSubject)!;
  const activeChapters = CHAPTERS[activeSubject];

  return (
    <div className="font-serif bg-[#F5F3EE] min-h-screen mt-8 text-gray-900">

    

      {/* HERO */}
      <section className="relative bg-[#06112a] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-green-900/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,153,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,153,0,0.03) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/12 border border-amber-500/40 rounded-full px-3.5 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] sm:text-[12px] text-amber-300 font-bold tracking-wider font-mono">CBSE Class 9 — Session 2025–26</span>
              </div>

              <h1 className="text-[clamp(1.9rem,5vw,3rem)] text-white mb-4 leading-[1.18] font-bold tracking-tight">
                Class 9 Complete Prep —<br />
                <span className="text-amber-400">Score 95+ in Every Subject</span>
              </h1>

              <p className="text-[15px] sm:text-[16px] text-white/60 leading-relaxed mb-8 max-w-[500px] font-sans">
                Maths · Science · Social Science · English · Hindi — all five subjects covered with{" "}
                <span className="bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded font-mono text-sm">HD videos</span>,{" "}
                <span className="bg-amber-500/15 text-amber-300 px-2 py-0.5 rounded font-mono text-sm">NCERT solutions</span>, and chapter tests. Trusted by{" "}
                <strong className="text-white">1,40,000+ Class 9 students</strong> across India.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="bg-[#d97706] text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl text-[14px] sm:text-[15px] font-bold hover:bg-amber-600 transition-colors font-sans">
                  Start Learning Free →
                </button>
                <button className="bg-white/7 text-white px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl text-[14px] sm:text-[15px] font-semibold border border-white/20 hover:bg-white/10 transition-colors font-sans">
                  ▶ Watch Demo Lecture
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-white/10">
                {[["2,000+", "Video Lectures"], ["553", "Chapters Covered"], ["210+", "Practice Tests"], ["4.9★", "Student Rating"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-[20px] sm:text-[22px] font-bold text-amber-400 font-mono">{v}</div>
                    <div className="text-[11px] sm:text-[12px] text-white/40 mt-0.5 font-sans">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lead Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="bg-[#06112a] rounded-lg px-4 py-3 mb-5 border-l-[3px] border-amber-600">
                <div className="text-[11px] font-mono leading-loose text-amber-300">
                  <span className="text-gray-500"># Class 9 Study Planner</span><br />
                  <span className="text-amber-300">student</span> = <span className="text-amber-400">Class9</span>.<span className="text-green-400">enroll</span>(<span className="text-yellow-200">board="CBSE"</span>)<br />
                  <span className="text-amber-300">student</span>.get_free_notes()
                </div>
              </div>

              {([["Student's Full Name", "text", "Riya Gupta"], ["Parent's Mobile", "tel", "+91 9876543210"], ["Email", "email", "riya@email.com"]] as [string, string, string][]).map(([label, type, ph]) => (
                <div key={label} className="mb-4">
                  <label className="text-[12px] font-semibold text-gray-500 block mb-1 font-sans">{label}</label>
                  <input type={type} placeholder={ph} className="w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 text-[14px] outline-none text-gray-700 focus:border-[#0f3460] transition-colors font-sans" />
                </div>
              ))}

              <div className="mb-4">
                <label className="text-[12px] font-semibold text-gray-500 block mb-1 font-sans">Board</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 text-[14px] text-gray-700 bg-white outline-none font-sans">
                  <option>CBSE</option><option>ICSE</option><option>State Board</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="text-[12px] font-semibold text-gray-500 block mb-1 font-sans">Weakest Subject</label>
                <select className="w-full px-3.5 py-2.5 rounded-lg border-[1.5px] border-gray-200 text-[14px] text-gray-700 bg-white outline-none font-sans">
                  {SUBJECT_TABS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <button className="w-full bg-[#0f3460] text-white py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#0a2540] transition-colors font-mono">
                Get Free Study Plan →
              </button>
              <p className="text-center text-[11px] text-gray-400 mt-2.5 font-sans">Free · Includes NCERT Notes PDF · Expert callback in 2 hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#06112a] py-2.5 px-4 overflow-hidden border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="bg-[#d97706] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded font-mono whitespace-nowrap flex-shrink-0">LIVE</span>
          <div className="flex gap-6 sm:gap-10 overflow-x-auto">
            {["📚 CBSE Class 9 Annual Exam 2027 — Preparation starts NOW", "🎓 New batch for Class 9 Maths starting April 5", "🏆 Ananya Kapoor — 99/100 in Maths, DAV Delhi", "📄 Free NCERT Solutions — All chapters uploaded", "🏅 Scholarship test — Mar 30 — Win up to 100% fee waiver"].map((t, i) => (
              <span key={i} className="text-[12px] sm:text-[13px] text-white/70 whitespace-nowrap font-sans">🔔 {t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* EXAM DATES */}
        <section className="pt-8 sm:pt-10">
          <div className="bg-white rounded-2xl border border-[#e4d9c8] px-5 sm:px-8 py-5 sm:py-6">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#0f3460] uppercase mb-4 font-sans">📅 Important Exam Dates 2026–27</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {EXAM_DATES.map((d, i) => (
                <div key={i} className="text-center bg-[#f9f7f4] rounded-xl p-3">
                  <div className="text-[13px] font-bold text-amber-600 font-mono mb-1">{d.date}</div>
                  <div className="text-[12px] text-gray-500 leading-snug font-sans">{d.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBJECT CARDS */}
        <section className="pt-12 sm:pt-14">
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-600 uppercase mb-2.5 font-sans">All Subjects</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-gray-900 mb-3.5 tracking-tight font-bold">Class 9 — Subject-wise Courses</h2>
            <p className="text-gray-500 text-[14px] sm:text-[15px] max-w-[480px] mx-auto leading-relaxed font-sans">Every subject broken into chapters, with videos, notes, and tests — all NCERT-aligned.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {SUBJECTS.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border-2 hover:-translate-y-1 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg flex flex-col justify-between"
                style={{ borderColor: activeSubject === s.name ? s.color : "#e4d9c8" }}
                onClick={() => setActiveSubject(s.name as SubjectTab)}
              >
                <div className="px-5 pt-5 pb-4" style={{ background: s.color }}>
                  {s.tag && <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full inline-block mb-2.5 font-sans">{s.tag}</span>}
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-2xl mb-3">{s.icon}</div>
                  <h3 className="text-[15px] font-bold text-white leading-snug">{s.name}</h3>
                </div>
                <div className="px-5 pt-4 pb-5">
                  <div className="grid grid-cols-3 gap-1.5 mb-4">
                    {[[s.chapters, "Chapters"], [s.videos, "Videos"], [s.tests, "Tests"]].map(([val, lbl], j) => (
                      <div key={j} className="text-center bg-[#f9f7f4] rounded-lg py-2">
                        <div className="text-[15px] font-bold font-mono" style={{ color: s.color }}>{val}</div>
                        <div className="text-[10px] text-gray-400 font-sans">{lbl}</div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full text-white py-2.5 rounded-lg text-[12px] font-bold border-none cursor-pointer font-sans" style={{ background: s.color }}>
                    Explore →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER LIST */}
        <section className="pt-12 sm:pt-14 pb-2">
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-600 uppercase mb-2.5 font-sans">Chapter Index</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-gray-900 tracking-tight font-bold">NCERT Class 9 — Chapter-wise Content</h2>
          </div>

          <div className="bg-white rounded-2xl border border-[#e4d9c8] overflow-hidden shadow-sm">
            {/* Tabs — scrollable on mobile */}
            <div className="flex border-b border-[#e4d9c8] overflow-x-auto">
              {SUBJECT_TABS.map((t) => {
                const subj = SUBJECTS.find((s) => s.name === t)!;
                return (
                  <button
                    key={t}
                    onClick={() => setActiveSubject(t)}
                    className="flex-shrink-0 sm:flex-1 px-4 py-3.5 text-[12px] sm:text-[13px] font-semibold cursor-pointer border-none whitespace-nowrap min-w-[110px] transition-colors font-sans"
                    style={{ background: activeSubject === t ? subj.color : "white", color: activeSubject === t ? "white" : "#555" }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Desktop table header */}
            <div className="hidden md:grid md:grid-cols-[40px_1fr_100px_80px_56px_56px_80px] px-5 py-2.5 bg-[#f9f7f4] border-b border-[#e4d9c8]">
              {["#", "Chapter", "Tag", "Lessons", "Quiz", "Notes", "Access"].map((h, i) => (
                <div key={h} className={`text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans ${i > 2 ? "text-center" : ""}`}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            <div>
              {activeChapters.map((ch, i) => (
                <div
                  key={i}
                  className="border-b border-[#f5f0e8] hover:bg-[#faf8f5] transition-colors cursor-pointer"
                >
                  {/* Desktop row */}
                  <div className="hidden md:grid md:grid-cols-[40px_1fr_100px_80px_56px_56px_80px] px-5 py-3.5 items-center">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold text-white font-mono" style={{ background: ch.color }}>{ch.no}</div>
                    <div className="text-[13px] font-semibold text-gray-800 pr-4 leading-snug font-sans">{ch.title}</div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono" style={{ color: ch.color, background: ch.color + "18" }}>{ch.subject}</span>
                    </div>
                    <div className="text-center text-[12px] text-gray-500 font-mono">{ch.lessons}</div>
                    <div className="text-center">{ch.quiz ? <span className="text-amber-500 text-sm">✓</span> : <span className="text-gray-200">—</span>}</div>
                    <div className="text-center">{ch.notes ? <span className="text-green-600 text-sm">✓</span> : <span className="text-gray-200">—</span>}</div>
                    <div className="text-center">
                      {ch.free
                        ? <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-mono">🔓 Free</span>
                        : <span className="text-[10px] font-bold text-[#0f3460] bg-blue-50 px-2 py-0.5 rounded-full font-mono">🔒 Pro</span>}
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div className="md:hidden px-4 py-3.5 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white font-mono flex-shrink-0 mt-0.5" style={{ background: ch.color }}>{ch.no}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-gray-800 leading-snug font-sans mb-1">{ch.title}</div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded font-mono" style={{ color: ch.color, background: ch.color + "18" }}>{ch.subject}</span>
                        <span className="text-[11px] text-gray-400 font-sans">{ch.lessons} lessons</span>
                        {ch.free
                          ? <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full font-mono">🔓 Free</span>
                          : <span className="text-[10px] font-bold text-[#0f3460] bg-blue-50 px-2 py-0.5 rounded-full font-mono">🔒 Pro</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 bg-[#f9f7f4] border-t border-[#e4d9c8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-[12px] text-gray-400 font-sans">
                Showing {activeChapters.length} of {activeSubjectData.chapters} chapters ·{" "}
                <span className="text-green-700 font-bold">{activeChapters.filter(c => c.free).length} free</span> chapters available
              </p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0f3460] text-white text-[12px] font-bold font-mono">
                View All Chapters →
              </button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="pt-12 sm:pt-14">
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-600 uppercase mb-2.5 font-sans">What's Included</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-gray-900 tracking-tight font-bold">Everything You Need to Score 95+</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4d9c8] shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: f.color + "18" }}>{f.icon}</div>
                <h4 className="text-[16px] sm:text-[17px] font-bold text-gray-900 mb-2">{f.title}</h4>
                <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FREE RESOURCES */}
        <section className="pt-12 sm:pt-14">
          <div className="bg-[#06112a] rounded-2xl sm:rounded-3xl px-5 sm:px-10 py-10 sm:py-12 border border-amber-500/15 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-amber-600/12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-green-900/10 blur-2xl pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
              <div>
                <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-400 uppercase mb-2.5 font-sans">100% Free Resources</p>
                <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] text-white mb-3.5 tracking-tight font-bold">Free Study Material for Class 9</h2>
                <p className="text-white/55 text-[14px] sm:text-[15px] leading-relaxed max-w-sm font-sans">Download NCERT Solutions, sample papers and revision notes — no login required. Start with free chapters before enrolling in the full course.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                {RESOURCES.map((r, i) => (
                  <div key={i} className="bg-white/6 rounded-2xl px-4 py-4 sm:py-5 border border-white/10 flex flex-col gap-2.5 cursor-pointer hover:-translate-y-1 transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: r.color + "30" }}>{r.icon}</div>
                    <div>
                      <div className="text-[13px] font-semibold text-white mb-0.5 font-sans">{r.label}</div>
                      <div className="text-[11px] sm:text-[12px] text-white/50 font-sans">{r.desc}</div>
                    </div>
                    <div className="text-[12px] font-semibold mt-0.5 font-sans" style={{ color: r.color }}>⬇ Free Download</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TOPPERS */}
        {/* <section className="pt-12 sm:pt-14">
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-600 uppercase mb-2.5 font-sans">Student Success Stories</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-gray-900 tracking-tight font-bold">Class 9 Toppers from GovPrep</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {TOPPERS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e4d9c8] shadow-sm">
                <div className="text-4xl text-amber-500 leading-none mb-4 font-mono">"</div>
                <p className="text-[13px] sm:text-[14px] text-gray-600 leading-relaxed mb-5 font-sans">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#0f3460] text-white flex items-center justify-center font-bold text-[15px] flex-shrink-0">{t.name[0]}</div>
                  <div className="min-w-0">
                    <div className="font-bold text-[13px] sm:text-[14px] text-gray-900 truncate font-sans">{t.name}</div>
                    <div className="text-[11px] sm:text-[12px] text-gray-500 truncate font-sans">{t.school}</div>
                  </div>
                  <div className="ml-auto flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[11px] font-bold text-amber-600 font-mono">{t.score}</span>
                    <span className="text-[10px] font-bold text-[#0f3460] bg-blue-50 px-2 py-0.5 rounded-full font-sans">{t.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* FAQs */}
        <section className="pt-12 sm:pt-14 pb-16 sm:pb-20">
          <div className="text-center mb-10">
            <p className="text-[11px] sm:text-[12px] font-bold tracking-[0.12em] text-amber-600 uppercase mb-2.5 font-sans">Got Questions?</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-gray-900 tracking-tight font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-[740px] mx-auto space-y-2.5">
            {FAQS.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bg-white rounded-xl border border-[#e4d9c8] overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between px-5 sm:px-6 py-4">
                  <span className="text-[13px] sm:text-[14px] font-semibold text-gray-900 pr-4 leading-snug font-sans">{f.q}</span>
                  <span className={`flex-shrink-0 text-gray-400 text-sm transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}>▾</span>
                </div>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pt-1 pb-5 text-[13px] sm:text-[14px] text-gray-600 leading-relaxed border-t border-gray-100 font-sans">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <footer className="relative bg-[#06112a] px-4 sm:px-6 py-16 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,153,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,153,0,0.03) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* decorative code block */}
        <div className="absolute bottom-8 left-6 sm:left-12 text-left pointer-events-none hidden sm:block">
          <div className="text-[11px] font-mono text-amber-400/10 leading-loose">
            <div>while score &lt; 95:</div>
            <div>&nbsp;&nbsp;watch_lecture()</div>
            <div>&nbsp;&nbsp;practice_test()</div>
            <div>&nbsp;&nbsp;clear_doubts()</div>
          </div>
        </div>

        <div className="relative">
          <div className="text-3xl mb-3">🎓</div>
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] text-white mb-3 tracking-tight font-bold">
            Your Class 9 Success Story Starts{" "}
            <em className="text-amber-400 not-italic">Today</em>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white/50 mb-8 font-sans">Join 1,40,000+ Class 9 students who are acing their exams with GovPrep India.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <button className="bg-[#d97706] text-white px-7 sm:px-8 py-3 rounded-xl text-[14px] sm:text-[15px] font-bold hover:bg-amber-600 transition-colors font-sans">Start Free Trial</button>
            <button className="bg-white/7 text-white px-7 sm:px-8 py-3 rounded-xl text-[14px] sm:text-[15px] font-semibold border border-white/20 hover:bg-white/10 transition-colors font-sans">Download Free Study Plan PDF</button>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <span>🎓</span>
              <span className="font-bold text-white text-sm font-sans">GovPrep India</span>
            </div>
            <p className="text-[12px] text-white/30 font-sans">© 2026 GovPrep India. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy", "Terms", "Contact"].map(l => (
                <a key={l} href="#" className="text-[12px] text-white/40 hover:text-white transition-colors font-sans">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}