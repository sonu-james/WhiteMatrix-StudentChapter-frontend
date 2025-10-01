 "use client";
import React, { useEffect, useState } from "react";

// Dummy data
const modulesData = [
  { id: 1, title: "HTML & CSS Basics", description: "Intro to web design", status: "not-started", skill: "Frontend", level: "Beginner" },
  { id: 2, title: "JavaScript Fundamentals", description: "Core JS concepts", status: "not-started", skill: "Frontend", level: "Intermediate" },
  { id: 3, title: "React Basics", description: "Components & Props", status: "not-started", skill: "Frontend", level: "Intermediate" },
  { id: 4, title: "AWS Lambda Basics", description: "Backend fundamentals", status: "not-started", skill: "Backend", level: "Beginner" },
  { id: 5, title: "Advanced AWS LAmbda", description: "SQL & NoSQL", status: "not-started", skill: "Backend", level: "Intermediate" },
  { id: 6, title: "Advanced React & Performance", description: "Hooks, Context API, Performance Optimization", status: "not-started", skill: "Frontend", level: "Advanced" },
  { id: 7, title: "Advanced AWS LAmbda", description: "Scaling, Clustering, and Advanced APIs", status: "not-started", skill: "Backend", level: "Advanced" },
  { id: 8, title: "Fullstack Project", description: "Build a complete MERN app", status: "not-started", skill: "Fullstack", level: "Advanced" },
    { id: 8, title: "Fullstack Project", description: "Build a complete MERN app", status: "not-started", skill: "Fullstack", level: "Intermediate" },
  { id: 9, title: "Intro to Fullstack Development", description: "Overview of frontend, backend, and databases", status: "not-started", skill: "Fullstack", level: "Beginner" },
  
];

