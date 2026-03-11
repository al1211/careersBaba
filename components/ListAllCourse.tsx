"use client";
import { useState } from "react";
import {
  FaGraduationCap,
  FaBookOpen,
  FaLaptop,
  FaCode,
  FaBriefcase,
  FaCalculator,
  FaStethoscope,
  FaBalanceScale,
  FaMicroscope,
  FaPalette,
  FaChartLine,
  FaSchool,
  FaUserGraduate,
  FaDatabase
} from "react-icons/fa";
import { GoLaw } from "react-icons/go";
import { AiOutlineRobot } from "react-icons/ai";
import { MdPsychology } from "react-icons/md";
import { useRouter } from "next/navigation";

// Map string names to actual icons
const iconMap = {
  GraduationCap: FaGraduationCap,
  BookOpen: FaBookOpen,
  Laptop: GoLaw,
  Code: FaCode,
  Briefcase: FaBriefcase,
  Calculator: FaCalculator,
  Stethoscope: FaStethoscope,
  Scale: FaBalanceScale,
  Microscope: FaMicroscope,
  Palette: FaPalette,
  MachineLearning:AiOutlineRobot,
  cat:FaChartLine,
  faschool:FaSchool,
  faUserGraduated: FaUserGraduate,
  faDataBase:FaDatabase,
  AIML:MdPsychology
} as const;

type Category = {
  icon: keyof typeof iconMap;
  title: string;
  color: string;
  light: string;
};

const categories: Category[] = [
  { icon: "BookOpen", title: "UPSC", color: "#2D6A4F", light: "#eaf4ef" },
  { icon: "GraduationCap", title: "CUET", color: "#1B4FCC", light: "#eaeffd" },
  { icon: "GraduationCap", title: "MBA", color: "#FF6B35", light: "#fff3ee" },
  { icon: "Code", title: "Python", color: "#7B2FBE", light: "#f3eafa" },
  { icon: "MachineLearning", title: "Machine Learning", color: "#7B2FBE", light: "#f3eafa" },
  { icon: "AIML", title: "AI/ML", color: "#7B2FBE", light: "#f3eafa" },
  { icon: "Briefcase", title: "Govt Jobs", color: "#B5451B", light: "#fdf0ec" },
  { icon: "Calculator", title: "CA", color: "#0A7E8C", light: "#e6f6f7" },
  { icon: "faDataBase", title: "Data Science", color: "#1A6B8A", light: "#e8f4f8" },
  { icon: "faschool", title: "IX", color: "#A8325E", light: "#faedf3" },
  { icon: "faUserGraduated", title: "XI", color: "#A8325E", light: "#faedf3" },
  { icon: "faUserGraduated", title: "XI", color: "#A8325E", light: "#faedf3" },
  { icon: "faUserGraduated", title: "XII", color: "#A8325E", light: "#faedf3" }
];

export default function ListAllCourse(): JSX.Element {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const naviage=useRouter();

  const getDynamicRoute=(title:string)=>{
    naviage.push(`/${encodeURIComponent(title.toLowerCase().replace(" ",""))}`)
  }

  return (
    <div className=" bg-[#F7F5F0] flex flex-col items-center py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12 max-w-xl">
        <p className="font-sans font-medium text-[12px] tracking-widest text-gray-400 uppercase mb-3">
          Explore by Category
        </p>
        <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-gray-900 leading-tight">
          What are you <br />
          <span className=" text-[#FF6B35]">preparing for?</span>
        </h1>
        <p className=" font-light text-sm text-gray-600 mt-3 leading-relaxed">
          Choose your path — curated resources, expert guidance, and structured learning await.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4 w-full max-w-4xl">
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon];
          const isHovered = hovered === i;

          return (
            <div
              key={cat.title}
              className={`flex flex-col items-center gap-3 p-7 rounded-2xl border transition-transform duration-200 ease-out cursor-pointer ${
                isHovered ? "scale-[1.03] shadow-[0_12px_32px_rgba(0,0,0,0.1)]" : "shadow-sm"
              }`}
              style={{
                borderColor: isHovered ? cat.color : "#EBEBEB",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={()=>getDynamicRoute(cat.title)}
            >
              <div
                className={`w-13 h-13 flex items-center justify-center rounded-xl transition-colors duration-200`}
                
              >
                <Icon size={24} color={cat.color} />
              </div>
              <span className="text-center font-sans font-medium text-lg text-gray-900">
                {cat.title}
              </span>

             
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <p className="mt-10 text-xs text-gray-400 tracking-wide">
        10 categories · updated weekly
      </p>
    </div>
  );
}