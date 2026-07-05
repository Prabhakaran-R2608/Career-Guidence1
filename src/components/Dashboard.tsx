import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  FileText,
  Code,
  Target,
  MessageSquare,
  Award,
  TrendingUp,
  Flame,
  Bell,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { StudentProfile, Notification } from '../types';

interface DashboardProps {
  profile: StudentProfile;
  notifications: Notification[];
  onMarkNotificationRead: (id: string) => void;
  onChangeTab: (tab: string) => void;
}

export default function Dashboard({ profile, notifications, onMarkNotificationRead, onChangeTab }: DashboardProps) {
  // Mock data for beautiful history trend chart
  const performanceTrend = [
    { name: 'Week 1', coding: 10, aptitude: 40, interview: 20 },
    { name: 'Week 2', coding: 30, aptitude: 60, interview: 40 },
    { name: 'Week 3', coding: 45, aptitude: 75, interview: 55 },
    { name: 'Week 4', coding: 65, aptitude: 82, interview: 80 },
  ];

  const codingByDiff = [
    { name: 'Easy', value: profile?.codingProgress?.byDifficulty?.Easy ?? 2, color: '#10b981' },
    { name: 'Medium', value: profile?.codingProgress?.byDifficulty?.Medium ?? 1, color: '#f59e0b' },
    { name: 'Hard', value: profile?.codingProgress?.byDifficulty?.Hard ?? 0, color: '#ef4444' },
  ];

  // Radar data for career skill match metrics
  const skillDistribution = [
    { subject: 'System Design', value: 65 },
    { subject: 'Front End', value: 85 },
    { subject: 'Back End', value: 75 },
    { subject: 'Algorithms', value: 50 },
    { subject: 'Logical', value: 80 },
    { subject: 'Verbal', value: 70 },
  ];

  // Helper to suggest AI feedback
  const getAIRecommendation = () => {
    if (!profile) return "";
    if ((profile.placementReadiness ?? 0) < 40) {
      return "Unlock your placement roadmap! Begin by completing the AI Career Guidance Quiz to outline targeted skills.";
    }
    if ((profile.resumeScore ?? 0) < 70) {
      return "Your resume score is currently holding back your readiness. Upload your CV to the AI Resume Analyzer to fix 3 key format issues.";
    }
    if ((profile.codingProgress?.solvedCount ?? 0) < 3) {
      return "Algorithmic skills represent a major industry filter. Solve today's 'Two Sum' or 'Valid Parentheses' javascript challenge.";
    }
    return "Outstanding progress! Your placement readiness is over 75%. We recommend running a Technical Mock Interview to evaluate real-time communication scores.";
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Welcome Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            Welcome Back, Student!
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 3 }}
            >
              👋
            </motion.span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track your daily career milestones and collaborate in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Daily Streak Indicator */}
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-amber-400 text-sm font-semibold">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span>{profile?.dailyStreak ?? 0} Day Streak</span>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 px-4 py-2 rounded-xl text-xs font-mono text-slate-400 backdrop-blur-md">
            Readiness: <span className="text-cyan-400 font-bold">{profile?.placementReadiness ?? 0}%</span>
          </div>
        </div>
      </div>

      {/* Stats Cards Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Resume */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onChangeTab('resume')}
          className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 cursor-pointer flex items-center gap-4 relative overflow-hidden"
        >
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Resume score</div>
            <div className="text-2xl font-extrabold text-white mt-1">{profile?.resumeScore ?? 0}/100</div>
            <div className="text-xs text-blue-400 mt-1 flex items-center gap-1">
              Optimize Now <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Card 2: Coding */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onChangeTab('coding')}
          className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 cursor-pointer flex items-center gap-4 relative overflow-hidden"
        >
          <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Problems Solved</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {profile?.codingProgress?.solvedCount ?? 0} / {profile?.codingProgress?.totalCount ?? 0}
            </div>
            <div className="text-xs text-violet-400 mt-1 flex items-center gap-1">
              Open Code Arena <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Card 3: Aptitude */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onChangeTab('aptitude')}
          className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 cursor-pointer flex items-center gap-4 relative overflow-hidden"
        >
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Aptitude Score</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {(profile?.aptitudeAnalytics?.solvedCount ?? 0) > 0 
                ? `${Math.round(((profile?.aptitudeAnalytics?.correctCount ?? 0) / (profile?.aptitudeAnalytics?.solvedCount ?? 1)) * 100)}%` 
                : 'Not Taken'}
            </div>
            <div className="text-xs text-amber-400 mt-1 flex items-center gap-1">
              Practice Quizzes <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* Card 4: Interview */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => onChangeTab('interview')}
          className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 cursor-pointer flex items-center gap-4 relative overflow-hidden"
        >
          <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Interview score</div>
            <div className="text-2xl font-extrabold text-white mt-1">
              {(profile?.interviewScore ?? 0) > 0 ? `${profile.interviewScore}/100` : 'Not evaluated'}
            </div>
            <div className="text-xs text-pink-400 mt-1 flex items-center gap-1">
              Simulate Session <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Placement Readiness Circular Gauge & Chart Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Overall Gauge + AI Advice */}
        <div className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800/80 backdrop-blur-xl flex flex-col justify-between space-y-6">
          <h3 className="text-lg font-bold text-slate-200">Placement Readiness</h3>
          
          <div className="flex flex-col items-center py-4 relative">
            {/* Visual Gauge */}
            <div className="w-40 h-40 rounded-full border-4 border-slate-800 flex items-center justify-center relative shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <div 
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin" 
                style={{ animationDuration: '6s' }}
              />
              <div className="text-center">
                <span className="text-4xl font-extrabold text-white font-mono">{profile?.placementReadiness ?? 0}%</span>
                <span className="block text-[10px] uppercase text-slate-500 tracking-wider font-bold mt-1">Complete</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-850 text-sm space-y-2 relative backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <Brain className="w-4 h-4" /> AI Recommendation
            </div>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              {getAIRecommendation()}
            </p>
          </div>
        </div>

        {/* Right: Charts Panels */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/20 p-6 rounded-2xl border border-slate-800">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300">Aesthetic Coding Progress</h4>
            <div className="h-60 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={codingByDiff}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {codingByDiff.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b', borderRadius: '8px' }} 
                    itemStyle={{ color: '#94a3b8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend */}
              <div className="flex flex-col gap-2 ml-4">
                {codingByDiff.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-400 font-medium">{d.name}: {d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300">Skill Alignment Mapping</h4>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillDistribution}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" style={{ fontSize: '10px' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" />
                  <Radar name="Active Metrics" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.15} />
                  <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#1e293b' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Action Center & Notification Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Action center */}
        <div className="lg:col-span-2 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-200">Recommended Placement Milestones</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Career Quiz</h4>
                  <p className="text-xs text-slate-500">Determine best-fit job roles and certification roadmaps.</p>
                </div>
              </div>
              <button 
                onClick={() => onChangeTab('guidance')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200 border border-slate-700 cursor-pointer"
              >
                Start Quiz
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Optimize CV keywords</h4>
                  <p className="text-xs text-slate-500">Inject React hooks, Express endpoints, and MLOps tags.</p>
                </div>
              </div>
              <button 
                onClick={() => onChangeTab('resume')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200 border border-slate-700 cursor-pointer"
              >
                Scan Resume
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">LeetCode Coding Sandbox</h4>
                  <p className="text-xs text-slate-500">Practice stacks, trees, dynamic programming and solve test cases.</p>
                </div>
              </div>
              <button 
                onClick={() => onChangeTab('coding')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg text-slate-200 border border-slate-700 cursor-pointer"
              >
                Code Now
              </button>
            </div>
          </div>
        </div>

        {/* Notifications feed */}
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 backdrop-blur-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" /> Notifications
          </h3>

          <div className="space-y-3 overflow-y-auto max-h-72 pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                No active updates or system alerts at this moment.
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`p-3.5 rounded-xl border transition-all ${
                    notif.isRead 
                      ? 'bg-slate-950/20 border-slate-800/40 text-slate-500' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-xs font-bold ${notif.isRead ? 'text-slate-400' : 'text-slate-200'}`}>
                      {notif.title}
                    </h4>
                    {!notif.isRead && (
                      <button 
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Mark Read
                      </button>
                    )}
                  </div>
                  <p className="text-xs mt-1.5 leading-relaxed font-light">
                    {notif.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
