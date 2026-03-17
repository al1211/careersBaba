"use client"
import { useState } from "react";
import {
  FaChevronDown, FaStar, FaCheckCircle, FaBell,
  FaArrowRight, FaCode, FaDatabase, FaBrain,
  FaTerminal, FaChartLine, FaCubes, FaRocket,
  FaFlask, FaAtom, FaProjectDiagram, FaServer
} from "react-icons/fa";

const COURSES = [
  {
    title: "ML Zero to Hero 2026",
    tag: "Most Popular",
    price: "₹5,999",
    original: "₹11,000",
    duration: "5 months",
    mode: "Live Online",
    students: "54,000+",
    color: "#1a3fa8",
    features: ["Math for ML (Linear Algebra, Stats)", "Supervised & Unsupervised Learning", "Model Evaluation & Tuning", "6 Real Projects"],
  },
  {
    title: "Deep Learning & Neural Nets",
    tag: "AI Track",
    price: "₹7,499",
    original: "₹14,000",
    duration: "5 months",
    mode: "Live + Recorded",
    students: "31,200+",
    color: "#6d28d9",
    features: ["ANN, CNN, RNN, LSTM", "PyTorch & TensorFlow 2.x", "Transfer Learning", "Computer Vision Projects"],
  },
  {
    title: "NLP & Generative AI",
    tag: "Trending",
    price: "₹8,999",
    original: "₹16,000",
    duration: "6 months",
    mode: "Live + Mentored",
    students: "22,800+",
    color: "#065f46",
    features: ["Transformers & Attention", "Fine-tuning LLMs (BERT, GPT)", "RAG & Vector Databases", "Deploy AI Apps"],
  },
  {
    title: "ML for Production & MLOps",
    tag: "Advanced",
    price: "₹6,999",
    original: "₹13,000",
    duration: "8 weeks",
    mode: "Self-Paced",
    students: "14,500+",
    color: "#9a3412",
    features: ["Feature Stores & Pipelines", "Model Monitoring & Drift", "CI/CD for ML (MLflow, DVC)", "Deploy on GCP / AWS SageMaker"],
  },
];

const RESOURCES = [
  { icon: FaBrain, label: "ML Algorithms Cheatsheet", desc: "When to use what & why", color: "#1a3fa8" },
  { icon: FaChartLine, label: "50 Kaggle Techniques", desc: "Feature eng to ensembles", color: "#6d28d9" },
  { icon: FaDatabase, label: "pandas + sklearn Guide", desc: "End-to-end ML pipeline", color: "#065f46" },
  { icon: FaCode, label: "Free Mini Project", desc: "Build a price predictor", color: "#9a3412" },
];

const CURRICULUM_DATA: Record<string, { label: string; value: string }[]> = {
  "ML Foundations": [
    { label: "Duration", value: "Weeks 1–6" },
    { label: "Math", value: "Linear Algebra, Calculus, Probability & Statistics" },
    { label: "Core Algorithms", value: "Linear Reg, Logistic Reg, Decision Trees, KNN, SVM" },
    { label: "Projects", value: "House Price Predictor, Iris Classifier, Churn Model" },
    { label: "Tools", value: "NumPy, pandas, Matplotlib, Scikit-learn, Jupyter" },
    { label: "Assessment", value: "Kaggle Submission + Peer Code Review" },
  ],
  "Advanced ML": [
    { label: "Duration", value: "Weeks 7–13" },
    { label: "Algorithms", value: "Random Forest, XGBoost, LightGBM, Bagging & Boosting" },
    { label: "Techniques", value: "Feature Engineering, Cross-Validation, Hyperparameter Tuning" },
    { label: "Projects", value: "Credit Risk Model, Fraud Detection, Recommender System" },
    { label: "Tools", value: "Optuna, SHAP, Yellowbrick, MLflow, DVC" },
    { label: "Assessment", value: "Private Leaderboard Challenge + Model Explainability Report" },
  ],
  "Deep Learning & Deploy": [
    { label: "Duration", value: "Weeks 14–20" },
    { label: "Topics", value: "ANN, CNN, RNN, Transformers, Attention Mechanisms" },
    { label: "Frameworks", value: "PyTorch 2.x, TensorFlow/Keras, HuggingFace" },
    { label: "Projects", value: "Image Classifier, Sentiment Model, Fine-tuned LLM API" },
    { label: "Tools", value: "FastAPI, Docker, AWS SageMaker, Weights & Biases" },
    { label: "Assessment", value: "Capstone Deployment + Live Demo Presentation" },
  ],
};

