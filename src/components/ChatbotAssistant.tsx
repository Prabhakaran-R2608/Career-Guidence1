import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Cpu,
  ArrowRight,
  TrendingUp,
  Brain
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  message: string;
}

interface ChatbotAssistantProps {
  userId: string;
}

export default function ChatbotAssistant({ userId }: ChatbotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', message: "Hi! I'm Sophia, your CareerPilot AI Advisor. Ask me anything about Resume ATS updates, Coding questions, Aptitude tips, or behavioral Interview Prep!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "How do I boost my resume ATS score?",
    "Tips for cracking Mock Interviews",
    "How to prepare for Aptitude rounds?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim() || loading) return;

    const userMsg = msgText.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', message: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          history: messages,
          message: userMsg
        })
      });

      if (!res.ok) throw new Error("Chat bot communication fault");
      const data = await res.json();

      setMessages(prev => [...prev, { sender: 'ai', message: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: 'ai', message: "My communication pipeline is currently calibrating. Try asking again in a brief second!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {!isOpen ? (
          /* Floating Action Bubble */
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-extrabold rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all relative group"
          >
            <MessageSquare className="w-6 h-6 fill-slate-950" />
            <Sparkles className="w-3.5 h-3.5 text-white absolute top-2 right-2 animate-pulse" />
            <span className="absolute right-16 bg-slate-900 text-slate-200 border border-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Sophia AI Coach
            </span>
          </motion.button>
        ) : (
          /* Floating Chat Window */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="w-80 md:w-96 h-[500px] bg-slate-950/95 border border-slate-800 rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-md relative"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-slate-900 px-4 py-3.5 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4.5 h-4.5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Coach Sophia</h4>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online Advisor
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-500 hover:text-white cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg, i) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={i} className={`flex gap-2.5 ${isUser ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                      isUser ? 'bg-slate-900 text-slate-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    }`}>
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 rounded-2xl inline-block max-w-[80%] leading-relaxed font-sans font-light ${
                      isUser ? 'bg-emerald-500 text-slate-950 font-semibold text-left' : 'bg-slate-900 border border-slate-850 text-slate-300'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex gap-2 text-slate-500 font-mono text-[10px] items-center">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <span>Sophia is writing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestions & Input Footer */}
            <div className="p-3 bg-slate-900/60 border-t border-slate-800 shrink-0 space-y-3">
              {/* Quick Prompt Pills */}
              {messages.length <= 2 && (
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p, pi) => (
                    <button
                      key={pi}
                      onClick={() => handleSendMessage(p)}
                      className="text-[10px] text-slate-400 border border-slate-800 hover:border-slate-700 bg-slate-950 px-2.5 py-1 rounded-lg text-left transition-colors cursor-pointer block"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}

              {/* Text Form */}
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} 
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Coach Sophia..."
                  className="flex-1 bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center cursor-pointer shadow disabled:opacity-40"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
