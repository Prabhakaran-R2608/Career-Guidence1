import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Database,
  Cpu,
  Trophy,
  Activity,
  History,
  Terminal,
  Check,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { CodingQuestion } from '../types';

interface CodingPracticeProps {
  userId: string;
  onUpdateProfile: (updatedFields: any) => void;
}

export default function CodingPractice({ userId, onUpdateProfile }: CodingPracticeProps) {
  const [questions, setQuestions] = useState<CodingQuestion[]>([]);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);
  const [language, setLanguage] = useState('javascript');
  const [editorCodes, setEditorCodes] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [submissionsHistory, setSubmissionsHistory] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'problem' | 'submissions'>('problem');
  const [solvedQuestionIds, setSolvedQuestionIds] = useState<Set<string>>(new Set());
  const [lastAction, setLastAction] = useState<'run' | 'submit' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoriesList = [
    'All',
    'Arrays',
    'Strings',
    'Maths',
    'Stack',
    'Dynamic Programming',
    'Hash Tables',
    'Searching',
    'Trees',
    'Graphs',
    'Linked Lists'
  ];

  // Load questions and initial history on mount
  useEffect(() => {
    fetch('/api/coding/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        
        // Populate initial template boilerplate codes
        const initialCodes: Record<string, string> = {};
        data.forEach((q: CodingQuestion) => {
          initialCodes[q.id] = getBoilerplate(q.id, language);
        });
        setEditorCodes(initialCodes);
      })
      .catch(err => console.error("Error loading coding questions:", err));

    // Fetch submission history to identify completed questions
    fetch(`/api/coding/submissions/${userId}`)
      .then(res => res.json())
      .then(data => {
        const solved = new Set<string>();
        data.forEach((sub: any) => {
          if (sub.status === 'Accepted') {
            solved.add(sub.questionId);
          }
        });
        setSolvedQuestionIds(solved);
      })
      .catch(err => console.error("Error loading profile history:", err));
  }, [userId]);

  // Load single question history when expanded
  const loadQuestionHistory = (qId: string) => {
    fetch(`/api/coding/submissions/${userId}`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((s: any) => s.questionId === qId);
        setSubmissionsHistory(filtered);

        // Sync solved list in case of updates
        const solved = new Set<string>();
        data.forEach((sub: any) => {
          if (sub.status === 'Accepted') {
            solved.add(sub.questionId);
          }
        });
        setSolvedQuestionIds(solved);
      })
      .catch(err => console.error("Error refreshing question history:", err));
  };

  const getBoilerplate = (id: string, lang: string): string => {
    if (lang === 'javascript') {
      switch (id) {
        case 'code-1':
          return `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Your code here\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`;
        case 'code-2':
          return `/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    // Your code here\n    const stack = [];\n    const map = {\n        ')': '(',\n        '}': '{',\n        ']': '['\n    };\n    for (let char of s) {\n        if (char === '(' || char === '{' || char === '[') {\n            stack.push(char);\n        } else {\n            if (stack.pop() !== map[char]) return false;\n        }\n    }\n    return stack.length === 0;\n}`;
        case 'code-3':
          return `/**\n * @param {string} s\n * @return {number}\n */\nfunction lengthOfLongestSubstring(s) {\n    // Your code here\n    let max = 0;\n    let start = 0;\n    const map = {};\n    for (let i = 0; i < s.length; i++) {\n        const char = s[i];\n        if (map[char] >= start) {\n            start = map[char] + 1;\n        }\n        map[char] = i;\n        max = Math.max(max, i - start + 1);\n    }\n    return max;\n}`;
        case 'code-4':
          return `/**\n * @param {number} n\n * @return {number}\n */\nfunction climbStairs(n) {\n    // Your code here\n    if (n <= 2) return n;\n    let first = 1;\n    let second = 2;\n    for (let i = 3; i <= n; i++) {\n        let third = first + second;\n        first = second;\n        second = third;\n    }\n    return second;\n}`;
        case 'code-5':
          return `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nfunction reverseString(s) {\n    // Your code here\n    let left = 0;\n    let right = s.length - 1;\n    while (left < right) {\n        const temp = s[left];\n        s[left] = s[right];\n        s[right] = temp;\n        left++;\n        right--;\n    }\n}`;
        case 'code-6':
          return `/**\n * @param {number} n\n * @return {number}\n */\nfunction fib(n) {\n    // Your code here\n    if (n <= 1) return n;\n    let prev2 = 0, prev1 = 1;\n    for (let i = 2; i <= n; i++) {\n        let current = prev2 + prev1;\n        prev2 = prev1;\n        prev1 = current;\n    }\n    return prev1;\n}`;
        default:
          return `function solution() {\n    // Write your code here\n}`;
      }
    } else if (lang === 'python') {
      switch (id) {
        case 'code-1':
          return `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write Python solution here\n        pass`;
        case 'code-2':
          return `class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write Python solution here\n        pass`;
        default:
          return `def solution():\n    # Write Python solution here\n    pass`;
      }
    } else {
      return `// Template solution for ${lang}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    return 0;\n}`;
    }
  };

  const toggleQuestion = (qId: string) => {
    if (expandedQuestionId === qId) {
      setExpandedQuestionId(null);
    } else {
      setExpandedQuestionId(qId);
      setSubmissionResult(null);
      setLastAction(null);
      setActiveTab('problem');
      
      // Initialize code template if not already present
      setEditorCodes(prev => {
        if (!prev[qId]) {
          return {
            ...prev,
            [qId]: getBoilerplate(qId, language)
          };
        }
        return prev;
      });

      loadQuestionHistory(qId);
    }
  };

  const handleLanguageChange = (lang: string, qId: string) => {
    setLanguage(lang);
    setEditorCodes(prev => ({
      ...prev,
      [qId]: getBoilerplate(qId, lang)
    }));
    setSubmissionResult(null);
    setLastAction(null);
  };

  const handleCodeChange = (qId: string, val: string) => {
    setEditorCodes(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  const executeCodeAction = async (qId: string, isRunOnly: boolean) => {
    const activeCode = editorCodes[qId] || '';
    if (!activeCode.trim()) {
      alert("Please write some code before execution.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionResult(null);
    setLastAction(isRunOnly ? 'run' : 'submit');

    try {
      const res = await fetch('/api/coding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          questionId: qId,
          code: activeCode,
          language,
          isRunOnly
        })
      });

      if (!res.ok) throw new Error("Sandbox error");
      const data = await res.json();
      setSubmissionResult(data);

      // Trigger profile score update if solved successfully (on a real submit)
      if (!isRunOnly && data.submission?.status === 'Accepted') {
        // Update local solved list
        setSolvedQuestionIds(prev => {
          const next = new Set(prev);
          next.add(qId);
          return next;
        });

        fetch(`/api/profile/${userId}`)
          .then(r => r.json())
          .then(profileData => onUpdateProfile(profileData))
          .catch(err => console.error("Error updating score profile:", err));
      }

      loadQuestionHistory(qId);
    } catch (err) {
      console.error(err);
      alert("Pipeline compilation error. Resetting active runtime state.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTopicStats = (category: string) => {
    const filtered = category === 'All' 
      ? questions 
      : questions.filter(q => q.category === category);
    const total = filtered.length;
    const solved = filtered.filter(q => solvedQuestionIds.has(q.id)).length;
    return { total, solved };
  };

  const filteredQuestions = selectedCategory === 'All'
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Header section */}
      <div className="text-center mb-10">
        <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest font-mono">
          Interactive Coding Practice Sandbox
        </span>
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3 mt-1">
          <Code className="w-8 h-8 text-emerald-400 animate-pulse" /> Live DSA Coding Playground
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          Touch any challenge in the stack to expand the workspace directly inside it. Complete tasks to earn completion tick marks, and run code safely before submitting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Topic-Wise navigation */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> Topic / Category
            </h3>
            
            {/* Bento list of topics: compact grid on mobile/tablet, vertical list on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-2">
              {categoriesList.map((category) => {
                const isActive = selectedCategory === category;
                const { total, solved } = getTopicStats(category);
                const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
                
                return (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setExpandedQuestionId(null); // Collapse open details when switching categories
                    }}
                    className={`w-full text-left px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl border text-xs font-medium transition-all flex flex-col gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)] font-bold'
                        : 'bg-slate-950/40 border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full min-w-0 gap-1">
                      <span className="truncate">{category}</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold shrink-0">
                        {solved}/{total}
                      </span>
                    </div>
                    
                    {/* Compact progress bar */}
                    <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden shrink-0">
                      <div
                        className={`h-full transition-all duration-500 ${isActive ? 'bg-emerald-400' : 'bg-slate-700'}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Challenges stack Accordion */}
        <div className="lg:col-span-9 space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="bg-slate-950/40 border border-slate-850 p-12 rounded-2xl text-center">
              <p className="text-sm text-slate-500">No questions loaded under this topic category.</p>
            </div>
          ) : (
            filteredQuestions.map((q) => {
          const isExpanded = expandedQuestionId === q.id;
          const isSolved = solvedQuestionIds.has(q.id);
          const currentCode = editorCodes[q.id] || '';

          const difficultyColor = 
            q.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
            q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
            'text-rose-400 bg-rose-500/10 border-rose-500/20';

          return (
            <div
              key={q.id}
              className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? 'bg-slate-900/60 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.05)]' 
                  : 'bg-slate-950/40 border-slate-850 hover:border-slate-800'
              }`}
            >
              {/* Question summary / Clickable header */}
              <div
                onClick={() => toggleQuestion(q.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {/* Solved Status Indicator (The requested complete tick mark) */}
                  <div className="shrink-0">
                    {isSolved ? (
                      <div className="w-7 h-7 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <span className="text-[10px] font-mono font-bold text-emerald-500/80 uppercase tracking-widest block">
                      {q.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 mt-0.5 truncate pr-2">
                      {q.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Difficulty Tag */}
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${difficultyColor}`}>
                    {q.difficulty}
                  </span>

                  {/* Solved text badge */}
                  {isSolved && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/5 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                      Solved
                    </span>
                  )}

                  {/* Expand Chevron toggle */}
                  <div className="p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Collapsible workspace container */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-slate-850"
                  >
                    <div className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                      
                      {/* Left Pane: Problem specification */}
                      <div className="xl:col-span-5 bg-slate-950/40 border border-slate-850/80 rounded-xl flex flex-col justify-between overflow-hidden min-h-[500px]">
                        {/* Tab header */}
                        <div className="flex bg-slate-950 px-4 border-b border-slate-850">
                          <button
                            onClick={() => setActiveTab('problem')}
                            className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider font-mono cursor-pointer border-b-2 transition-all ${
                              activeTab === 'problem' ? 'border-emerald-500 text-white font-bold' : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            Problem Specs
                          </button>
                          <button
                            onClick={() => setActiveTab('submissions')}
                            className={`px-4 py-3.5 text-xs font-semibold uppercase tracking-wider font-mono cursor-pointer border-b-2 transition-all flex items-center gap-2 ${
                              activeTab === 'submissions' ? 'border-emerald-500 text-white font-bold' : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <History className="w-3.5 h-3.5" /> History ({submissionsHistory.length})
                          </button>
                        </div>

                        {/* Content display */}
                        <div className="flex-1 p-5 overflow-y-auto max-h-[460px] space-y-5">
                          {activeTab === 'problem' ? (
                            <div className="space-y-5">
                              {/* Title block */}
                              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                                  <BookOpen className="w-4 h-4 text-emerald-400" /> {q.title}
                                </h4>
                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${difficultyColor}`}>
                                  {q.difficulty}
                                </span>
                              </div>

                              {/* Descriptions paragraphs */}
                              <div className="text-slate-300 text-xs leading-relaxed space-y-3 font-light">
                                {q.description.split('\n').map((para, pi) => (
                                  <p key={pi}>{para}</p>
                                ))}
                              </div>

                              {/* Problem constraints */}
                              {q.constraints && q.constraints.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Constraints:</h5>
                                  <ul className="list-disc list-inside space-y-1 text-slate-500 text-[11px] font-mono leading-relaxed">
                                    {q.constraints.map((c, ci) => (
                                      <li key={ci}>{c}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Sample Examples */}
                              <div className="grid grid-cols-1 gap-3 pt-3 border-t border-slate-850">
                                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-850">
                                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Sample Input</div>
                                  <pre className="text-xs font-mono text-emerald-400 font-bold overflow-x-auto whitespace-pre-wrap">{q.sampleInput}</pre>
                                </div>

                                <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-850">
                                  <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Sample Output</div>
                                  <pre className="text-xs font-mono text-white overflow-x-auto whitespace-pre-wrap">{q.sampleOutput}</pre>
                                </div>
                              </div>
                            </div>
                          ) : (
                            /* Submissions lists for this specific question */
                            <div className="space-y-3">
                              {submissionsHistory.length === 0 ? (
                                <div className="text-center py-12 text-slate-500 text-xs">
                                  No code submissions yet. Click "Run Code" or "Submit Solution" below.
                                </div>
                              ) : (
                                submissionsHistory.map((sub, si) => (
                                  <div key={sub.id} className="bg-slate-950 p-4.5 rounded-xl border border-slate-850 flex justify-between items-center transition-all hover:bg-slate-900/40">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-xs font-bold ${sub.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                          {sub.status === 'Accepted' ? 'Accepted ✅' : sub.status}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-mono">({sub.language})</span>
                                      </div>
                                      <div className="text-[10px] text-slate-500 font-mono mt-1">
                                        Runtime: {sub.runtime}ms | Passed: {sub.passedCount}/{sub.totalCount} Cases
                                      </div>
                                    </div>
                                    <span className="text-[9px] text-slate-600 font-mono">{new Date(sub.submittedAt).toLocaleDateString()}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Pane: Code Editor + Separate Run and Submit Panels */}
                      <div className="xl:col-span-7 bg-slate-950/20 border border-slate-850 rounded-xl flex flex-col justify-between overflow-hidden min-h-[500px]">
                        {/* Editor metadata selector */}
                        <div className="flex justify-between items-center bg-slate-950 px-4 py-2.5 border-b border-slate-850 shrink-0">
                          <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                            <Code className="w-4 h-4 text-emerald-400" /> Nested Code Editor
                          </span>

                          <select
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value, q.id)}
                            className="bg-slate-900 border border-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg outline-none cursor-pointer focus:border-emerald-500/50"
                          >
                            <option value="javascript">JavaScript (Sandbox Compiler)</option>
                            <option value="python">Python (Simulation Mode)</option>
                            <option value="cpp">C++ (Simulation Mode)</option>
                            <option value="java">Java (Simulation Mode)</option>
                          </select>
                        </div>

                        {/* Interactive Textbox with Mock Line numbers */}
                        <div className="flex-1 flex bg-slate-950 relative min-h-[250px]">
                          <div className="w-10 bg-slate-950/60 text-right select-none pr-2.5 py-4 text-[10px] font-mono text-slate-600 border-r border-slate-850/40 flex flex-col">
                            {Array.from({ length: Math.max(12, currentCode.split('\n').length + 5) }).map((_, i) => (
                              <span key={i} className="leading-relaxed h-[1.375rem]">{i + 1}</span>
                            ))}
                          </div>

                          <textarea
                            value={currentCode}
                            onChange={(e) => handleCodeChange(q.id, e.target.value)}
                            className="flex-1 bg-transparent p-4 text-xs font-mono text-slate-200 outline-none leading-relaxed resize-none overflow-y-auto whitespace-pre font-light"
                            spellCheck="false"
                            style={{ tabSize: 4 }}
                          />
                        </div>

                        {/* Output console drawer with action-specific labels */}
                        <AnimatePresence>
                          {submissionResult && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-slate-950 border-t border-slate-850 p-4 font-mono text-xs max-h-48 overflow-y-auto shrink-0"
                            >
                              <div className="flex justify-between items-center mb-2 border-b border-slate-850/60 pb-1.5">
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Terminal className="w-3.5 h-3.5 text-emerald-400" /> 
                                  {lastAction === 'run' ? 'Sandbox Execution Output' : 'Official Pipeline Result'}
                                </span>
                                <button onClick={() => setSubmissionResult(null)} className="text-slate-500 hover:text-white cursor-pointer text-xs">✕</button>
                              </div>

                              {submissionResult.compilationError ? (
                                <div className="text-rose-400 font-bold space-y-1">
                                  <div>[Compilation Error]</div>
                                  <pre className="text-[10px] bg-rose-950/20 p-2 rounded border border-rose-950 text-slate-300 overflow-x-auto whitespace-pre-wrap">
                                    {submissionResult.compilationError}
                                  </pre>
                                </div>
                              ) : submissionResult.submission?.status === 'Accepted' || submissionResult.submission?.status === 'Passed' ? (
                                <div className="space-y-1.5">
                                  <div className="text-emerald-400 font-extrabold flex items-center gap-1.5 uppercase text-xs">
                                    <CheckCircle className="w-4 h-4 fill-emerald-500/10 text-emerald-400" /> 
                                    {lastAction === 'run' ? 'Run Passed (Sample Case Successful)' : 'Solution Accepted (All Suites Passed)'}
                                  </div>
                                  <div className="text-slate-400 text-[10px] leading-relaxed">
                                    {lastAction === 'run' ? (
                                      <span>Successfully processed test assertion input of question {q.id}.</span>
                                    ) : (
                                      <span>Congratulations! The submission has completed standard benchmarks successfully. Added to solved progress.</span>
                                    )}
                                  </div>
                                  <div className="text-slate-500 text-[10px] bg-slate-900/80 p-2 rounded font-mono">
                                    Passed Case Count: {submissionResult.submission?.passedCount}/{submissionResult.submission?.totalCount} | Execution Runtime: {submissionResult.submission?.runtime}ms
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-1.5">
                                  <div className="text-rose-400 font-bold flex items-center gap-1.5 text-xs">
                                    <XCircle className="w-4 h-4 text-rose-400" /> 
                                    {lastAction === 'run' ? 'Run Failed' : 'Submission Wrong Answer'}
                                  </div>
                                  <div className="text-slate-400 text-[10px]">
                                    Mismatch occurred. Ensure return statements are matching exact formatting structures.
                                  </div>
                                  <div className="text-rose-400/80 text-[10px] bg-rose-950/10 border border-rose-900/30 p-2 rounded">
                                    Passed: {submissionResult.submission?.passedCount || 0}/{submissionResult.submission?.totalCount || 1} test cases.
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Separate RUN and SUBMIT CTAs (The requested separation of Actions) */}
                        <div className="bg-slate-950 px-4 py-4 border-t border-slate-850 flex justify-between items-center gap-4 shrink-0">
                          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                            Verify with sample inputs before submitting.
                          </span>

                          <div className="flex gap-3 w-full sm:w-auto">
                            {/* Option 1: RUN CODE */}
                            <button
                              onClick={() => executeCodeAction(q.id, true)}
                              disabled={isSubmitting}
                              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isSubmitting && lastAction === 'run' ? (
                                <span className="flex items-center gap-1.5">Running...</span>
                              ) : (
                                <>
                                  <Play className="w-3.5 h-3.5 text-slate-400" /> Run Code
                                </>
                              )}
                            </button>

                            {/* Option 2: SUBMIT SOLUTION */}
                            <button
                              onClick={() => executeCodeAction(q.id, false)}
                              disabled={isSubmitting}
                              className="flex-1 sm:flex-none px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              {isSubmitting && lastAction === 'submit' ? (
                                <span className="flex items-center gap-1.5 font-bold text-slate-950">Submitting...</span>
                              ) : (
                                <>
                                  <Check className="w-4 h-4 text-slate-950 stroke-[3]" /> Submit Solution
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }))}
      </div>
      </div>
    </div>
  );
}
