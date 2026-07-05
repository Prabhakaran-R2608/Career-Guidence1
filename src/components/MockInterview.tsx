import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Mic,
  MicOff,
  Video,
  VideoOff,
  HelpCircle,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Shield,
  Play,
  RotateCcw,
  Volume2
} from 'lucide-react';

interface MockInterviewProps {
  userId: string;
  onUpdateProfile: (updatedFields: any) => void;
}

export default function MockInterview({ userId, onUpdateProfile }: MockInterviewProps) {
  const [interviewType, setInterviewType] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answer, setAnswer] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(false);
  
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const interviewQuestions: Record<string, string[]> = {
    Technical: [
      "Explain the differences between REST APIs and GraphQL interfaces. When would you prefer one over the other?",
      "How does JavaScript manage asynchronous operations internally? What is the role of the event loop and task queues?",
      "Describe how you would design a highly scalable caching system for a high-traffic e-commerce storefront."
    ],
    Coding: [
      "How do you implement a function to check if a binary tree is a valid Binary Search Tree (BST) or not?",
      "Explain how a sliding window algorithm optimizes finding the longest substring without repeating characters.",
      "How does a Stack data structure help resolve Valid Parentheses in O(N) linear time?"
    ],
    HR: [
      "Tell me about a time you faced a serious technical disagreement with a peer. How did you resolve it?",
      "Why do you want to join our engineering division? How does your career alignment support our growth?",
      "Describe a challenging system failure or bug you encountered, and list your exact steps to troubleshoot and patch it."
    ],
    "System Design": [
      "Design a real-time collaborative task board similar to Jira or Trello. How do you handle high frequency edits?",
      "How would you architect a global URL shortener service like Bit.ly? List your database selections.",
      "Detail your strategy for deploying microservices with safe zero-downtime rolling updates."
    ]
  };

  const activeQuestions = interviewQuestions[interviewType || 'Technical'] || [];
  const currentQuestion = activeQuestions[currentQuestionIdx] || "Prepare yourself for the interview.";

  const handleStartInterview = (type: string) => {
    setInterviewType(type);
    setStarted(true);
    setCurrentQuestionIdx(0);
    setAnswer('');
    setResult(null);
    setEvaluating(false);
  };

  const handleToggleMic = () => {
    setIsRecording(!isRecording);
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Please record or write your answer first!");
      return;
    }

    setEvaluating(true);

    try {
      const res = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: interviewType,
          question: currentQuestion,
          answer
        })
      });

      if (!res.ok) throw new Error("Evaluation connection error");
      const data = await res.json();
      setResult(data);

      // Refresh student profile metrics
      fetch(`/api/profile/${userId}`)
        .then(r => r.json())
        .then(profileData => onUpdateProfile(profileData))
        .catch(err => console.error(err));

    } catch (err) {
      console.error(err);
      alert("Failed to compute AI evaluation. Reverting to smart metrics.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setAnswer('');
      setResult(null);
    } else {
      // Completed full track
      alert("Fabulous job! You have completed all questions in this track.");
      setInterviewType(null);
      setStarted(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Module Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3">
          <MessageSquare className="w-8 h-8 text-pink-400 animate-pulse" /> AI Recruiter Mock Interview
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          Choose a mock interview track. Speak or type your answers to our AI Recruiting bot. Receive a thorough breakdown of technical accuracy, grammar, communication, and confidence.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!started ? (
          /* Selection Screen */
          <motion.div
            key="typeSelect"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {Object.keys(interviewQuestions).map((type) => (
              <div
                key={type}
                onClick={() => handleStartInterview(type)}
                className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/80 cursor-pointer hover:border-pink-500/50 hover:bg-slate-900/40 transition-all flex flex-col justify-between h-48 relative overflow-hidden"
              >
                <div className="absolute inset-y-0 right-0 w-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-xl text-pink-400 w-fit">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{type} Interview</h3>
                  <p className="text-xs text-slate-500">Practice questions on specialized topics.</p>
                </div>
              </div>
            ))}
          </motion.div>
        ) : evaluating ? (
          /* Evaluating Screen */
          <motion.div
            key="evaluating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-slate-900/40 p-12 rounded-2xl border border-slate-800 text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-pink-400 animate-spin" />
              <Sparkles className="w-6 h-6 text-pink-400 absolute top-5 left-5 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wider animate-pulse">Computing AI Scorecard...</h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mx-auto">
              Scoring grammar complexity, logical response structuring, confidence pitch intervals, and keyword matching...
            </p>
          </motion.div>
        ) : !result ? (
          /* Interview Q&A screen */
          <motion.div
            key="qaSession"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {/* Left Column: AI Recruiter Face Cards */}
            <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4">
                <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">RECRUITER ONLINE</span>
              </div>
              
              <div className="space-y-4 py-6">
                <div className="w-24 h-24 rounded-full bg-pink-500/10 border border-pink-500/20 mx-auto flex items-center justify-center text-pink-400 relative shadow-inner">
                  <Cpu className="w-10 h-10 animate-pulse" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">AI Coach Sophia</h4>
                  <p className="text-[10px] text-slate-500 font-mono">Senior Placement Recruiter</p>
                </div>
              </div>

              {/* Simulated Camera Video Feeds buttons */}
              <div className="flex gap-2 justify-center py-2 z-10 relative">
                <button 
                  onClick={() => setVideoActive(!videoActive)} 
                  className={`p-3 rounded-xl border transition-all ${
                    videoActive ? 'bg-pink-500 border-pink-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {videoActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setMicActive(!micActive)} 
                  className={`p-3 rounded-xl border transition-all ${
                    micActive ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Active Question Prompt & Answering boxes */}
            <div className="md:col-span-2 bg-slate-900/30 p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6">
              {/* Question container */}
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                  <span className="text-[10px] font-mono text-pink-400 font-bold uppercase tracking-wider">
                    {interviewType} Session | Question {currentQuestionIdx + 1} of {activeQuestions.length}
                  </span>
                </div>
                <p className="text-slate-100 text-sm md:text-base font-bold leading-relaxed font-sans">
                  "{currentQuestion}"
                </p>
              </div>

              {/* Custom Speech waveform visualizer */}
              {isRecording && (
                <div className="h-12 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center gap-1 overflow-hidden px-4">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [8, Math.floor(Math.random() * 32) + 12, 8] }}
                      transition={{ repeat: Infinity, duration: 0.6 + i*0.05 }}
                      className="w-1 bg-pink-500 rounded-full"
                    />
                  ))}
                </div>
              )}

              {/* Text Input area */}
              <div className="space-y-2">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Click the microphone to simulate audio recording, or type your comprehensive technical response directly into this input panel..."
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-850 p-4 rounded-xl text-xs md:text-sm text-slate-300 focus:outline-none focus:border-pink-500 leading-relaxed font-sans resize-none"
                />
              </div>

              {/* Buttons panel */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={handleToggleMic}
                  className={`px-5 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isRecording 
                      ? 'bg-rose-500 border-rose-400 text-white animate-pulse' 
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isRecording ? "Stop Simulated Voice Capture" : "Speak / Simulated Audio Capture"}
                </button>

                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                >
                  Submit Answer to AI Recruiter
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Evaluation scorecard screen */
          <motion.div
            key="scorecard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 animate-fade-in"
          >
            {/* Header Score Card */}
            <div className="bg-gradient-to-r from-pink-950/40 via-slate-900/60 to-slate-950 p-8 rounded-2xl border border-pink-500/20 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div className="absolute inset-y-0 right-0 w-64 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              <div>
                <span className="text-xs text-pink-400 font-bold uppercase tracking-wider font-mono">Mock Round Performance audit</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">AI Recruiter Sophia Scorecard</h2>
                <div className="text-xs text-slate-500 mt-2 font-mono">
                  Feedback on: "{currentQuestion.substring(0, 45)}..."
                </div>
              </div>

              {/* Circle Gauge */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center relative bg-slate-950">
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-pink-500" style={{ transform: `rotate(${result.score * 3.6}deg)` }} />
                  <span className="text-2xl font-black text-white font-mono">{result?.score}/100</span>
                </div>
                <span className="text-[10px] uppercase text-slate-500 tracking-wider font-bold mt-2">Composite Score</span>
              </div>
            </div>

            {/* Granular metrics radar-split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Granular Scores */}
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Award className="w-4 h-4 text-pink-400" /> Scoring Metrics Breakdown
                </h4>
                
                <div className="space-y-3 font-mono text-xs text-slate-400">
                  <div>
                    <div className="flex justify-between mb-1 text-[11px] font-bold">
                      <span>COMMUNICATION CLARITY</span>
                      <span className="text-pink-400">{result.evaluation?.scores?.communication}/10</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${result.evaluation?.scores?.communication * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-[11px] font-bold">
                      <span>TECHNICAL REASONING</span>
                      <span className="text-pink-400">{result.evaluation?.scores?.technical}/10</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${result.evaluation?.scores?.technical * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-[11px] font-bold">
                      <span>CONFIDENCE & PITCH</span>
                      <span className="text-pink-400">{result.evaluation?.scores?.confidence}/10</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${result.evaluation?.scores?.confidence * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-[11px] font-bold">
                      <span>COMPOSITION & GRAMMAR</span>
                      <span className="text-pink-400">{result.evaluation?.scores?.grammar}/10</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${result.evaluation?.scores?.grammar * 10}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 text-[11px] font-bold">
                      <span>ALGORITHMIC PROBLEM SOLVING</span>
                      <span className="text-pink-400">{result.evaluation?.scores?.problemSolving}/10</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${result.evaluation?.scores?.problemSolving * 10}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Feedback Summary */}
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-pink-400" /> Structural Performance Review
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {result.evaluation?.feedback}
                </p>
              </div>
            </div>

            {/* Weakness analysis & optimization suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/20 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-rose-400">Critical Weakness Points identified</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{result.evaluation?.weaknessAnalysis}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono text-emerald-400">Sophia's Recommendations</h4>
                <div className="space-y-2 text-[11px] text-slate-400">
                  {result.evaluation?.suggestions?.map((sug: string, si: number) => (
                    <div key={si} className="flex gap-2 items-start leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => handleStartInterview(interviewType || 'Technical')}
                className="px-5 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer"
              >
                Reset Answer
              </button>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                Proceed to Next Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
