import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  FileText,
  Code,
  Target,
  MessageSquare,
  Users,
  Shield,
  BookOpen,
  LogOut,
  Bell,
  Menu,
  X,
  Lock,
  Mail,
  User,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';

// Component Imports
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CareerGuidance from './components/CareerGuidance';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import CodingPractice from './components/CodingPractice';
import AptitudeSystem from './components/AptitudeSystem';
import MockInterview from './components/MockInterview';
import CollaborativeWorkspace from './components/CollaborativeWorkspace';
import RoadmapGenerator from './components/RoadmapGenerator';
import AdminPanel from './components/AdminPanel';
import ChatbotAssistant from './components/ChatbotAssistant';

import { User as UserType, StudentProfile, Notification } from './types';

export default function App() {
  // Authentication & session states
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'register'>('signin');
  
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Authentication form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');

  // Notifications feed
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      userId: 'demo-student',
      title: 'Welcome to CareerPilot AI!',
      message: 'Launch your Career Guidance assessment to map your tailored learning roadmap.',
      isRead: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 'notif-2',
      userId: 'demo-student',
      title: 'AI Coach Assignment',
      message: 'Coach Sophia is online and ready to review your mock technical and HR rounds.',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ]);

  // Load session from localStorage on mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('careerpilot_user');
    const cachedProfile = localStorage.getItem('careerpilot_profile');
    if (cachedUser) {
      const u = JSON.parse(cachedUser);
      setCurrentUser(u);
      setActiveTab('dashboard');
      if (cachedProfile) {
        setStudentProfile(JSON.parse(cachedProfile));
      } else {
        // Fetch fresh profile
        fetch(`/api/profile/${u.id}`)
          .then(res => res.json())
          .then(prof => {
            setStudentProfile(prof);
            localStorage.setItem('careerpilot_profile', JSON.stringify(prof));
          })
          .catch(err => console.error(err));
      }
    }
  }, []);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const endpoint = authTab === 'signin' ? '/api/auth/login' : '/api/auth/register';
    const payload = authTab === 'signin' 
      ? { email, password } 
      : { email, password, name };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Authentication failed");
      }

      const data = await res.json();
      setCurrentUser(data.user);
      setStudentProfile(data.profile);
      
      localStorage.setItem('careerpilot_user', JSON.stringify(data.user));
      if (data.profile) {
        localStorage.setItem('careerpilot_profile', JSON.stringify(data.profile));
      }

      setAuthModalOpen(false);
      setEmail('');
      setPassword('');
      setName('');
      
      // Auto routing
      setActiveTab(data.user.role === 'admin' ? 'admin' : 'dashboard');
    } catch (err: any) {
      setAuthError(err.message || "Connection fault");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setStudentProfile(null);
    localStorage.removeItem('careerpilot_user');
    localStorage.removeItem('careerpilot_profile');
    setActiveTab('landing');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    setStudentProfile(updatedProfile);
    localStorage.setItem('careerpilot_profile', JSON.stringify(updatedProfile));
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: <TrendingUp className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'guidance', label: 'Career AI Quiz', icon: <Brain className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'roadmap', label: 'Study Roadmaps', icon: <BookOpen className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'resume', label: 'Resume ATS scan', icon: <FileText className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'coding', label: 'LeetCode Arena', icon: <Code className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'aptitude', label: 'Aptitude Prep', icon: <Target className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'interview', label: 'AI Mock Recruiter', icon: <MessageSquare className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'workspace', label: 'WS Collaboration', icon: <Users className="w-4.5 h-4.5" />, roles: ['student', 'admin'] },
    { id: 'admin', label: 'Admin Terminal', icon: <Shield className="w-4.5 h-4.5 text-rose-400" />, roles: ['admin'] },
  ];

  const renderActiveModule = () => {
    if (activeTab === 'landing' || !currentUser) {
      return <LandingPage onGetStarted={() => setAuthModalOpen(true)} />;
    }

    if (!studentProfile) {
      return (
        <div className="flex-1 flex items-center justify-center min-h-[60vh] px-4">
          <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center gap-4 text-center max-w-sm">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-sm font-semibold text-white">Synchronizing Workspace Profile</h3>
            <p className="text-xs text-slate-400">Retrieving personalized assessment metrics and milestones...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            profile={studentProfile!}
            notifications={notifications}
            onMarkNotificationRead={handleMarkNotificationRead}
            onChangeTab={setActiveTab}
          />
        );
      case 'guidance':
        return (
          <CareerGuidance
            userId={currentUser.id}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'resume':
        return (
          <ResumeAnalyzer
            userId={currentUser.id}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'coding':
        return (
          <CodingPractice
            userId={currentUser.id}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'aptitude':
        return (
          <AptitudeSystem
            userId={currentUser.id}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'interview':
        return (
          <MockInterview
            userId={currentUser.id}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'workspace':
        return (
          <CollaborativeWorkspace
            userId={currentUser.id}
            userName={currentUser.name}
          />
        );
      case 'roadmap':
        return <RoadmapGenerator userId={currentUser.id} />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard profile={studentProfile!} notifications={notifications} onMarkNotificationRead={handleMarkNotificationRead} onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-slate-100 flex flex-col font-sans overflow-x-hidden relative">
      {/* Mesh Gradient Background Decoration */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[-150px] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none z-0"></div>

      {/* Upper Navigation Header */}
      <nav className="bg-slate-900/40 border-b border-slate-800/50 px-6 py-4 flex justify-between items-center sticky top-0 z-40 backdrop-blur-xl">
        <div className="flex items-center gap-2 cursor-pointer z-10" onClick={() => setActiveTab(currentUser ? 'dashboard' : 'landing')}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] text-white">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">CareerPilot AI</span>
        </div>

        <div className="flex items-center gap-4 z-10">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-slate-400">Hi, <span className="font-bold text-slate-200 capitalize">{currentUser.name}</span></span>
                <span className="text-[10px] uppercase tracking-wider font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-2.5 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 hover:border-slate-700/80 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer backdrop-blur-md"
                title="Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 text-slate-400 lg:hidden cursor-pointer backdrop-blur-md"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Sign In <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>

      {/* Main Body Layout */}
      <div className="flex-1 flex relative">
        {/* Sidebar Left Drawer (Visible only when logged in) */}
        {currentUser && activeTab !== 'landing' && (
          <aside className={`w-64 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 absolute lg:relative inset-y-0 left-0 z-30 transition-all duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 bg-slate-900/90' : '-translate-x-full'
          }`}>
            <div className="space-y-6">
              <div className="flex justify-between items-center lg:hidden border-b border-slate-800/60 pb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {navigationItems
                  .filter(item => item.roles.includes(currentUser.role))
                  .map((item) => {
                    const active = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                        className={`w-full px-4 py-3 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer flex items-center gap-3 ${
                          active 
                            ? 'bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.08)] font-bold' 
                            : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-white'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-5 space-y-4">
              <div className="flex items-center gap-2.5 p-2 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 text-slate-950 font-bold flex items-center justify-center capitalize">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200 truncate capitalize leading-tight">{currentUser.name}</h4>
                  <span className="text-[9px] font-mono text-slate-400 leading-none">{currentUser.email}</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Core Content frame */}
        <main className="flex-1 overflow-y-auto">
          {currentUser && activeTab !== 'dashboard' && activeTab !== 'landing' && (
            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 -mb-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="group inline-flex items-center gap-2 px-4 py-2 bg-slate-900/60 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-slate-800/80 hover:border-slate-700/80 transition-all cursor-pointer shadow-md backdrop-blur-md"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                Back to Dashboard
              </button>
            </div>
          )}
          {renderActiveModule()}
        </main>
      </div>

      {/* Floating Chatbot Advisor (Visible when logged in) */}
      {currentUser && <ChatbotAssistant userId={currentUser.id} />}

      {/* Dynamic Slide-over Auth Modal Gate */}
      <AnimatePresence>
        {authModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-slate-900 max-w-sm w-full p-6 rounded-2xl border border-slate-800 space-y-4 relative text-left"
            >
              <button 
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-1 pb-2 border-b border-slate-850">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 w-fit mx-auto mb-2">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-base font-extrabold text-white">Join CareerPilot Workspace</h3>
                <p className="text-[11px] text-slate-500">Track and optimize your daily placement milestones.</p>
              </div>

              {/* Tabs selector */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-850">
                <button
                  onClick={() => { setAuthTab('signin'); setAuthError(''); }}
                  className={`py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    authTab === 'signin' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthTab('register'); setAuthError(''); }}
                  className={`py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                    authTab === 'register' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400'
                  }`}
                >
                  Register
                </button>
              </div>

              {authError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-[10px] text-rose-400 text-center font-mono leading-relaxed">
                  {authError}
                </div>
              )}

              {/* Form elements */}
              <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-xs">
                {authTab === 'register' && (
                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Full Name:</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute top-2.5 left-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 px-9 py-2.5 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-sans"
                        placeholder="e.g. Jane Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Email Address:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute top-2.5 left-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-9 py-2.5 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      placeholder="Jane.doe@college.edu"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold uppercase tracking-wider text-[9px]">Security Password:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute top-2.5 left-3.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-9 py-2.5 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  {authTab === 'signin' ? "Authenticate Account" : "Deploy Student Workspace"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
