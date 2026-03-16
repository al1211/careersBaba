"use client"
import { useState } from "react";
import {
  FaBell, FaArrowRight, FaNewspaper, FaGlobe, FaLandmark,
  FaFlask, FaLeaf, FaChartLine, FaBook, FaDownload,
  FaPlay, FaStar, FaCheckCircle, FaCalendarAlt, FaTag,
  FaFireAlt, FaBookmark, FaSearch, FaFilter
} from "react-icons/fa";
import type { IconType } from "react-icons";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CAArticle {
  id: number;
  date: string;
  category: string;
  categoryColor: string;
  title: string;
  summary: string;
  gsPaper: string;
  tags: string[];
  isHot?: boolean;
  isBookmarked?: boolean;
}

interface MonthlyMag {
  month: string;
  year: string;
  pages: string;
  topics: string[];
  color: string;
  downloadCount: string;
}

interface CategoryFilter {
  label: string;
  icon: IconType;
  color: string;
  count: number;
}

interface WeeklyDigest {
  weekRange: string;
  highlights: string[];
  examRelevance: string;
}

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const ARTICLES: CAArticle[] = [
  {
    id: 1,
    date: "Mar 15, 2026",
    category: "International Relations",
    categoryColor: "#0f3460",
    title: "India-EU Trade & Technology Council: Third Ministerial Meeting Outcomes",
    summary:
      "The third ministerial meeting of the India-EU Trade and Technology Council concluded with agreements on semiconductor supply chains, digital connectivity, and clean energy partnerships. Both sides agreed to accelerate negotiations on the Bilateral Investment Treaty.",
    gsPaper: "GS II — IR",
    tags: ["EU", "Trade", "Technology", "Diplomacy"],
    isHot: true,
  },
  {
    id: 2,
    date: "Mar 14, 2026",
    category: "Economy",
    categoryColor: "#14532d",
    title: "RBI Monetary Policy Committee Keeps Repo Rate Unchanged at 6.25%",
    summary:
      "The MPC unanimously voted to maintain the repo rate at 6.25% while shifting the stance to 'neutral'. Retail inflation eased to 4.1% in February, and GDP growth projection for FY27 set at 7.2%. Key focus on rural consumption and credit offtake.",
    gsPaper: "GS III — Economy",
    tags: ["RBI", "Monetary Policy", "Inflation", "GDP"],
    isHot: true,
  },
  {
    id: 3,
    date: "Mar 14, 2026",
    category: "Environment",
    categoryColor: "#166534",
    title: "IPCC AR7 Synthesis Report: South Asia Faces Heightened Climate Risk",
    summary:
      "The IPCC's seventh assessment synthesis report warns of accelerated glacial retreat in the Himalayas, increased frequency of extreme heat events, and threats to monsoon reliability. India's coastal cities face compounded risks from sea-level rise and cyclone intensification.",
    gsPaper: "GS III — Environment",
    tags: ["IPCC", "Climate Change", "South Asia", "Himalayas"],
  },
  {
    id: 4,
    date: "Mar 13, 2026",
    category: "Polity & Governance",
    categoryColor: "#7b1a1a",
    title: "Supreme Court Constitution Bench Upholds 'One Rank One Pension' Formula",
    summary:
      "A 5-judge Constitution Bench upheld the revised OROP formula, ruling it consistent with Article 14. The bench also directed the government to resolve pension anomalies within 6 months and establish a permanent review mechanism for defence pension revisions.",
    gsPaper: "GS II — Polity",
    tags: ["Supreme Court", "OROP", "Armed Forces", "Article 14"],
  },
  {
    id: 5,
    date: "Mar 13, 2026",
    category: "Science & Technology",
    categoryColor: "#1e3a5f",
    title: "ISRO Successfully Tests Reusable Launch Vehicle RLV-TD Autonomous Landing",
    summary:
      "ISRO's Reusable Launch Vehicle Technology Demonstrator completed its fourth autonomous landing experiment at Chitradurga aeronautical test range. The test validated critical deceleration algorithms at 1.6 Mach, a major milestone towards India's own space shuttle capability by 2028.",
    gsPaper: "GS III — S&T",
    tags: ["ISRO", "RLV", "Space Technology", "Reusable Rocket"],
    isHot: true,
  },
  {
    id: 6,
    date: "Mar 12, 2026",
    category: "Social Issues",
    categoryColor: "#78350f",
    title: "Census 2026 — Socio-Economic Data to Be Released in Phases Starting April",
    summary:
      "The Registrar General of India announced a phased release of Census 2026 data beginning April 1. The socio-economic data will include first-ever caste enumeration since 1931, literacy rate disaggregation by gender and district, and data on housing and sanitation access.",
    gsPaper: "GS I — Society",
    tags: ["Census", "Caste Enumeration", "Demographics", "Social Data"],
  },
];