const CURR_TABS = ["ML Foundations", "Advanced ML", "Deep Learning & Deploy"] as const;
type CurrTab = typeof CURR_TABS[number];

const MENTORS = [
  { name: "Priya Sharma", role: "Ex-DeepMind | PhD IISc", specialty: "Deep Learning & Research", color: "#1a3fa8", initials: "PS" },
  { name: "Arjun Kapoor", role: "Ex-Amazon Science | IIT B", specialty: "NLP & LLM Fine-tuning", color: "#6d28d9", initials: "AK" },
  { name: "Meera Nair", role: "Kaggle Grandmaster | Ex-Microsoft", specialty: "Feature Eng & Competitions", color: "#065f46", initials: "MN" },
  { name: "Vikram Das", role: "MLOps Lead | 12 yrs exp", specialty: "Production ML & SageMaker", color: "#9a3412", initials: "VD" },
];

const TOPPERS = [
  {
    name: "Sneha Kulkarni",
    role: "ML Engineer @ PhonePe",
    batch: "Zero to Hero 2024",
    tag: "₹22 LPA",
    quote: "I came from a non-CS background. The math-first approach in week 1 actually made sense for the first time. By month 4 I had 3 Kaggle bronze medals and an offer letter.",
  },
  {
    name: "Rahul Mishra",
    role: "NLP Researcher @ Samsung R&D",
    batch: "NLP Track 2024",
    tag: "₹19 LPA",
    quote: "The transformer deep-dives were exceptional. We coded multi-head attention from scratch. That exercise alone got me through Samsung's most challenging ML interview round.",
  },
  {
    name: "Pooja Iyer",
    role: "Data Scientist @ Flipkart",
    batch: "Advanced ML 2024",
    tag: "2.4× Salary",
    quote: "SHAP values, feature stores, and MLflow were the exact things Flipkart tested. It felt like the mentors knew the interview inside-out. I cracked it in my first attempt.",
  },
];

const FAQS = [
  {
    q: "What math background do I need for ML?",
    a: "The Zero to Hero track starts from high school math level. Weeks 1–3 are dedicated entirely to Linear Algebra, Calculus intuition, Probability, and Statistics — explained visually using code and real data. No prior college-level math is required, just basic arithmetic and a willingness to learn.",
  },
  {
    q: "Which framework is used — PyTorch or TensorFlow?",
    a: "Both. Foundations are taught in Scikit-learn. Deep Learning is primarily PyTorch 2.x (the industry standard for research and production), with TensorFlow/Keras covered as a secondary framework. HuggingFace Transformers is deeply integrated into the NLP track.",
  },
  {
    q: "Do you cover Generative AI and LLMs?",
    a: "Yes — the NLP & GenAI track is fully dedicated to this. Topics include the Transformer architecture, prompt engineering, fine-tuning BERT and GPT-family models, building RAG pipelines with vector databases (Pinecone, Chroma), and deploying AI apps using LangChain and FastAPI.",
  },
  {
    q: "How is ML interview preparation handled?",
    a: "Every module has a dedicated ML Interview Prep block covering theory Q&As (bias-variance, regularization, gradient descent), coding rounds (from scratch implementations), case studies (how would you build a recommendation system at scale?), and mock interviews with mentors who have conducted interviews at top companies.",
  },
  {
    q: "What is the difference between the ML and Deep Learning tracks?",
    a: "The ML track focuses on classical algorithms (regression, trees, SVMs, boosting), feature engineering, and tabular data — what most data scientist roles require. The Deep Learning track focuses on neural networks, CNNs, RNNs, and Transformers for vision and language tasks. Both are covered end-to-end in the Zero to Hero flagship program.",
  },
];

