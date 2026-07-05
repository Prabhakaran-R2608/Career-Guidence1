import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  MessageSquare,
  Plus,
  Trash2,
  Send,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  MousePointer,
  Check,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { Task } from '../types';

interface CollaborativeWorkspaceProps {
  userId: string;
  userName: string;
}

export default function CollaborativeWorkspace({ userId, userName }: CollaborativeWorkspaceProps) {
  const [roomId, setRoomId] = useState('placement-cohort-2026');
  const [inRoom, setInRoom] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [peers, setPeers] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  
  // Modals/Forms
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState<'todo' | 'inprogress' | 'done'>('todo');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newCategory, setNewCategory] = useState('Coding');

  const wsRef = useRef<WebSocket | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Connect to WebSocket Server on room join
  const handleJoinRoom = () => {
    if (!roomId.trim()) return;

    // Build URL pointing to `/ws/collaboration`
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const wsUrl = `${protocol}${window.location.host}/ws/collaboration`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected successfully!");
      // Authenticate and join specific room
      ws.send(JSON.stringify({
        type: 'join_room',
        data: { userId, userName, roomId }
      }));
      setInRoom(true);
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;

        switch (type) {
          case 'presence_sync':
            // Filter out self so we don't draw our own cursor twice
            setPeers(data.filter((p: any) => p.userId !== userId));
            break;

          case 'tasks_sync':
            setTasks(data);
            break;

          case 'task_created':
            setTasks(prev => [...prev, data]);
            break;

          case 'task_updated':
            setTasks(prev => prev.map(t => t.id === data.id ? data : t));
            break;

          case 'task_deleted':
            setTasks(prev => prev.filter(t => t.id !== data.id));
            break;

          case 'chat_received':
            setChats(prev => [...prev, data]);
            break;
        }
      } catch (err) {
        console.error("Error reading socket payload:", err);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      setInRoom(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket socket fault:", err);
    };
  };

  const handleLeaveRoom = () => {
    wsRef.current?.close();
    setInRoom(false);
    setTasks([]);
    setPeers([]);
    setChats([]);
  };

  // Tracking cursor movements
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!inRoom || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    // Normalize coordinates (0 to 1 scale)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    wsRef.current.send(JSON.stringify({
      type: 'cursor_move',
      data: { x, y }
    }));
  };

  // Task Mutations
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'task_create',
      data: {
        title: newTitle,
        description: newDesc,
        status: newStatus,
        priority: newPriority,
        category: newCategory
      }
    }));

    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  const handleUpdateTaskStatus = (task: Task, newStat: 'todo' | 'inprogress' | 'done') => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'task_update',
      data: {
        id: task.id,
        status: newStat
      }
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'task_delete',
      data: { id: taskId }
    }));
  };

  // Collaborative Chat message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'workspace_chat',
      data: { message: chatMessage }
    }));

    setChatMessage('');
  };

  // Clean up socket on unmount
  useEffect(() => {
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 font-sans">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-cyan-400" /> WebSockets Study Canvas
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Coordinate placement preparation topics, share task cards, and see teammates' live mouse movements.
          </p>
        </div>

        {inRoom && (
          <div className="flex items-center gap-3">
            {/* Peer presence avatars list */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1.5" />
              <span className="text-xs font-mono text-slate-400 font-bold mr-2">Peers Online:</span>
              <div className="flex -space-x-2">
                {peers.map((p, pi) => (
                  <div
                    key={pi}
                    title={p.userName}
                    className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold flex items-center justify-center border border-slate-900 capitalize"
                  >
                    {p.userName.charAt(0)}
                  </div>
                ))}
                {peers.length === 0 && (
                  <span className="text-[10px] text-slate-500 font-mono">Alone</span>
                )}
              </div>
            </div>

            <button
              onClick={handleLeaveRoom}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 cursor-pointer"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!inRoom ? (
          /* Join Room Gate Screen */
          <motion.div
            key="roomGate"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-6 text-center mt-12"
          >
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 w-fit mx-auto">
              <Users className="w-8 h-8 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Join Collaborative Study Room</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Synchronize your LeetCode checklists, coding roadmaps, and mock targets with other students.
              </p>
            </div>

            <div className="space-y-3 text-left">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-400">Study Cohort Room ID:</label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 px-4 py-3 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                placeholder="e.g. general-prep"
              />
            </div>

            <button
              onClick={handleJoinRoom}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
            >
              Initiate Real-Time Socket Pipe <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          /* Active Collaborative Workspace Grid */
          <motion.div
            key="workspaceGrid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseMove={handleMouseMove}
            ref={containerRef}
            className="relative grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch select-none"
            style={{ minHeight: '600px' }}
          >
            {/* Draw active peer cursors dynamically */}
            {peers.map((p, pi) => {
              if (!p.cursor) return null;
              return (
                <div
                  key={pi}
                  className="absolute pointer-events-none z-50 text-xs text-white flex items-center gap-1 font-mono shrink-0 transition-all duration-75"
                  style={{
                    left: `${p.cursor.x * 100}%`,
                    top: `${p.cursor.y * 100}%`,
                  }}
                >
                  <MousePointer className="w-4.5 h-4.5 text-cyan-400 fill-cyan-400 shrink-0" />
                  <span className="bg-cyan-500 text-slate-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                    {p.userName}
                  </span>
                </div>
              );
            })}

            {/* Columns 1-3: Study Task Board columns */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ToDo column */}
              <div className="bg-slate-900/20 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h3 className="text-xs font-bold font-mono text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-slate-500" /> To Do (Pending)
                  </h3>
                  <button
                    onClick={() => { setNewStatus('todo'); setShowAddForm(true); }}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                  {tasks.filter(t => t.status === 'todo').map(task => (
                    <motion.div
                      layout
                      key={task.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                          {task.category}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-600 hover:text-rose-400 cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{task.description}</p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-850/40">
                        <span className="text-[9px] text-slate-600 font-mono">By {task.assignee}</span>
                        <button
                          onClick={() => handleUpdateTaskStatus(task, 'inprogress')}
                          className="p-1 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-emerald-400 cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* In Progress column */}
              <div className="bg-slate-900/20 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h3 className="text-xs font-bold font-mono text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" /> Active Prep
                  </h3>
                  <button
                    onClick={() => { setNewStatus('inprogress'); setShowAddForm(true); }}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                  {tasks.filter(t => t.status === 'inprogress').map(task => (
                    <motion.div
                      layout
                      key={task.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-850 border-l-2 border-l-amber-500/50 space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                          {task.category}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-600 hover:text-rose-400 cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-white">{task.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{task.description}</p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-850/40">
                        <button
                          onClick={() => handleUpdateTaskStatus(task, 'todo')}
                          className="p-1 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-emerald-400 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[9px] text-slate-600 font-mono">By {task.assignee}</span>
                        <button
                          onClick={() => handleUpdateTaskStatus(task, 'done')}
                          className="p-1 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-emerald-400 cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Done column */}
              <div className="bg-slate-900/20 p-5 rounded-2xl border border-slate-800/80 flex flex-col gap-4">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h3 className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-500" /> Completed
                  </h3>
                  <button
                    onClick={() => { setNewStatus('done'); setShowAddForm(true); }}
                    className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
                  {tasks.filter(t => t.status === 'done').map(task => (
                    <motion.div
                      layout
                      key={task.id}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-850 border-l-2 border-l-emerald-500/50 space-y-3 hover:border-slate-700 transition-colors opacity-70"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded">
                          {task.category}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-slate-600 hover:text-rose-400 cursor-pointer p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-bold text-white line-through">{task.title}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed">{task.description}</p>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-850/40">
                        <button
                          onClick={() => handleUpdateTaskStatus(task, 'inprogress')}
                          className="p-1 hover:bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-emerald-400 cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[9px] text-slate-600 font-mono">By {task.assignee}</span>
                        <div />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 4: Chat Room sidebar panels */}
            <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between h-[580px]">
              <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                <h3 className="text-xs font-bold font-mono text-slate-400 border-b border-slate-850 pb-2 flex items-center gap-1.5 shrink-0">
                  <MessageSquare className="w-4 h-4 text-cyan-400" /> Study Chat Room
                </h3>

                {/* Message list */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {chats.map((msg, mi) => {
                    const isSelf = msg.userId === userId;
                    return (
                      <div key={mi} className={`space-y-1 ${isSelf ? 'text-right' : 'text-left'}`}>
                        <span className="text-[9px] text-slate-500 font-mono font-bold capitalize block">
                          {msg.senderName} ({msg.timestamp})
                        </span>
                        <div className={`p-2.5 rounded-xl inline-block max-w-[90%] leading-relaxed font-sans ${
                          isSelf ? 'bg-cyan-500 text-slate-950 font-semibold' : 'bg-slate-950 border border-slate-850 text-slate-300'
                        }`}>
                          {msg.message}
                        </div>
                      </div>
                    );
                  })}
                  {chats.length === 0 && (
                    <div className="text-center py-12 text-slate-600 text-[10px] font-mono leading-relaxed">
                      WELCOME! Sync chat messages live over port 3000 WebSocket pipelines.
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input panel */}
              <form onSubmit={handleSendChatMessage} className="flex gap-2 pt-3 border-t border-slate-850/60 shrink-0">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask peers..."
                  className="flex-1 bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center justify-center cursor-pointer shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Slide-over modal to Add Task card */}
            <AnimatePresence>
              {showAddForm && (
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
                    className="bg-slate-900 max-w-md w-full p-6 rounded-2xl border border-slate-800 space-y-4 text-left"
                  >
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
                      <Plus className="w-5 h-5 text-cyan-400" /> Create Workspace Milestone
                    </h3>

                    <form onSubmit={handleCreateTask} className="space-y-4 text-xs font-sans">
                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Title:</label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                          placeholder="e.g. Solve Reverse Link List"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Description:</label>
                        <textarea
                          value={newDesc}
                          onChange={(e) => setNewDesc(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 px-3.5 py-2 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-cyan-500 resize-none"
                          placeholder="Describe constraints or links..."
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Topic Category:</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-slate-200 text-xs focus:outline-none"
                          >
                            <option value="Coding">Coding</option>
                            <option value="Aptitude">Aptitude</option>
                            <option value="Resume">Resume</option>
                            <option value="System Design">System Design</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold uppercase tracking-wider text-[10px]">Priority:</label>
                          <select
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-850 px-3 py-2 rounded-xl text-slate-200 text-xs focus:outline-none"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
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
                          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl cursor-pointer shadow-md"
                        >
                          Create Task Card
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