const MONTHLY_MAGS: MonthlyMag[] = [
  {
    month: "March",
    year: "2026",
    pages: "54 pages",
    topics: ["Budget 2026 Analysis", "IR Summits", "SC Judgments", "IPCC AR7"],
    color: "#0f3460",
    downloadCount: "1,24,000+",
  },
  {
    month: "February",
    year: "2026",
    pages: "50 pages",
    topics: ["Union Budget Highlights", "Pravasi Bharatiya", "EV Policy", "Space Missions"],
    color: "#7b1a1a",
    downloadCount: "2,11,000+",
  },
  {
    month: "January",
    year: "2026",
    pages: "48 pages",
    topics: ["Republic Day Analysis", "New Year Schemes", "Arctic Policy", "Digital India 2.0"],
    color: "#14532d",
    downloadCount: "1,98,000+",
  },
];

const CATEGORIES: CategoryFilter[] = [
  { label: "All Topics", icon: FaNewspaper, color: "#111", count: 248 },
  { label: "International Relations", icon: FaGlobe, color: "#0f3460", count: 42 },
  { label: "Polity & Governance", icon: FaLandmark, color: "#7b1a1a", count: 38 },
  { label: "Economy", icon: FaChartLine, color: "#14532d", count: 51 },
  { label: "Science & Tech", icon: FaFlask, color: "#1e3a5f", count: 29 },
  { label: "Environment", icon: FaLeaf, color: "#166534", count: 33 },
];

const WEEKLY_DIGESTS: WeeklyDigest[] = [
  {
    weekRange: "Mar 10–15, 2026",
    highlights: [
      "India-EU TTC third ministerial, semiconductor deal signed",
      "RBI MPC holds repo at 6.25%, neutral stance adopted",
      "ISRO RLV fourth landing test success at Mach 1.6",
      "IPCC AR7 warns of amplified South Asian climate risk",
      "SC 5-bench upholds revised OROP formula",
    ],
    examRelevance: "High — GS II, III + Essay",
  },
  {
    weekRange: "Mar 3–9, 2026",
    highlights: [
      "PM inaugurates National Quantum Mission Phase I labs",
      "India signs $3.2B defence deal with France for Marine Rafale",
      "Lokpal issues show-cause notice to 3 secretaries",
      "National Urban Livelihoods Mission Phase III launched",
      "India's WPI inflation turns negative for third straight month",
    ],
    examRelevance: "High — GS II, III",
  },
];

const DAILY_QUIZ: Quiz[] = [
  {
    question:
      "Which article of the Indian Constitution deals with the composition of the Union Public Service Commission?",
    options: ["Article 312", "Article 315", "Article 320", "Article 323"],
    correct: 1,
    explanation:
      "Article 315 provides for the establishment of Public Service Commissions for the Union and the States. It specifies that there shall be a Public Service Commission for the Union and for each State.",
  },
  {
    question: "The 'Repo Rate' is the rate at which:",
    options: [
      "Banks lend to each other overnight",
      "RBI lends short-term funds to commercial banks",
      "RBI borrows from commercial banks",
      "Government borrows from RBI",
    ],
    correct: 1,
    explanation:
      "The Repo Rate (Repurchase Rate) is the rate at which the Reserve Bank of India lends money to commercial banks for short-term requirements against government securities. It is a key instrument of monetary policy.",
  },
];