const studyPacksData = [
  { id: 1, title: "React Study Material PDF", pdfUrl: "/study-pack/WM React Study Material (1)", skill: "Frontend", level: "Beginner" },
  { id: 2, title: "React Study Material PDF", pdfUrl: "/study-pack/WM React Study Material (1)", skill: "Frontend", level: "Intermediate" },

  { id: 4, title: "AWS Lambda", pdfUrl: "/study-pack/AWS Lambda.pdf", skill: "Backend", level: "Beginner" },
  { id: 5, title: "AWS Lambda", pdfUrl: "/study-pack/AWS Lambda.pdf", skill: "Backend", level: "Intermediate" },
 

  // Advanced Study Packs
  { id: 6, title: "Advanced React Guide", pdfUrl: "/study-pack/WM React Study Material (1)", skill: "Frontend", level: "Advanced" },
  { id: 7, title: "Frontend System Design", pdfUrl: "/study-pack/WM React Study Material (1)", skill: "Frontend", level: "Advanced" },
  { id: 8, title: "Advanced AWS Lambda Tutorial", pdfUrl: "/study-pack/AWS Lambda.pdf", skill: "Backend", level: "Advanced" },
  { id: 9, title: "Backend Microservices", webUrl: "https://microservices.io/", skill: "Backend", level: "Advanced" },
  { id: 10, title: "Fullstack MERN Video Course", videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M", skill: "Fullstack", level: "Advanced" },
  { id: 11, title: "Fullstack Deployment Guide", webUrl: "https://vercel.com/docs", skill: "Fullstack", level: "Advanced" },
  { id: 12, title: "Fullstack Roadmap PDF", pdfUrl: "/study-pack/WM React Study Material (1)", skill: "Fullstack", level: "Beginner" },
  { id: 13, title: "AWS Lambda", pdfUrl: "/study-pack/AWS Lambda.pdf", skill: "Fullstack", level: "Beginner" },
  { id: 14, title: "Fullstack MERN Video Course", videoUrl: "https://youtu.be/dOVcFaYj_zA", skill: "Fullstack", level: "Intermediate" },
  { id: 15, title: "Fullstack Deployment Guide Beginner Level", webUrl: "https://www.codechef.com/roadmap/full-stack-development", skill: "Fullstack", level: "Intermediate" },
];

const assessmentsData = [
  { id: 1, title: "HTML/CSS Quiz", date: "2025-10-01", score: null, skill: "Frontend", level: "Beginner" },
  { id: 2, title: "JavaScript Test", date: "2025-10-15", score: null, skill: "Frontend", level: "Intermediate" },
  { id: 3, title: "AWS Lambda Quiz", date: "2025-10-20", score: null, skill: "Backend", level: "Beginner" },
   { id: 3, title: "AWS Lambda Quiz", date: "2025-10-20", score: null, skill: "Backend", level: "Intermediate" },
  { id: 4, title: "Advanced React Challenge", date: "2025-11-01", score: null, skill: "Frontend", level: "Advanced" },
  { id: 5, title: "Advanced Node.js Test", date: "2025-11-05", score: null, skill: "Backend", level: "Advanced" },
  { id: 6, title: "Fullstack Final Project", date: "2025-11-15", score: null, skill: "Fullstack", level: "Advanced" },
  { id: 7, title: "Fullstack Basics Quiz", date: "2025-10-25", score: null, skill: "Fullstack", level: "Beginner" },
    { id: 8, title: "Fullstack Final Project", date: "2025-11-15", score: null, skill: "Fullstack", level: "intermediate" },
];


export default function InternshipDashboard() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    skillLevel: "",
    track: "",
    linkedinUrl: "",
  });

  const [started, setStarted] = useState(false); // Control flow with Start button
  const [modules, setModules] = useState([]);
  
  useEffect(() => {
    const storedUser = sessionStorage.getItem("existingUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Step 1: Skill & Track selection screen
  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-teal-50 text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center text-cyan-600">
          WhiteMatrix Software Solutions - Tech Ascent Internship Program
        </h1>

        <div className="bg-white border border-cyan-300 rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Select Your Skill & Track
          </h2>

          {/* Skill Level */}
          <div className="mb-4 text-left relative">
            <label className="block mb-1 font-medium text-gray-700">Skill Level</label>
            <div className="relative">
              <select
                value={user.skillLevel}
                onChange={(e) => setUser({ ...user, skillLevel: e.target.value })}
                className="appearance-none w-full p-3 pr-10 rounded-lg border border-cyan-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 cursor-pointer"
              >
                <option value="">Select Skill Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▼</span>
            </div>
          </div>

          {/* Track */}
          <div className="mb-4 text-left relative">
            <label className="block mb-1 font-medium text-gray-700">Track of Interest</label>
            <div className="relative">
              <select
                value={user.track}
                onChange={(e) => setUser({ ...user, track: e.target.value })}
                className="appearance-none w-full p-3 pr-10 rounded-lg border border-cyan-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-300 cursor-pointer"
              >
                <option value="">Select Track</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">▼</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!user.skillLevel || !user.track) return;
              // Initialize modules based on selection
              const filtered = modulesData.filter(
                (m) => m.skill === user.track && m.level === user.skillLevel
              );
              setModules(filtered);
              setStarted(true); // Move to dashboard
            }}
            className="bg-gradient-to-r from-black to-cyan-400 text-white font-semibold px-6 py-2 rounded-full mt-3 transition-all duration-200 hover:scale-105 shadow-md"
          >
            Start Program
          </button>
        </div>
      </div>
    );
  }

  // Filter data based on user selection
  const filteredStudyPacks = studyPacksData.filter(
    (pack) => pack.skill === user.track && pack.level === user.skillLevel
  );
  const filteredAssessments = assessmentsData.filter(
    (a) => a.skill === user.track && a.level === user.skillLevel
  );

  const completedModules = modules.filter((m) => m.status === "complete").length;
  const totalModules = modules.length;
  const progress = totalModules ? Math.round((completedModules / totalModules) * 100) : 0;

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("existingUser");
    window.location.href = "/"; // redirect to login page
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen" style={{ backgroundColor: "rgba(168, 232, 232, 1)" }}>
      {/* Left Column */}
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 text-center relative border border-black/20">
          <img
            src={`https://ui-avatars.com/api/?name=${user.username}&background=14b8a6&color=fff`}
            alt="profile"
            className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-black"
          />
          <h2 className="text-xl font-semibold text-black">{user.username}</h2>
          <p className="text-black">{user.email}</p>
          <p className="text-black">{user.phone}</p>
          <div className="flex gap-2 mt-3 justify-center">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{user.skillLevel}</span>
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{user.track}</span>
          </div>

          <div className="mt-4">
            <button
              onClick={() => {
                setUser({ ...user, skillLevel: "", track: "" });
                setStarted(false);
              }}
              className="text-black hover:underline font-semibold mb-3"
            >
              Change Skill / Track
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-black to-cyan-400 text-white font-semibold px-4 py-2 rounded-full text-sm w-40 shadow-md hover:scale-105 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Study Packs */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-black/20">
  <h3 className="font-semibold mb-3 text-lg text-black">Study Packs</h3>
  <ul className="space-y-2">
    {filteredStudyPacks.map((pack) => (
      <li key={pack.id} className="flex justify-between items-center text-black">
        <span>{pack.title}</span>

        {pack.pdfUrl && pack.pdfUrl !== "#" ? (
          <a
            href={pack.pdfUrl}
            download
            className="text-cyan-600 hover:underline"
          >
            📄 Download
          </a>
        ) : pack.webUrl ? (
          <a
            href={pack.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            🌐 Website
          </a>
        ) : pack.videoUrl && pack.videoUrl !== "#" ? (
          <a
            href={pack.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:underline"
          >
            🎥 Video
          </a>
        ) : (
          <span className="text-gray-500 italic">Coming Soon</span>
        )}
      </li>
    ))}
  </ul>
</div>

      </div>

      {/* Middle Column */}
      <div className="md:col-span-2 space-y-6">
        {/* Progress / Roadmap */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-black/20">
          <h2 className="text-xl font-bold mb-3 text-black">Roadmap</h2>
          <div className="w-full bg-black rounded-full h-4 mb-4">
            <div className="bg-cyan-400 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-black mb-3">{progress}% Completed</p>

          {modules.map((m, index) => (
            <div
              key={m.id}
              className="flex justify-between items-center bg-cyan-200/20 p-3 rounded-md mt-3 hover:shadow-md transition-all duration-200 text-black"
            >
              <div>
                <h3 className="font-medium">{m.title}</h3>
                <p className="text-sm">{m.description}</p>
              </div>

              {/* Status Display & Update */}
              <div className="flex items-center gap-2">
                {m.status === "complete" && <span className="text-green-600 font-semibold">✔</span>}
                {m.status === "in-progress" && <span className="text-yellow-600 font-semibold">⏳</span>}
                {m.status === "not-started" && <span className="text-gray-600">Not Started</span>}

                {/* Dropdown to change status */}
             <select
  value={m.status}
  onChange={(e) => {
    const newModules = [...modules];
    newModules[index].status = e.target.value;
    setModules(newModules);
  }}
  className={`ml-2 p-2 rounded-full border border-cyan-300 bg-white text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 cursor-pointer
    ${m.status === "complete" ? "text-green-600" :
      m.status === "in-progress" ? "text-yellow-600" :
      "text-gray-600"
    }`}
>
  <option value="not-started">Not Started</option>
  <option value="in-progress">In Progress</option>
  <option value="complete">Complete</option>
</select>

              </div>
            </div>
          ))}
        </div>

        {/* Assessments */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-black/20">
          <h3 className="text-xl font-bold mb-3 text-black">Assessments</h3>
          <ul className="space-y-3">
            {filteredAssessments.map((a) => (
              <li key={a.id} className="flex justify-between items-center hover:bg-cyan-200/20 p-2 rounded-md transition-all duration-200 text-black">
                <span>{a.title} - {a.date}</span>
                {a.score !== null ? (
                  <span className="text-green-600 font-semibold">Score: {a.score}</span>
                ) : (
                  <span className="text-yellow-600 font-semibold">Upcoming</span>
                )}
              </li>
            ))}
          </ul>
        </div>

         {/* LinkedIn Integration */}
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-5 flex flex-col gap-2 border border-black/20">
          <h3 className="text-xl font-bold mb-3 text-black">LinkedIn Integration</h3>
          <p className="mb-2 break-all text-black">Profile: {user.linkedinUrl}</p>
          <div className="flex justify-start">
            {/* <button
              className="bg-gradient-to-r from-black to-cyan-400 text-white font-semibold px-4 py-3 rounded-full text-sm w-44 shadow-md hover:scale-105 transition-all duration-200"
              onClick={() => alert("Summary Generated: Passionate developer 🚀")}
            >
              Generate Summary
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
