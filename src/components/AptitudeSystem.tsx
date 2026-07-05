import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  BookOpen,
  Award,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { AptitudeQuestion } from '../types';

interface AptitudeSystemProps {
  userId: string;
  onUpdateProfile: (updatedFields: any) => void;
}

export default function AptitudeSystem({ userId, onUpdateProfile }: AptitudeSystemProps) {
  const [questions, setQuestions] = useState<AptitudeQuestion[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<AptitudeQuestion[]>([]);
  
  const [quizActive, setQuizActive] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Fetch aptitude questions from backend API
  useEffect(() => {
    fetch('/api/aptitude/questions')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        const cats = Array.from(new Set(data.map((q: any) => q.category))) as string[];
        setCategories(cats);
      })
      .catch(err => console.error(err));
  }, []);

  // Timer interval
  useEffect(() => {
    if (quizActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && quizActive) {
      handleFinishQuiz();
    }
  }, [quizActive, timeLeft]);

  // Subcategories of selected Category
  const subcategoriesInSelected = selectedCategory
    ? (Array.from(new Set(questions.filter(q => q.category === selectedCategory).map(q => q.subcategory))).filter(Boolean) as string[])
    : [];

  const handleStartQuiz = () => {
    let pool = questions.filter(q => q.category === selectedCategory);
    if (selectedSubcategory) {
      pool = pool.filter(q => q.subcategory === selectedSubcategory);
    }
    
    // Shuffle and pick 10 questions (or less if pool is smaller)
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);
    setActiveQuestions(shuffled);
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(600);
    setQuizActive(true);
    setQuizFinished(false);
    setQuizResult(null);
  };

  const handleSelectAnswer = (qId: string, optionLetter: string) => {
    setUserAnswers({
      ...userAnswers,
      [qId]: optionLetter
    });
  };

  const handleFinishQuiz = async () => {
    setQuizActive(false);
    setQuizFinished(true);

    // Calculate score
    let correct = 0;
    activeQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    try {
      const res = await fetch('/api/aptitude/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          score: correct,
          category: selectedSubcategory ? `${selectedCategory} - ${selectedSubcategory}` : selectedCategory,
          totalQuestions: activeQuestions.length
        })
      });

      if (!res.ok) throw new Error("Aptitude result save failure");
      const savedResult = await res.json();
      setQuizResult(savedResult);

      // Trigger user profile reload
      fetch(`/api/profile/${userId}`)
        .then(r => r.json())
        .then(profileData => onUpdateProfile(profileData))
        .catch(err => console.error(err));

    } catch (err) {
      console.error(err);
      alert("Encountered problem saving quiz score to database.");
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Module Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          <Target className="w-8 h-8 text-amber-400 animate-pulse" /> IndiaBix Aptitude Prep Arena
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          Practice quantitative, logical reasoning, and verbal aptitude with 1000 timed questions structured by topic and complete step-by-step explanatory calculations.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          /* Main Category Selection Screen */
          <motion.div
            key="categorySelect"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="text-center pb-4">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">Step 1: Choose Arena Category</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const count = questions.filter(q => q.category === cat).length;
                return (
                  <div
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedSubcategory(null);
                    }}
                    className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 cursor-pointer hover:border-amber-500/50 hover:bg-slate-900/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)] transition-all flex flex-col justify-between h-48 group"
                  >
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 w-fit group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{cat}</h3>
                      <p className="text-xs text-slate-500">{count} Dynamic Mock Problems</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : !quizActive && !quizFinished ? (
          /* Subcategory / Type Selection Screen */
          <motion.div
            key="subcategorySelect"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Categories
              </button>
              <span className="text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">
                {selectedCategory} Topics
              </span>
            </div>

            <div className="text-center py-4 bg-slate-900/20 border border-slate-800/50 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">Select Practice Type</h2>
              <p className="text-xs text-slate-400 font-light">Choose a specific topic to launch a timed 10-question practice test, or select "Mixed Practice" below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mixed Option Card */}
              <div
                onClick={() => {
                  setSelectedSubcategory(null);
                  handleStartQuiz();
                }}
                className="p-5 rounded-2xl border cursor-pointer transition-all flex justify-between items-center group bg-amber-500/5 border-amber-500/20 hover:border-amber-500/50"
              >
                <div>
                  <h4 className="text-sm font-bold text-amber-400">Mixed Category Practice</h4>
                  <p className="text-xs text-slate-400 mt-1">Practice a randomized mix of all {selectedCategory} topics.</p>
                </div>
                <div className="p-2 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Subcategories (Types) list */}
              {subcategoriesInSelected.map((subcat) => {
                const count = questions.filter(q => q.category === selectedCategory && q.subcategory === subcat).length;
                return (
                  <div
                    key={subcat}
                    onClick={() => {
                      setSelectedSubcategory(subcat);
                      setTimeout(() => handleStartQuiz(), 50); // Small timeout to ensure state settles
                    }}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-900/20 cursor-pointer hover:border-slate-700 hover:bg-slate-900/40 transition-all flex justify-between items-center group"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{subcat}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{count} problems available</p>
                    </div>
                    <div className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 group-hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : quizActive ? (
          /* Quiz Round Screen */
          <motion.div
            key="quizActive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900/30 p-8 rounded-2xl border border-slate-800 space-y-6"
          >
            {/* Header: Progress & Timer */}
            <div className="flex justify-between items-center border-b border-slate-800/60 pb-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                {selectedCategory} {selectedSubcategory ? `› ${selectedSubcategory}` : '› Mixed'} | Question {currentIdx + 1} of {activeQuestions.length}
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold text-amber-400 font-mono shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                <Clock className="w-4 h-4 text-amber-500 animate-pulse" /> Timer: {formatTime(timeLeft)}
              </div>
            </div>

            {/* Current Question */}
            {activeQuestions[currentIdx] && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-mono text-slate-400 uppercase">
                    {activeQuestions[currentIdx].subcategory}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                    activeQuestions[currentIdx].difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    activeQuestions[currentIdx].difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {activeQuestions[currentIdx].difficulty}
                  </span>
                </div>
                <p className="text-slate-200 text-sm md:text-base font-semibold leading-relaxed">
                  {activeQuestions[currentIdx].question}
                </p>

                {/* Multiple choice options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeQuestions[currentIdx].options.map((opt, oi) => {
                    const optLetter = String.fromCharCode(65 + oi); // A, B, C, D
                    const isSelected = userAnswers[activeQuestions[currentIdx].id] === optLetter;

                    return (
                      <button
                        key={oi}
                        onClick={() => handleSelectAnswer(activeQuestions[currentIdx].id, optLetter)}
                        className={`p-4 rounded-xl text-left text-xs md:text-sm font-semibold border transition-all cursor-pointer flex items-center gap-3 w-full min-h-[50px] ${
                          isSelected 
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400' 
                            : 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono text-xs flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-400'
                        }`}>
                          {optLetter}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stepper Actions */}
            <div className="flex justify-between pt-6 border-t border-slate-800/60 mt-8">
              <button
                onClick={() => setCurrentIdx(c => Math.max(0, c - 1))}
                disabled={currentIdx === 0}
                className="px-5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-slate-300 rounded-xl cursor-pointer"
              >
                Previous
              </button>

              {currentIdx === activeQuestions.length - 1 ? (
                <button
                  onClick={handleFinishQuiz}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  Submit Quiz Answers
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(c => c + 1)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Quiz Results screen */
          <motion.div
            key="quizResult"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Summary Banner Card */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-950 p-8 rounded-2xl border border-amber-500/20 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="absolute inset-y-0 right-0 w-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">IndiaBix Quiz Complete</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {selectedSubcategory ? selectedSubcategory : selectedCategory} Scorecard
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  Review step-by-step mathematical calculations for optimization insights.
                </p>
              </div>

              {/* Progress gauge */}
              <div className="flex flex-col items-center shrink-0 bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
                <Award className="w-8 h-8 text-amber-400 mb-1" />
                <span className="text-2xl font-extrabold text-white font-mono">
                  {quizResult?.score} / {activeQuestions.length}
                </span>
                <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold mt-1">Correct Answers</span>
              </div>
            </div>

            {/* Step-by-Step Mathematical Explanation list */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-800/60 pb-3">
                <BookOpen className="w-4.5 h-4.5 text-amber-400" /> Review Explanations & Solutions
              </h3>

              {activeQuestions.map((q, i) => {
                const userAns = userAnswers[q.id];
                const correct = userAns === q.correctAnswer;

                return (
                  <div key={q.id} className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 space-y-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold font-mono text-slate-400">Question {i+1}</h4>
                        <span className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-[9px] font-mono text-slate-500 uppercase">
                          {q.subcategory}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-xs">
                        {correct ? (
                          <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Correct</span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-1"><XCircle className="w-4 h-4" /> Incorrect</span>
                        )}
                      </div>
                    </div>

                    <p className="text-slate-200 text-sm font-semibold">{q.question}</p>

                    {/* Options list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {q.options.map((opt, oi) => {
                        const optLetter = String.fromCharCode(65 + oi);
                        const isCorrectOpt = q.correctAnswer === optLetter;
                        const isUserOpt = userAns === optLetter;

                        return (
                          <div 
                            key={oi} 
                            className={`p-3 rounded-lg border ${
                              isCorrectOpt ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' :
                              isUserOpt ? 'bg-rose-500/10 border-rose-500/40 text-rose-400' :
                              'bg-slate-950 border-slate-850/60 text-slate-400'
                            }`}
                          >
                            <span className="font-bold mr-1.5">{optLetter}.</span> {opt}
                          </div>
                        );
                      })}
                    </div>

                    {/* Step-by-Step explanation */}
                    <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-850 space-y-2">
                      <div className="text-[10px] uppercase font-extrabold text-amber-500 tracking-wider">IndiaBix Step-by-Step Explanation</div>
                      <p className="text-slate-400 text-xs leading-relaxed font-light whitespace-pre-wrap">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setQuizFinished(false);
                }}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Category Hub
              </button>
              <button
                onClick={handleStartQuiz}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Re-Take Timed Session
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