const STACK_ICONS = [
  { label: "Python 3.12", color: "#1a3fa8" },
  { label: "NumPy", color: "#1a3fa8" },
  { label: "Pandas", color: "#065f46" },
  { label: "Scikit-learn", color: "#6d28d9" },
  { label: "PyTorch 2.x", color: "#9a3412" },
  { label: "TensorFlow", color: "#b45309" },
  { label: "HuggingFace", color: "#92400e" },
  { label: "XGBoost", color: "#1e40af" },
  { label: "LightGBM", color: "#065f46" },
  { label: "MLflow", color: "#374151" },
  { label: "Weights & Biases", color: "#6d28d9" },
  { label: "Docker + SageMaker", color: "#0369a1" },
];

const STATS = [
  ["5.0★", "Avg Rating"],
];

const EXAM_DATES = [
  { event: "New Batch Starts", date: "Apr 5, 2026" },
  { event: "Early Bird Ends", date: "Mar 28, 2026" },
  { event: "Free Demo Class", date: "Mar 23, 2026" },
  { event: "Scholarship Test", date: "Mar 30, 2026" },
  { event: "Placement Drive", date: "Oct 2026" },
];

export default function MachineLearningPage() {
  const [activeTab, setActiveTab] = useState<CurrTab>("ML Foundations");
  const [openFaq, setOpenFaq] = useState<null | number>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F4F5F7", minHeight: "100vh", color: "#111" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #050d1a 0%, #0a1a3a 45%, #05101e 100%)", padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
        {/* Glows */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "radial-gradient(circle at 72% 22%, rgba(26,63,168,0.32) 0%, transparent 50%), radial-gradient(circle at 12% 78%, rgba(109,40,217,0.18) 0%, transparent 50%)" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
        {/* Floating code decoration */}
        <div className="absolute top-12 right-[420px] text-[rgba(96,165,250,0.18)] font-['Space_Mono',monospace] text-[13px] leading-[1.8] pointer-events-none hidden xl:block">
          <div>model = XGBClassifier(</div>
          <div>&nbsp;&nbsp;n_estimators=500,</div>
          <div>&nbsp;&nbsp;learning_rate=0.05</div>
          <div>)</div>
          <div className="mt-3">model.fit(X_train, y_train)</div>
          <div>shap.summary_plot(vals, X)</div>
        </div>

        <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-center relative">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(26,63,168,0.25)] border border-[rgba(26,63,168,0.5)] rounded-[20px] px-[14px] py-[5px] mb-[22px]">
              <span className="w-[7px] h-[7px] rounded-full bg-[#60a5fa] inline-block animate-pulse" />
              <span className="text-[12px] text-[#60a5fa] font-['Space_Mono',monospace] font-semibold">
                India's #1 Machine Learning Platform
              </span>
            </div>

            <h1 className="font-['Space_Mono',monospace] text-[clamp(2rem,4vw,3rem)] text-white mb-4 leading-[1.2] tracking-[-0.04em]">
              Master Machine Learning &<br />
              <span className="text-[#60a5fa]">Build Intelligent Systems</span>
            </h1>

            <p className="text-[16px] text-[rgba(255,255,255,0.65)] leading-[1.75] mb-8 max-w-[500px]">
              From{" "}
              <code className="bg-[rgba(96,165,250,0.15)] text-[#60a5fa] px-[6px] py-[2px] rounded-[4px] text-[14px]">model.fit(X, y)</code> to
              deploying production AI — mentor-led ML courses for data scientists, engineers,
              and researchers. Over{" "}
              <strong className="text-white">1,22,000+ students</strong> placed at top companies.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button className="bg-[#1d4ed8] text-white px-[28px] py-[13px] rounded-[10px] text-[15px] font-bold border-none cursor-pointer hover:bg-[#1e40af] transition-colors">
                Explore Courses →
              </button>
              <button className="bg-[rgba(255,255,255,0.07)] text-white px-[28px] py-[13px] rounded-[10px] text-[15px] font-semibold border border-[rgba(255,255,255,0.2)] cursor-pointer hover:bg-[rgba(255,255,255,0.12)] transition-colors">
                ▶ Free Demo Class
              </button>
            </div>

            <div className="flex flex-wrap gap-9 mt-10">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <div className="text-[22px] font-bold text-[#60a5fa] font-['Space_Mono',monospace]">{v}</div>
                  <div className="text-[12px] text-[rgba(255,255,255,0.45)] mt-[3px]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead Form */}
          <div className="bg-white rounded-[20px] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-[11px] font-['Space_Mono',monospace] text-[#aaa]">get_free_roadmap.py</span>
            </div>
            <div className="bg-[#0a0f1e] rounded-[8px] px-4 py-3 mb-5 font-['Space_Mono',monospace] text-[12px] text-[#60a5fa] leading-[1.8]">
              <span className="text-[#888]"># Fill in your details below</span><br />
              <span className="text-[#60a5fa]">learner</span> = ML<span className="text-[#f59e0b]">Engineer</span>()<br />
              <span className="text-[#60a5fa]">learner</span>.get_roadmap()
            </div>

            {[
              ["Full Name", "text", "Sneha Kulkarni"],
              ["Mobile Number", "tel", "+91 9876543210"],
              ["Email", "email", "sneha@email.com"],
            ].map(([label, type, ph]) => (
              <div key={label as string} className="mb-4">
                <label className="text-[12px] font-semibold text-[#555] block mb-[5px]">{label}</label>
                <input type={type as string} placeholder={ph as string} className="w-full px-[14px] py-[11px] rounded-[8px] border-[1.5px] border-[#e0e2ea] text-[14px] outline-none text-[#333] box-border focus:border-[#1d4ed8] transition-colors" />
              </div>
            ))}

            <div className="mb-4">
              <label className="text-[12px] font-semibold text-[#555] block mb-[5px]">Your Goal</label>
              <select className="w-full px-[14px] py-[11px] rounded-[8px] border-[1.5px] border-[#e0e2ea] text-[14px] text-[#333] bg-white focus:border-[#1d4ed8]">
                <option>Get an ML Engineer Role</option>
                <option>Switch to Data Science</option>
                <option>Break into AI Research</option>
                <option>Build AI Products</option>
                <option>Upskill / Learn for Fun</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="text-[12px] font-semibold text-[#555] block mb-[5px]">Experience Level</label>
              <select className="w-full px-[14px] py-[11px] rounded-[8px] border-[1.5px] border-[#e0e2ea] text-[14px] text-[#333] bg-white">
                <option>Complete Beginner</option>
                <option>Know Basic Python & Stats</option>
                <option>Intermediate — Want to Level Up</option>
              </select>
            </div>

            <button className="w-full bg-[#1d4ed8] text-white py-[14px] rounded-[10px] text-[15px] font-bold border-none cursor-pointer hover:bg-[#1e40af] transition-colors font-['Space_Mono',monospace]">
              run(get_roadmap) →
            </button>
            <p className="text-center text-[11px] text-[#bbb] mt-3">Free · No spam · Expert callback in 2 hrs</p>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#050d1a] py-[10px] px-6 overflow-hidden">
        <div className="max-w-[1140px] mx-auto flex items-center gap-4">
          <span className="bg-[#1d4ed8] text-white text-[11px] font-bold px-[10px] py-[3px] rounded-[4px] whitespace-nowrap font-['Space_Mono',monospace]">LIVE</span>
          <div className="flex gap-9 overflow-hidden">
            {[
              "New ML batch starting Apr 5 — 48 seats remaining 🧠",
              "Sneha K. placed at PhonePe (₹22 LPA) — Zero to Hero batch",
              "Free Kaggle challenge every Tuesday — Join now",
              "LLM fine-tuning workshop — this Saturday 11AM IST",
            ].map((t, i) => (
              <span key={i} className="text-[13px] text-[rgba(255,255,255,0.75)] whitespace-nowrap">
                <FaBell size={11} className="mr-[5px] align-middle opacity-60" />{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 24px" }}>

        {/* BATCH DATES */}
        <section className="py-10">
          <div className="bg-white rounded-[20px] border border-[#e4e5ea] px-8 py-6">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-5 font-['Space_Mono',monospace]">
              📅 Upcoming Batch Dates
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {EXAM_DATES.map((d, i) => (
                <div key={i} className="text-center">
                  <div className="text-[13px] font-bold text-[#1a3fa8] font-['Space_Mono',monospace] mb-1">{d.date}</div>
                  <div className="text-[12px] text-[#666] leading-[1.4]">{d.event}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="py-[48px]">
          <div className="text-center mb-12">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-[10px] font-['Space_Mono',monospace]">Our Programs</p>
            <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.5rem)] text-[#111] mb-[14px] tracking-[-0.04em]">Machine Learning Courses</h2>
            <p className="text-[#777] text-[15px] max-w-[520px] mx-auto leading-[1.65]">
              Pick your track — whether you want to build ML systems, work with LLMs, win on Kaggle, or deploy models to production.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(265px,1fr))] gap-6">
            {COURSES.map((c, i) => (
              <div key={i} className="bg-white rounded-[18px] overflow-hidden border border-[#e4e5ea] hover:-translate-y-1 transition-transform duration-200 cursor-pointer">
                <div className="px-6 pt-6 pb-5" style={{ background: c.color }}>
                  <span className="bg-[rgba(255,255,255,0.18)] text-white text-[11px] font-bold px-[10px] py-[4px] rounded-[20px] inline-block mb-3">{c.tag}</span>
                  <h3 className="font-['Space_Mono',monospace] text-[15px] font-bold text-white leading-[1.4] tracking-[-0.02em]">{c.title}</h3>
                  <div className="flex gap-4 mt-[14px]">
                    <span className="text-[12px] text-[rgba(255,255,255,0.65)]">⏱ {c.duration}</span>
                    <span className="text-[12px] text-[rgba(255,255,255,0.65)]">📡 {c.mode}</span>
                  </div>
                </div>
                <div className="px-6 pt-5 pb-6">
                  <ul className="list-none mb-5 p-0">
                    {c.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-[#444] mb-2">
                        <FaCheckCircle size={13} color={c.color} /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between">
                    <button className="text-white px-[18px] py-[10px] rounded-[10px] text-[13px] font-semibold border-none cursor-pointer" style={{ background: c.color }}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK STRIP */}
        <section className="pb-10">
          <div className="bg-white rounded-[20px] border border-[#e4e5ea] px-8 py-7">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-6 font-['Space_Mono',monospace]">
              🛠 Tools & Frameworks You'll Master
            </p>
            <div className="flex flex-wrap gap-3">
              {STACK_ICONS.map((s, i) => (
                <span
                  key={i}
                  className="px-[14px] py-[7px] rounded-[8px] text-[12px] font-bold font-['Space_Mono',monospace] text-white"
                  style={{ background: s.color + "ee" }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FREE RESOURCES */}
        <section className="pb-12">
          <div className="bg-[linear-gradient(135deg,#050d1a,#0a1a3a)] rounded-[24px] px-[40px] py-[48px] border border-[rgba(96,165,250,0.15)] relative overflow-hidden">
            <div className="absolute -top-[40px] -right-[40px] w-[250px] h-[250px] rounded-full bg-[rgba(26,63,168,0.2)]" />
            <div className="absolute bottom-6 right-10 text-[rgba(96,165,250,0.07)] font-['Space_Mono',monospace] text-[11px] leading-[2] pointer-events-none hidden lg:block">
              <div>from sklearn.ensemble import</div>
              <div>&nbsp;&nbsp;GradientBoostingClassifier</div>
              <div>model = GradientBoostingClassifier()</div>
              <div>model.fit(X_train, y_train)</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
              <div>
                <p className="text-[12px] font-bold tracking-[0.12em] text-[#60a5fa] uppercase mb-[10px] font-['Space_Mono',monospace]">100% Free</p>
                <h2 className="font-['Space_Mono',monospace] text-[clamp(1.6rem,2.5vw,2rem)] text-white mb-[14px] tracking-[-0.03em]">
                  Free ML Resources
                </h2>
                <p className="text-[rgba(255,255,255,0.6)] text-[15px] leading-[1.75]">
                  Not sure which track is right for you? Start with our free resources — no login required. Gauge your math readiness, explore algorithms, and run your first ML model before you commit.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-[14px]">
                {RESOURCES.map((r, i) => (
                  <div key={i} className="bg-[rgba(255,255,255,0.06)] rounded-[16px] px-[16px] py-[18px] border border-[rgba(255,255,255,0.1)] flex flex-col gap-[10px] cursor-pointer hover:-translate-y-[3px] hover:shadow-lg transition-all duration-300">
                    <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center" style={{ background: r.color + "30" }}>
                      <r.icon size={18} color={r.color} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-white mb-[3px]">{r.label}</div>
                      <div className="text-[12px] text-[rgba(255,255,255,0.5)]">{r.desc}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[12px] font-semibold mt-[2px]" style={{ color: r.color }}>
                      Access Free <FaArrowRight size={11} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="pb-12">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-[10px] font-['Space_Mono',monospace]">What You'll Learn</p>
            <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.4rem)] text-[#111] tracking-[-0.04em]">Curriculum Overview</h2>
          </div>
          <div className="bg-white rounded-[20px] border border-[#e4e5ea] overflow-hidden">
            <div className="flex border-b border-[#e4e5ea]">
              {CURR_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 px-4 py-4 text-[13px] font-semibold cursor-pointer border-none whitespace-nowrap
                    ${activeTab === t ? "bg-[#1a3fa8] text-white font-['Space_Mono',monospace]" : "bg-white text-[#555] hover:bg-[#eff6ff]"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {CURRICULUM_DATA[activeTab].map((row, i) => (
                <div key={i} className={`flex gap-3 px-7 py-4 border-b border-[#f0f1f5] ${i % 2 === 0 ? "md:border-r border-[#f0f1f5]" : ""}`}>
                  <FaTerminal size={15} color="#1a3fa8" className="mt-[2px] flex-shrink-0" />
                  <div>
                    <div className="text-[11px] font-bold text-[#aaa] uppercase tracking-[0.08em] mb-[3px]">{row.label}</div>
                    <div className="text-[14px] font-medium text-[#111]">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MENTORS */}
        <section className="pb-12">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-[10px] font-['Space_Mono',monospace]">Learn From The Best</p>
            <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.4rem)] text-[#111] tracking-[-0.04em]">Expert ML Instructors</h2>
          </div>
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {MENTORS.map((m, i) => (
              <div key={i} className="bg-white rounded-[18px] px-5 py-7 text-center border border-[#e4e5ea] hover:-translate-y-1 transition-transform duration-200">
                <div className="w-[72px] h-[72px] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-[22px] font-bold font-['Space_Mono',monospace]" style={{ background: m.color }}>
                  {m.initials}
                </div>
                <h4 className="font-bold text-[15px] text-[#111] mb-1">{m.name}</h4>
                <p className="text-[12px] font-semibold mb-1" style={{ color: m.color }}>{m.role}</p>
                <p className="text-[12px] text-[#888] leading-[1.5]">{m.specialty}</p>
                <div className="mt-3 flex justify-center gap-[2px]">
                  {[...Array(5)].map((_, s) => <FaStar key={s} size={12} fill="#f5a623" color="#f5a623" />)}
                </div>
              </div>
            ))}
          </div> */}
        </section>

        {/* TOPPERS */}
        <section className="pb-12">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-[10px] font-['Space_Mono',monospace]">Success Stories</p>
            <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.4rem)] text-[#111] tracking-[-0.04em]">Our Students Are Building & Earning</h2>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOPPERS.map((t, i) => (
              <div key={i} className="bg-white rounded-[18px] p-7 border border-[#e4e5ea]">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[38px] text-[#1a3fa8] leading-[1] font-['Space_Mono',monospace]">&quot;</div>
                  <span className="bg-[#eff6ff] text-[#1a3fa8] text-[11px] font-bold px-[10px] py-[4px] rounded-[20px] font-['Space_Mono',monospace]">{t.tag}</span>
                </div>
                <p className="text-[14px] text-[#555] leading-[1.75] mb-5">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#f0f1f5]">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#1a3fa8] text-white flex items-center justify-center font-bold text-[16px]">{t.name[0]}</div>
                  <div>
                    <div className="font-bold text-[14px] text-[#111]">{t.name}</div>
                    <div className="text-[12px] text-[#888]">{t.role}</div>
                  </div>
                  <span className="ml-auto bg-[#eff6ff] text-[#1a3fa8] text-[10px] font-bold px-2 py-[3px] rounded-[20px]">{t.batch}</span>
                </div>
              </div>
            ))}
          </div> */}
        </section>

        {/* FAQs */}
        <section className="pb-20">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold tracking-[0.12em] text-[#1a3fa8] uppercase mb-[10px] font-['Space_Mono',monospace]">Got Questions?</p>
            <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.4rem)] text-[#111] tracking-[-0.04em]">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-[780px] mx-auto">
            {FAQS.map((f, i) => (
              <div key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)} className="bg-white rounded-[14px] mb-2.5 border border-[#e4e5ea] overflow-hidden cursor-pointer">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-[14px] font-semibold text-[#111] pr-5">{f.q}</span>
                  <FaChevronDown size={16} color="#888" className={`flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                {openFaq === i && (
                  <div className="px-6 pt-4 pb-5 text-[14px] text-[#666] leading-[1.75] border-t border-[#f0f1f5]">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER CTA */}
      <div className="relative bg-[linear-gradient(135deg,#050d1a,#0a1a3a)] px-6 py-20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute bottom-8 left-12 text-[rgba(96,165,250,0.06)] font-['Space_Mono',monospace] text-[12px] leading-[2] pointer-events-none hidden lg:block text-left">
          <div>while not_hired:</div>
          <div>&nbsp;&nbsp;train()</div>
          <div>&nbsp;&nbsp;evaluate()</div>
          <div>&nbsp;&nbsp;iterate()</div>
        </div>
        <div className="relative py-4">
          <h2 className="font-['Space_Mono',monospace] text-[clamp(1.8rem,3vw,2.5rem)] text-white mb-3 tracking-[-0.04em]">
            Your ML Journey Starts <span className="text-[#60a5fa] italic">Now</span>
          </h2>
          <p className="text-[15px] text-[rgba(255,255,255,0.55)] mb-8">
            Join 1,22,000+ engineers who learned ML and landed their dream AI roles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#1d4ed8] text-white px-8 py-3 rounded-[10px] text-[15px] font-bold border-none cursor-pointer hover:bg-[#1e40af] transition-colors">
              Start Free Trial
            </button>
            <button className="bg-[rgba(255,255,255,0.07)] text-white px-8 py-3 rounded-[10px] text-[15px] font-semibold border border-[rgba(255,255,255,0.2)] cursor-pointer hover:bg-[rgba(255,255,255,0.12)] transition-colors">
              Download Syllabus PDF
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}