const GS_MAPPING: { paper: string; color: string; todayCount: number; weekCount: number }[] = [
  { paper: "GS Paper I",  color: "#0f3460", todayCount: 3, weekCount: 18 },
  { paper: "GS Paper II", color: "#7b1a1a", todayCount: 5, weekCount: 31 },
  { paper: "GS Paper III",color: "#14532d", todayCount: 6, weekCount: 37 },
  { paper: "GS Paper IV", color: "#78350f", todayCount: 1, weekCount: 8  },
  { paper: "Essay Topics", color: "#1e3a5f", todayCount: 2, weekCount: 12 },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function CurrentAffairsPage() {
  const [activeCategory, setActiveCategory] = useState("All Topics");
  const [bookmarked, setBookmarked]         = useState<Set<number>>(new Set());
  const [quizIndex, setQuizIndex]           = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [searchQuery, setSearchQuery]       = useState("");

  const toggleBookmark = (id: number) => {
    setBookmarked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleOptionSelect = (i: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(i);
    setShowExplanation(true);
  };

  const currentQuiz = DAILY_QUIZ[quizIndex % DAILY_QUIZ.length];

  const filteredArticles = ARTICLES.filter((a) => {
    const matchCat    = activeCategory === "All Topics" || a.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="font-serif bg-[#F5F3EE] min-h-screen text-[#111]">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-[72px] px-6 bg-[linear-gradient(160deg,#06112a_0%,#0f2044_50%,#091830_100%)]">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_75%_25%,rgba(255,153,0,0.13)_0%,transparent_45%),radial-gradient(circle_at_15%_75%,rgba(19,136,8,0.07)_0%,transparent_45%)]" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,153,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,153,0,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Watermark text */}
        <div className="absolute top-14 right-[440px] pointer-events-none text-[rgba(255,153,0,0.07)] font-serif text-xs leading-loose">
          <div>GS II — Governance &amp; IR | GS III — Economy &amp; Environment</div>
          <div>GS I — Society, Heritage &amp; Geography | GS IV — Ethics</div>
          <div>Prelims — Current Events of National &amp; International Importance</div>
        </div>

        <div className="max-w-[1140px] mx-auto grid grid-cols-[1fr_340px] gap-12 items-center relative">

          {/* Left column */}
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(255,153,0,0.12)] border border-[rgba(255,153,0,0.4)] rounded-full px-3.5 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff9900] inline-block animate-pulse" />
              <span className="text-xs text-[#ffb84d] font-mono font-bold tracking-widest">
                Updated Daily by 7AM IST
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white mb-4 leading-tight font-bold tracking-tight">
              Current Affairs for UPSC,<br />
              <span className="text-[#ff9900]">SSC &amp; Banking Exams</span>
            </h1>

            <p className="text-base text-white/65 leading-relaxed mb-8 max-w-[520px]">
              Every news item is tagged to its{" "}
              <span className="bg-[rgba(255,153,0,0.15)] text-[#ffb84d] px-2 py-0.5 rounded font-mono text-sm">
                GS Paper
              </span>{" "}
              and{" "}
              <span className="bg-[rgba(255,153,0,0.15)] text-[#ffb84d] px-2 py-0.5 rounded font-mono text-sm">
                Exam Topic
              </span>
              . Daily briefs, weekly consolidations, monthly magazines — all exam-mapped. Study smarter, not more.
            </p>

            {/* Search bar */}
            <div className="flex max-w-[480px] bg-white rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <div className="px-4 flex items-center text-gray-400">
                <FaSearch size={15} />
              </div>
              <input
                type="text"
                placeholder="Search topics, schemes, bills, reports…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-3.5 border-none outline-none text-sm text-[#333] font-sans"
              />
              <button className="bg-[#d97706] text-white border-none px-5 font-bold text-sm font-mono cursor-pointer">
                Search
              </button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 mt-9">
              {[
                ["248",   "Articles This Month"],
                ["7AM",   "Daily Brief Time"],
                ["50 pg", "Monthly Magazine"],
                ["12",    "GS-Mapped Topics"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-[#ff9900] font-mono">{v}</div>
                  <div className="text-[11px] text-white/45 mt-1 font-sans">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Brief card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
            <div className="bg-[#06112a] px-5 py-4 flex items-center justify-between">
              <span className="font-mono text-xs text-[#ffb84d] font-bold">
                📰 Today's Brief — Mar 15, 2026
              </span>
              <span className="bg-[rgba(255,153,0,0.2)] text-[#ff9900] text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                6 Stories
              </span>
            </div>

            <div className="p-5">
              {ARTICLES.slice(0, 5).map((a, i) => (
                <div
                  key={a.id}
                  className={`flex gap-2.5 pb-3 mb-3 ${i < 4 ? "border-b border-[#f5f0e8]" : ""}`}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: a.categoryColor }}
                  />
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-[#111] leading-snug font-sans mb-1">
                      {a.title.length > 62 ? a.title.slice(0, 62) + "…" : a.title}
                    </div>
                    <span
                      className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded"
                      style={{ color: a.categoryColor, background: a.categoryColor + "18" }}
                    >
                      {a.gsPaper}
                    </span>
                  </div>
                  {a.isHot && <FaFireAlt size={11} color="#d97706" className="mt-0.5 shrink-0" />}
                </div>
              ))}

              <button className="w-full bg-[#0f3460] text-white py-3 rounded-xl text-sm font-bold font-mono cursor-pointer mt-1">
                Read Full Brief →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ────────────────────────────────────────────────────── */}
      <div className="bg-[#06112a] px-6 py-2.5 overflow-hidden">
        <div className="max-w-[1140px] mx-auto flex items-center gap-4">
          <span className="bg-[#d97706] text-white text-[11px] font-bold px-2.5 py-0.5 rounded font-mono whitespace-nowrap">
            TODAY
          </span>
          <div className="flex gap-9 overflow-hidden">
            {[
              "RBI MPC holds repo at 6.25% — neutral stance 💹",
              "ISRO RLV fourth autonomous landing test SUCCESS 🚀",
              "IPCC AR7: South Asia faces accelerated glacial retreat 🌊",
              "Census 2026 data release from April 1 — caste data after 95 years 📊",
              "India-EU TTC: semiconductor & clean energy deal signed 🤝",
            ].map((t, i) => (
              <span key={i} className="text-sm text-white/75 whitespace-nowrap">
                <FaBell size={11} className="mr-1.5 align-middle opacity-60 inline" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <div className="max-w-[1140px] mx-auto px-6">

        {/* GS PAPER MAPPING STRIP */}
        <section className="pt-10">
          <div className="bg-white rounded-2xl border border-[#e4d9c8] px-8 py-6">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#0f3460] uppercase mb-5 font-sans">
              📌 GS Paper Mapping — Today's Coverage
            </p>
            <div className="grid grid-cols-5 gap-4">
              {GS_MAPPING.map((g, i) => (
                <div key={i} className="text-center">
                  <div className="h-1.5 rounded bg-[#f0ece4] mb-2.5 overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${Math.min((g.todayCount / 8) * 100, 100)}%`,
                        background: g.color,
                      }}
                    />
                  </div>
                  <div className="text-lg font-bold font-mono mb-1" style={{ color: g.color }}>
                    {g.todayCount}
                  </div>
                  <div className="text-[11px] text-[#888] font-sans leading-snug">{g.paper}</div>
                  <div className="text-[10px] text-[#bbb] font-mono mt-0.5">{g.weekCount} this week</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTERS + ARTICLES ───────────────────────────── */}
        <section className="py-12">
          <div className="grid grid-cols-[220px_1fr] gap-8 items-start">

            {/* Sidebar */}
            <div>
              {/* Filter box */}
              <div className="bg-white rounded-[18px] border border-[#e4d9c8] overflow-hidden mb-5">
                <div className="px-5 py-4 border-b border-[#f5f0e8] flex items-center gap-2">
                  <FaFilter size={12} color="#d97706" />
                  <span className="text-xs font-bold text-[#111] font-sans tracking-[0.06em] uppercase">
                    Filter by Topic
                  </span>
                </div>

                {CATEGORIES.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat.label)}
                    className="w-full flex items-center justify-between px-5 py-3 border-none cursor-pointer transition-all duration-150"
                    style={{
                      background: activeCategory === cat.label ? cat.color + "12" : "transparent",
                      borderLeft: activeCategory === cat.label
                        ? `3px solid ${cat.color}`
                        : "3px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <cat.icon size={13} color={cat.color} />
                      <span
                        className="text-sm font-sans"
                        style={{
                          fontWeight: activeCategory === cat.label ? 700 : 500,
                          color: activeCategory === cat.label ? cat.color : "#555",
                        }}
                      >
                        {cat.label}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full font-mono"
                      style={{ color: cat.color, background: cat.color + "18" }}
                    >
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Daily Quiz */}
              <div className="rounded-[18px] border border-[rgba(255,153,0,0.2)] overflow-hidden p-5 bg-[linear-gradient(135deg,#06112a,#0f2044)]">
                <div className="flex items-center gap-2 mb-4">
                  <FaStar size={13} color="#d97706" />
                  <span className="text-xs font-bold text-[#ffb84d] font-mono tracking-[0.06em]">
                    DAILY QUIZ
                  </span>
                </div>

                <p className="text-sm text-white/85 leading-relaxed mb-3.5 font-sans">
                  {currentQuiz.question}
                </p>

                <div className="flex flex-col gap-2">
                  {currentQuiz.options.map((opt, i) => {
                    let bg          = "rgba(255,255,255,0.07)";
                    let borderColor = "rgba(255,255,255,0.12)";
                    let textColor   = "rgba(255,255,255,0.75)";
                    if (selectedOption !== null) {
                      if (i === currentQuiz.correct) {
                        bg = "rgba(20,83,45,0.5)"; borderColor = "#16a34a"; textColor = "#86efac";
                      } else if (i === selectedOption) {
                        bg = "rgba(123,26,26,0.5)"; borderColor = "#ef4444"; textColor = "#fca5a5";
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => handleOptionSelect(i)}
                        className="px-3 py-2.5 rounded-lg text-xs text-left font-sans leading-snug transition-all duration-150"
                        style={{
                          background: bg,
                          border: `1px solid ${borderColor}`,
                          color: textColor,
                          cursor: selectedOption !== null ? "default" : "pointer",
                        }}
                      >
                        <span className="font-mono mr-1.5">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="mt-3 p-3 bg-[rgba(255,153,0,0.12)] rounded-lg border border-[rgba(255,153,0,0.25)]">
                    <p className="text-[11px] text-white/70 leading-relaxed font-sans">
                      💡 {currentQuiz.explanation}
                    </p>
                    <button
                      onClick={() => {
                        setQuizIndex((p) => p + 1);
                        setSelectedOption(null);
                        setShowExplanation(false);
                      }}
                      className="mt-2 text-[11px] font-bold text-[#ffb84d] bg-transparent border-none cursor-pointer font-mono"
                    >
                      Next Question →
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Articles list */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-[1.8rem] text-[#111] mb-1">
                    {activeCategory === "All Topics" ? "Latest Articles" : activeCategory}
                  </h2>
                  <p className="text-sm text-[#888] font-sans">
                    {filteredArticles.length} articles • Updated Mar 15, 2026
                  </p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-[1.5px] border-[#e4d9c8] bg-white text-xs font-semibold text-[#555] cursor-pointer font-sans">
                  <FaFilter size={11} /> Filter
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {filteredArticles.map((a) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-[18px] px-7 py-6 border border-[#e4d9c8] relative overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ background: a.categoryColor }}
                    />

                    {/* Top meta row */}
                    <div className="flex items-start justify-between mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono"
                          style={{ color: a.categoryColor, background: a.categoryColor + "14" }}
                        >
                          {a.category}
                        </span>
                        <span className="text-[10px] text-[#aaa] font-sans">{a.date}</span>
                        {a.isHot && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#d97706] bg-[#fef3c7] px-2 py-0.5 rounded-full font-mono">
                            <FaFireAlt size={9} /> HOT
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleBookmark(a.id); }}
                        className="bg-transparent border-none cursor-pointer p-1"
                        style={{ color: bookmarked.has(a.id) ? "#d97706" : "#ccc" }}
                      >
                        <FaBookmark size={14} />
                      </button>
                    </div>

                    <h3 className="font-serif text-[1.15rem] font-bold text-[#111] mb-2.5 leading-snug">
                      {a.title}
                    </h3>

                    <p className="text-[13.5px] text-[#555] leading-relaxed mb-4 font-sans">
                      {a.summary}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        <span
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded font-mono"
                          style={{ color: a.categoryColor, background: a.categoryColor + "18" }}
                        >
                          📌 {a.gsPaper}
                        </span>
                        {a.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] text-[#888] bg-[#f0ece4] px-2.5 py-0.5 rounded font-sans"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="flex items-center gap-1.5 text-xs font-bold bg-transparent border-none cursor-pointer font-mono"
                        style={{ color: a.categoryColor }}
                      >
                        Read More <FaArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="text-center py-16 px-5 bg-white rounded-[18px] border border-[#e4d9c8]">
                    <div className="text-4xl mb-3">🔍</div>
                    <p className="text-[15px] text-[#888] font-sans">
                      No articles found. Try a different search or category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── WEEKLY DIGEST ─────────────────────────────────────────── */}
        <section className="pb-12">
          <div className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.12em] text-[#d97706] uppercase mb-2.5 font-sans">
              Weekly Consolidation
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] text-[#111]">
              Weekly Digest Archives
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {WEEKLY_DIGESTS.map((w, i) => (
              <div key={i} className="bg-white rounded-[18px] p-7 border border-[#e4d9c8]">
                <div className="flex items-center justify-between mb-[18px]">
                  <div className="text-sm font-bold text-[#111] font-mono">
                    📅 {w.weekRange}
                  </div>
                  <span className="bg-[#fef3c7] text-[#92400e] text-[10px] font-bold px-2.5 py-1 rounded-full font-mono">
                    Exam Relevance: {w.examRelevance}
                  </span>
                </div>

                <ul className="list-none p-0 m-0 mb-5">
                  {w.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-[#444] leading-snug mb-2.5 font-sans">
                      <FaCheckCircle size={13} color="#d97706" className="mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2.5">
                  <button className="flex-1 bg-[#0f3460] text-white py-2.5 rounded-xl text-xs font-bold font-mono cursor-pointer border-none">
                    Read Full Digest
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-[1.5px] border-[#e4d9c8] bg-white text-xs font-semibold text-[#555] cursor-pointer font-sans">
                    <FaDownload size={11} /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MONTHLY MAGAZINES ─────────────────────────────────────── */}
        <section className="pb-12">
          <div className="bg-[linear-gradient(135deg,#06112a,#0f2044)] rounded-3xl p-12 border border-[rgba(255,153,0,0.15)] relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-[250px] h-[250px] rounded-full bg-[rgba(217,119,6,0.12)]" />

            {/* Watermark */}
            <div className="absolute bottom-6 right-10 pointer-events-none text-[rgba(255,153,0,0.05)] font-mono text-[11px] leading-loose">
              <div>Part XVIII — Emergency Provisions (Art. 352–360)</div>
              <div>Part XIX — Miscellaneous (Art. 361–367)</div>
            </div>

            <div className="relative">
              <div className="mb-9">
                <p className="text-xs font-bold tracking-[0.12em] text-[#ff9900] uppercase mb-2.5 font-sans">
                  Monthly Magazine — Free Download
                </p>
                <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2rem)] text-white mb-2">
                  Current Affairs Monthly Magazine
                </h2>
                <p className="text-[#ffffff99] text-[15px] font-sans">
                  50+ pages of exam-mapped current affairs. No login required.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {MONTHLY_MAGS.map((mag, i) => (
                  <div
                    key={i}
                    className="bg-white/[0.06] rounded-2xl p-6 border border-white/10 transition-transform duration-200 cursor-pointer hover:-translate-y-1"
                  >
                    {/* Cover mock */}
                    <div
                      className="rounded-xl p-4 mb-4 text-center relative overflow-hidden"
                      style={{ background: mag.color }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      <FaNewspaper size={28} color="rgba(255,255,255,0.6)" className="mb-2 mx-auto" />
                      <div className="text-sm font-bold text-white font-serif">
                        {mag.month} {mag.year}
                      </div>
                      <div className="text-[11px] text-white/60 font-mono">{mag.pages}</div>
                    </div>

                    <div className="mb-3.5">
                      {mag.topics.map((t, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-1.5 text-xs text-white/65 mb-1.5 font-sans"
                        >
                          <FaCheckCircle size={10} color="#d97706" />
                          {t}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-[10px] text-white/40 font-mono">
                        {mag.downloadCount} downloads
                      </span>
                      <button className="flex items-center gap-1.5 text-xs font-bold text-[#ffb84d] bg-transparent border-none cursor-pointer font-mono">
                        <FaDownload size={10} /> Free PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SUBSCRIPTION CTA ──────────────────────────────────────── */}
        <section className="pb-20">
          <div className="bg-white rounded-3xl border border-[#e4d9c8] px-10 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(15,52,96,0.04)_0%,transparent_50%),radial-gradient(circle_at_80%_50%,rgba(217,119,6,0.04)_0%,transparent_50%)]" />

            <div className="relative">
              <div className="text-4xl mb-3">📬</div>
              <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] text-[#111] mb-2.5">
                Never Miss a News Story That Matters
              </h2>
              <p className="text-[15px] text-[#777] max-w-[480px] mx-auto mb-7 leading-relaxed font-sans">
                Get the daily 2-page Current Affairs brief in your inbox every morning by 7AM IST.
                Free forever — no credit card.
              </p>

              <div className="flex max-w-[440px] mx-auto mb-4 bg-[#f5f3ee] rounded-xl border-[1.5px] border-[#e4d9c8] overflow-hidden">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3.5 border-none outline-none text-sm bg-transparent text-[#333] font-sans"
                />
                <button className="bg-[#d97706] text-white border-none px-6 font-bold text-sm cursor-pointer font-mono whitespace-nowrap">
                  Subscribe Free →
                </button>
              </div>

              <p className="text-[11px] text-[#bbb] font-sans">
                Join 2,80,000+ aspirants • Unsubscribe anytime • No spam
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── FOOTER CTA ────────────────────────────────────────────────── */}
      <div className="bg-[linear-gradient(135deg,#06112a,#0f2044)] px-6 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,153,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,153,0,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-8 left-12 pointer-events-none text-[rgba(255,153,0,0.05)] font-mono text-xs leading-loose text-left">
          <div>while not_selected:</div>
          <div>&nbsp;&nbsp;read_current_affairs()</div>
          <div>&nbsp;&nbsp;revise()</div>
          <div>&nbsp;&nbsp;attempt()</div>
        </div>

        <div className="relative py-4">
          <div className="text-4xl mb-3">🏛️</div>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-white mb-3">
            Stay Informed. Stay Ahead.{" "}
            <em className="text-[#ff9900]">Crack the Exam.</em>
          </h2>
          <p className="text-[15px] text-white/55 mb-8 font-sans">
            Pair Current Affairs with our full prep courses and give yourself the best shot.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#d97706] text-white px-8 py-3 rounded-xl text-[15px] font-bold border-none cursor-pointer font-serif">
              Explore Full Courses
            </button>
            <button className="bg-white/[0.07] text-white px-8 py-3 rounded-xl text-[15px] font-semibold border border-white/20 cursor-pointer">
              Download March Magazine PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}