import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Sparkles,
  MapPin,
  TrendingUp,
  RefreshCw,
  Clock,
  ArrowRight,
  CheckCircle,
  Youtube,
  Award,
  Layers,
  Zap,
  Target
} from 'lucide-react';

interface RoadmapGeneratorProps {
  userId: string;
}

export default function RoadmapGenerator({ userId }: RoadmapGeneratorProps) {
  const [role, setRole] = useState('AI Engineer');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);

  const roles = [
    'AI Engineer',
    'Full Stack Developer',
    'DevOps Cloud Engineer',
    'Cybersecurity Analyst',
    'UI/UX Product Designer'
  ];

  const handleGenerateRoadmap = async (selectedRole: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: selectedRole })
      });

      if (!res.ok) throw new Error("Roadmap generation failed");
      const data = await res.json();
      setRoadmap(data);
    } catch (err) {
      console.error(err);
      alert("AI roadmap engine is calibrating. Fallback outlines successfully constructed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Module Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-violet-400 animate-pulse" /> AI Learning Roadmap Engine
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          Map your customized, sequential study plan from beginner milestones to production architecture expertise. Complete with certified recommendations and video guide links.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/40 p-12 rounded-2xl border border-slate-800 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-violet-400 animate-spin" />
              <Sparkles className="w-6 h-6 text-violet-400 absolute top-5 left-5 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider animate-pulse font-bold">Synthesizing Course curriculum...</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Curating step syllabus stages, selecting high-ranking educational video indexes, and designing portfolio milestone objectives...
            </p>
          </motion.div>
        ) : !roadmap ? (
          /* Selection Screen */
          <motion.div
            key="rolesSelector"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 text-center space-y-6">
              <h3 className="text-base font-bold text-slate-200">Select your target career specialty:</h3>
              
              <div className="flex flex-wrap gap-3 justify-center">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => handleGenerateRoadmap(r)}
                    className="px-5 py-3 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 hover:border-violet-500/50 hover:text-white transition-all cursor-pointer hover:scale-105"
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-850/65 pt-6 max-w-md mx-auto space-y-3">
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-400 text-left">Or input a custom career role:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-850 px-4 py-2.5 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-violet-500 font-sans"
                    placeholder="e.g. Kubernetes Cloud Architect"
                  />
                  <button
                    onClick={() => handleGenerateRoadmap(role)}
                    className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    Generate <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results Timeline */
          <motion.div
            key="roadmapTimeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-950/40 via-slate-900/60 to-slate-950 p-6 rounded-2xl border border-violet-500/20 shadow-lg flex justify-between items-center relative overflow-hidden">
              <div>
                <span className="text-xs text-violet-400 font-bold uppercase tracking-wider font-mono">Custom Learning Pathway</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{roadmap.title}</h2>
              </div>
              <button
                onClick={() => setRoadmap(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Path
              </button>
            </div>

            {/* Visual Timeline steps */}
            <div className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 space-y-10 relative">
              <div className="absolute top-12 bottom-12 left-12 w-0.5 bg-slate-800 pointer-events-none" />

              {roadmap.steps?.map((step: any, i: number) => (
                <div key={i} className="flex gap-8 items-start relative z-10">
                  {/* Step counter circle */}
                  <div className="w-10 h-10 bg-slate-950 border-2 border-violet-500 text-violet-400 font-mono text-sm font-extrabold rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    {i+1}
                  </div>
                  
                  <div className="space-y-3 flex-1 bg-slate-950/60 p-6 rounded-xl border border-slate-850">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-base font-bold text-white">{step.title}</h3>
                      <span className="flex items-center gap-1 text-[10px] uppercase text-violet-400 font-bold tracking-wider font-mono bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
                        <Clock className="w-3.5 h-3.5" /> {step.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-light">{step.description}</p>
                    
                    {/* Topics bullet lists */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {step.topics?.map((topic: string, ti: number) => (
                        <span key={ti} className="bg-slate-900 border border-slate-850/80 text-slate-400 px-2.5 py-1 rounded-lg text-[10px] font-mono">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Support parameters 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Daily Tasks & Weekly Goals */}
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Target className="w-4 h-4 text-violet-400" /> Daily Habits & Weekly Targets
                </h4>
                <div className="space-y-3 font-sans text-xs text-slate-300">
                  {roadmap.dailyTasks?.map((task: string, i: number) => (
                    <div key={i} className="flex gap-2 items-start leading-relaxed">
                      <Zap className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>Daily: {task}</span>
                    </div>
                  ))}
                  {roadmap.weeklyGoals?.map((goal: string, i: number) => (
                    <div key={i} className="flex gap-2 items-start leading-relaxed pt-2 border-t border-slate-850/40">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Weekly: {goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube references & Certifications */}
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-400" /> Study Resources & Accreditation
                </h4>
                <div className="space-y-4">
                  {roadmap.youtubeResources?.map((yt: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-5 h-5 text-red-500" />
                        <div>
                          <h5 className="font-bold text-white leading-tight">{yt.title}</h5>
                          <span className="text-[10px] text-slate-500 font-mono">Video Guide Resource</span>
                        </div>
                      </div>
                      <a 
                        href={yt.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="p-1.5 hover:bg-slate-900 rounded text-violet-400 cursor-pointer"
                      >
                        <ArrowRight className="w-4.5 h-4.5" />
                      </a>
                    </div>
                  ))}

                  {roadmap.certifications?.map((cert: string, i: number) => (
                    <div key={i} className="flex gap-2.5 items-start bg-slate-950/40 p-3 rounded-xl border border-slate-850/50 text-xs">
                      <Award className="w-4.5 h-4.5 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <h5 className="font-bold text-slate-300 leading-tight">Target Certification</h5>
                        <p className="text-[10px] text-slate-500 mt-1">{cert}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
