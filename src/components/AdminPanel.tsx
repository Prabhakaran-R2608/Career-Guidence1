import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Users,
  Database,
  Code,
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  Activity,
  Award,
  BookOpen
} from 'lucide-react';

export default function AdminPanel() {
  const [stats, setStats] = useState<any>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Challenge form fields
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('Arrays');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [sampleInput, setSampleInput] = useState('');
  const [sampleOutput, setSampleOutput] = useState('');

  const loadStats = () => {
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    try {
      const res = await fetch('/api/admin/questions/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: desc,
          category,
          difficulty,
          inputFormat,
          outputFormat,
          sampleInput,
          sampleOutput,
          constraints: ["Time complexity: O(N)", "Space complexity: O(1)"],
          hiddenTestCases: [
            { input: sampleInput, output: sampleOutput }
          ]
        })
      });

      if (!res.ok) throw new Error("Add challenge error");
      
      // Reset form
      setTitle('');
      setDesc('');
      setInputFormat('');
      setOutputFormat('');
      setSampleInput('');
      setSampleOutput('');
      setShowAddForm(false);
      
      loadStats(); // reload
      alert("Successfully injected custom coding challenge!");
    } catch (err) {
      console.error(err);
      alert("Error injecting challenge to database.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 font-sans">
      {/* Module Title */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Shield className="w-8 h-8 text-rose-500 animate-pulse" /> CareerPilot Admin Control
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Audit database entities, monitor compiler telemetry, and inject curriculum coding challenges dynamically.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg cursor-pointer transition-all"
        >
          <Plus className="w-4 h-4" /> Inject Coding Problem
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">Students Registered</div>
            <div className="text-xl font-bold text-white mt-0.5">{stats?.totalUsers || 0}</div>
          </div>
        </div>

        <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">LeetCode Submissions</div>
            <div className="text-xl font-bold text-white mt-0.5">{stats?.totalSubmissions || 0}</div>
          </div>
        </div>

        <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">Aptitude Tests</div>
            <div className="text-xl font-bold text-white mt-0.5">{stats?.totalAptitudeResults || 0}</div>
          </div>
        </div>

        <div className="bg-slate-900/30 p-5 rounded-2xl border border-slate-800 flex items-center gap-4">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono font-bold">Resumes Audited</div>
            <div className="text-xl font-bold text-white mt-0.5">{stats?.totalResumes || 0}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Account Registry Table */}
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-850 pb-3">
            <Users className="w-4.5 h-4.5 text-rose-400" /> Student Registry database
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Email Address</th>
                  <th className="py-2.5">Role Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/40 text-slate-400 font-light">
                {stats?.users?.map((usr: any) => (
                  <tr key={usr.id} className="hover:bg-slate-950/20">
                    <td className="py-3 font-bold text-slate-300 capitalize">{usr.name}</td>
                    <td className="py-3 font-mono">{usr.email}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded border text-[10px] uppercase font-mono ${
                        usr.role === 'admin' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' : 'text-slate-400 bg-slate-900 border-slate-800'
                      }`}>
                        {usr.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Challenge Library Registry */}
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-850 pb-3">
            <Database className="w-4.5 h-4.5 text-rose-400" /> Injected Coding Problems Index
          </h3>

          <div className="space-y-3 overflow-y-auto max-h-72 pr-1 text-xs">
            {stats?.questions?.map((q: any) => (
              <div key={q.id} className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-850/60 flex justify-between items-center hover:border-slate-700 transition-colors">
                <div>
                  <h4 className="font-bold text-white leading-tight">{q.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">{q.category}</span>
                </div>
                <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded ${
                  q.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                  q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                  'text-rose-400 bg-rose-500/10 border-rose-500/20'
                }`}>
                  {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic challenge submission modal slide over */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              className="bg-slate-900 max-w-xl w-full p-6 rounded-2xl border border-slate-800 space-y-4 text-left my-8 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-1.5 border-b border-slate-850 pb-2">
                <Code className="w-5 h-5 text-rose-500 animate-pulse" /> Inject Custom Coding Challenge
              </h3>

              <form onSubmit={handleAddQuestion} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Title:</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500"
                      placeholder="e.g. Find Max Subarray"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Topic Category:</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500"
                      placeholder="e.g. Arrays, Strings, DP"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Description:</label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500 resize-none font-sans"
                    placeholder="Enter complete description and question objective..."
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Difficulty:</label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-slate-200 text-xs focus:outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Input Format:</label>
                    <input
                      type="text"
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500"
                      placeholder="e.g. Integers spaced on line 1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Sample Input:</label>
                    <textarea
                      value={sampleInput}
                      onChange={(e) => setSampleInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-mono resize-none"
                      placeholder="e.g. 2 7 11 15\n9"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Sample Output:</label>
                    <textarea
                      value={sampleOutput}
                      onChange={(e) => setSampleOutput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-rose-500 font-mono resize-none"
                      placeholder="e.g. 0 1"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 font-bold border border-slate-800 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl cursor-pointer shadow-md"
                  >
                    Inject Problem
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
