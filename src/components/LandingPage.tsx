import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  FileText,
  Code,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Cpu,
  Target,
  Sparkles,
  Zap,
  Globe,
  Award,
  ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: "AI Career Guidance",
      description: "Ask smart questions to analyze your strengths, weaknesses, and academic performance. Recommends full stack, AI, cybersecurity, and cloud roadmaps."
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: "AI Resume Analyzer",
      description: "Submit your resume text to compute real-time ATS scores, grammar checks, missing keywords, and recommended project insertions."
    },
    {
      icon: <Code className="w-6 h-6 text-violet-400" />,
      title: "LeetCode-Style Coding",
      description: "A functional online editor to compile, debug, and submit programming challenges against active test cases with real-time feedback."
    },
    {
      icon: <Target className="w-6 h-6 text-amber-400" />,
      title: "IndiaBix Aptitude Prep",
      description: "Interactive quantitative, logical, and verbal reasoning tests with timed sessions, randomized questions, and step-by-step mathematical guides."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
      title: "AI Mock Interviews",
      description: "Technical, coding, or HR interview simulator with an instant scorecard, feedback analysis, and speech-style waveform indicator."
    },
    {
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      title: "Collaborative Study Boards",
      description: "A real-time workspace with WebSockets where you and your peers manage prep tasks with drag-and-drop status cards and mouse cursor presence."
    }
  ];

  const plans = [
    {
      name: "Student Basic",
      price: "Free",
      features: [
        "Interactive Career Recommendation Quiz",
        "Limited Resume ATS Scans (3/mo)",
        "Standard Coding & Aptitude Problems",
        "Community Roadmap Templates",
        "WebSockets Workspace (1 Room)"
      ],
      isPopular: false,
      glow: "border-slate-800"
    },
    {
      name: "Placement Ready Pro",
      price: "$19/mo",
      features: [
        "Unlimited Career AI Recommendations",
        "Unlimited Detailed Resume ATS Audits",
        "Full Editor Support & All Hidden Test Cases",
        "Daily Mock Interviews with AI Coach",
        "Unlimited Collaborative Rooms & Team Boards",
        "Priority Support & Leaderboard Placement"
      ],
      isPopular: true,
      glow: "border-cyan-500/50 shadow-cyan-500/10 shadow-lg"
    },
    {
      name: "Institutional Enterprise",
      price: "Custom",
      features: [
        "Complete Batch Progress Trackers",
        "Custom Automated Test Generation",
        "Admin Analytics Panel for Colleges",
        "White-Labeled Portal Integrations",
        "Dedicated Server & SLA Support"
      ],
      isPopular: false,
      glow: "border-purple-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-100 overflow-x-hidden relative font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Neon Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          The Ultimate AI Career Preparation Suite
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent"
        >
          Navigate Your Career with <br />
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">CareerPilot AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Evaluate your resume, master algorithmic challenges, practice aptitude tests, and ace mock interviews with live guidance on our unified, collaborative platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center gap-2 text-lg group cursor-pointer hover:scale-[1.02]"
          >
            Launch Career Workspace
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#features"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 font-semibold rounded-xl border border-slate-800 hover:border-slate-700 transition-all text-lg text-center cursor-pointer backdrop-blur-md"
          >
            Explore AI Modules
          </a>
        </motion.div>

        {/* Floating Screen Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto border border-slate-800 bg-slate-900/40 p-2 rounded-2xl shadow-2xl backdrop-blur-md relative"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-950/80 rounded-t-xl border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-xs text-slate-500 font-mono ml-4">careerpilot-workspace-v1.0.0</span>
          </div>
          <div className="bg-slate-950/90 aspect-video rounded-b-xl flex flex-col justify-center items-center p-6 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            <Cpu className="w-16 h-16 text-cyan-400/80 mb-6 animate-pulse" />
            <h3 className="text-xl md:text-3xl font-bold mb-4 font-mono text-cyan-400">CONNECTING COLLABORATIVE PREP ROOMS</h3>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mb-6">
              Live updates via robust WebSocket pipelines sync mouse indicators, task boards, and code submissions instantly across prep teams.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-2 rounded-lg border border-slate-800 text-xs backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                Active Peers: 142
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 px-4 py-2 rounded-lg border border-slate-800 text-xs backdrop-blur-md">
                <Code className="w-4 h-4 text-cyan-400" />
                Submissions: 3,124 Today
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Feature Bento Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Engines Built for Placement Success</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need, completely integrated. Skip placeholder screens; every card links directly to functional tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: 'rgba(34,211,238,0.4)' }}
              className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="bg-slate-950/80 p-4 rounded-xl w-fit mb-6 border border-slate-800/80">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm mb-6">{f.description}</p>
              </div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold hover:text-cyan-300 transition-colors cursor-pointer group" onClick={onGetStarted}>
                Launch Module
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Stats Metrics */}
      <section className="bg-slate-900/20 py-16 border-y border-slate-800/60 z-10 relative backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-mono">92%</div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold">Resume Optimization Success</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-mono">1.2M+</div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold">Coding Submissions Evaluated</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-mono">14K+</div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold">Mock Interviews Logged</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2 font-mono">150+</div>
            <div className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-semibold">Partner Universities & Agencies</div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Straightforward, Affordable Pricing</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Kickstart your training with our fully featured free sandbox, or unlock maximum computational AI coaching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`bg-slate-900/40 p-8 rounded-2xl border ${p.glow} flex flex-col justify-between relative backdrop-blur-xl`}
            >
              {p.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-600 text-white font-bold px-4 py-1 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-cyan-500/20">
                  <Zap className="w-3.5 h-3.5 fill-white" /> Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-300 mb-2">{p.name}</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-extrabold text-white">{p.price}</span>
                </div>
                <hr className="border-slate-800/80 my-6" />
                <ul className="space-y-4 mb-8 text-sm">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onGetStarted}
                className={`w-full py-3.5 font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                  p.isPopular
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-[1.01]"
                    : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 relative z-10 border-t border-slate-900/80">
        <h2 className="text-3xl font-extrabold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 backdrop-blur-xl">
            <h4 className="text-lg font-bold mb-2">How real is the LeetCode evaluation engine?</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              It is 100% real. JavaScript and TypeScript submissions are compiled and executed in an isolated runtime right on our full stack Express server. Solutions are validated against multiple visible and hidden test cases, reporting compiler failures and raw performance execution speeds.
            </p>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 backdrop-blur-xl">
            <h4 className="text-lg font-bold mb-2">How does the real-time collaboration work?</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              We operate an active WebSocket router directly on port 3000 alongside Express. When you join a workspace room, a socket channel syncs your drag-and-drop task card adjustments, active list updates, and high-frequency mouse coordinates (`x, y`) with all peer connections in the same room.
            </p>
          </div>
          <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800/80 backdrop-blur-xl">
            <h4 className="text-lg font-bold mb-2">Does it support other resume files besides text pasting?</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes, you can drop any `.pdf`, `.docx`, or `.txt` file. The frontend reads the raw text securely in the browser using the HTML5 FileReader API and streams it to our backend Gemini optimizer, which protects your secret keys and prevents public exposures.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 text-center text-xs text-slate-500 relative z-10 bg-slate-950">
        <p className="mb-4">© 2026 CareerPilot AI, Inc. All rights reserved. Built using Gemini 3.5 & React full-stack architectures.</p>
        <p className="font-mono text-slate-600">WORKSPACE: cd4c1e4e-8bc9-4d7e-9a4a-44c784d10d3b</p>
      </footer>
    </div>
  );
}
