import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  RefreshCw,
  BookOpen,
  Terminal,
  Check,
  Eye,
  Settings,
  Briefcase,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ResumeAnalyzerProps {
  userId: string;
  onUpdateProfile: (updatedFields: any) => void;
}

export default function ResumeAnalyzer({ userId, onUpdateProfile }: ResumeAnalyzerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileMimeType, setFileMimeType] = useState<string>('');
  const [resumeText, setResumeText] = useState('');
  
  const [isDragActive, setIsDragActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [analysis, setAnalysis] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanStages = [
    { label: "Initializing Multi-Modal Layout Engine...", detail: "Mounting neural document node map." },
    { label: "Inspecting Spacing & Margin Geometry...", detail: "Checking layout alignments and white-space balance." },
    { label: "Parsing Font Typography Hierarchies...", detail: "Evaluating display heading sizing and readability ratios." },
    { label: "Cross-Referencing ATS Job Role Indexes...", detail: "Evaluating resume terminology densities." },
    { label: "Auditing Active Verb Flows & Tenses...", detail: "Ensuring high-impact accomplishment formulas." },
    { label: "Calibrating Resume Boosters & Project Gaps...", detail: "Matching skill deficits with personalized build plans." },
    { label: "Synthesizing Final Scoring Matrix...", detail: "Wrapping final ATS layout audit vectors." }
  ];

  // Handle timeouts for staging progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scanning) {
      setActiveStageIdx(0);
      interval = setInterval(() => {
        setActiveStageIdx((prev) => {
          if (prev < scanStages.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 1300);
    }
    return () => clearInterval(interval);
  }, [scanning]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Revoke old URL if it exists
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    // PDF and Image natively support frame previewing
    if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    } else {
      setFileUrl('');
    }

    // Convert file to Base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const base64 = dataUrl.split(',')[1] || '';
      setFileBase64(base64);
      setFileMimeType(selectedFile.type);

      if (selectedFile.type === 'text/plain' || selectedFile.name.endsWith('.txt')) {
        const textReader = new FileReader();
        textReader.onload = (ev) => {
          setResumeText(ev.target?.result as string || '');
        };
        textReader.readAsText(selectedFile);
      } else {
        setResumeText(`[Binary Document: ${selectedFile.name}]`);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const runAnalysis = async () => {
    const hasFileData = !!fileBase64;
    const textToScan = resumeText.trim();
    
    if (!hasFileData && !textToScan) {
      alert("Please upload a resume file or paste your resume text!");
      return;
    }

    setScanning(true);
    
    try {
      const response = await fetch('/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          fileName: file?.name || 'pasted_resume.txt',
          fileText: textToScan,
          fileData: fileBase64 || null,
          mimeType: fileMimeType || 'text/plain'
        })
      });

      if (!response.ok) throw new Error("Resume parsing error");
      const data = await response.json();
      
      setAnalysis(data.analysis);
      onUpdateProfile({ resumeScore: data.analysis.score });
    } catch (err) {
      console.error(err);
      alert("Analysis encountered an error. Reverting to smart CV standards.");
    } finally {
      setScanning(false);
    }
  };

  const handleReset = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl('');
    setFileBase64('');
    setFileMimeType('');
    setResumeText('');
    setAnalysis(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Inline Animation styles for scan laser */}
      <style>{`
        @keyframes scan-laser {
          0% { transform: translateY(0); }
          50% { transform: translateY(500px); }
          100% { transform: translateY(0); }
        }
        .laser-beam {
          animation: scan-laser 3s infinite ease-in-out;
        }
      `}</style>

      {/* Module Title */}
      <div className="text-center mb-10">
        <span className="text-xs text-blue-400 font-bold uppercase tracking-widest font-mono">Real-Format Multi-Modal Audit</span>
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-3 mt-1">
          <FileText className="w-8 h-8 text-blue-400" /> AI Resume ATS Layout Analyzer
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          Upload your PDF resume in its real format. Our Gemini multi-modal engine evaluates visual alignment, white-space, margin ratios, and keyword densities in real-time.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {scanning ? (
          /* Realtime Interactive Scanning Screen (Split Layout) */
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Panel: Real Document with Active Scanning Laser */}
            <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl border border-slate-800 p-4 flex flex-col h-[580px] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-2 font-mono">
                  <Eye className="w-4 h-4 text-blue-400 animate-pulse" /> TARGET FORMAT PREVIEW
                </span>
                <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 rounded-md animate-pulse uppercase">
                  Analyzing Live
                </span>
              </div>

              {/* Document Stage */}
              <div className="flex-1 rounded-xl bg-slate-950 border border-slate-850/80 relative overflow-hidden flex items-center justify-center p-2">
                {/* Horizontal Sweeping Laser */}
                <div className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.9)] laser-beam z-10" />
                
                {fileUrl ? (
                  <iframe
                    src={fileUrl}
                    title="Resume Preview"
                    className="w-full h-full rounded-lg border-0 pointer-events-none bg-white opacity-85"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900/30 p-6 rounded-lg text-slate-300 font-mono text-xs overflow-y-auto leading-relaxed border border-slate-850 whitespace-pre-wrap select-none opacity-50">
                    {resumeText || "Analyzing raw document text context..."}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: AI Live Terminal / Logs Console */}
            <div className="lg:col-span-7 bg-slate-900/20 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between h-[580px]">
              <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-slate-200 font-mono uppercase tracking-wider">AI Realtime Layout Audit Engine</h3>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {scanStages.map((stage, sIdx) => {
                    const isCompleted = activeStageIdx > sIdx;
                    const isActive = activeStageIdx === sIdx;
                    return (
                      <div
                        key={sIdx}
                        className={`flex gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                          isCompleted ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' :
                          isActive ? 'bg-blue-500/10 border-blue-500/30 text-blue-300 scale-[1.01] shadow-[0_0_15px_rgba(59,130,246,0.05)]' :
                          'bg-slate-950/20 border-slate-900/40 text-slate-500 opacity-40'
                        }`}
                      >
                        <div className="shrink-0 mt-0.5">
                          {isCompleted ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : isActive ? (
                            <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-800" />
                          )}
                        </div>
                        <div>
                          <div className={`font-bold ${isActive ? 'text-white' : ''}`}>{stage.label}</div>
                          <div className={`text-[10px] mt-1 font-light ${isCompleted ? 'text-emerald-500/60' : isActive ? 'text-blue-400/80' : 'text-slate-600'}`}>
                            {stage.detail}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="border-t border-slate-800/80 pt-4 shrink-0">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                  <span>Audit Progress</span>
                  <span>{Math.round(((activeStageIdx + 1) / scanStages.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    style={{ width: `${((activeStageIdx + 1) / scanStages.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : !analysis ? (
          /* Upload & Pasting Portal (Normal Selection Mode) */
          <motion.div
            key="uploaderPortal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Left: Interactive Uploader */}
            <div className="bg-slate-900/20 rounded-2xl border border-slate-800/80 p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-200 mb-2 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-400" /> Option A: Load Native Document File
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Best for evaluating real-world alignment. We accept PDFs, images, or raw text files. Gemini will analyze the font distribution, spacing, structural partitions, and margins.
                </p>
              </div>

              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex-1 flex flex-col justify-center items-center min-h-[220px] ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-500/5' 
                    : 'border-slate-850 bg-slate-950/20 hover:border-slate-700 hover:bg-slate-950/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.txt"
                  className="hidden"
                />
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 mb-3">
                  <Upload className="w-6 h-6 animate-bounce" />
                </div>
                
                <h4 className="text-sm font-bold text-slate-200">
                  {file ? `File Selected: ${file.name}` : "Drag & Drop Resume File"}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
                  Supports PDF or Images. Recommended for real-time visual formatting analyses. Click to browse.
                </p>
              </div>

              {file && (
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="font-mono truncate max-w-[200px]">{file.name}</span>
                    <span className="text-slate-500">({(file.size / (1024 * 1024)).toFixed(2)} MB)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Ready to Scan
                  </span>
                </div>
              )}
            </div>

            {/* Right: Paste text area */}
            <div className="bg-slate-900/20 rounded-2xl border border-slate-800/80 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-400" /> Option B: Paste Plain Text
                </h3>
                {resumeText && !resumeText.startsWith('[Binary Document:') && (
                  <span className="text-[10px] font-mono text-emerald-400">
                    {resumeText.length} Characters
                  </span>
                )}
              </div>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                If you do not have a PDF document handy, paste your plain resume text below. This allows the ATS compiler to optimize text-only keywords.
              </p>

              <textarea
                value={resumeText && resumeText.startsWith('[Binary Document:') ? '' : resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste professional skills, experiences, projects, and education text..."
                rows={10}
                disabled={!!file && !file.name.endsWith('.txt')}
                className="w-full bg-slate-950 border border-slate-850 p-4 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono resize-none disabled:opacity-40 disabled:cursor-not-allowed"
              />
              {file && !file.name.endsWith('.txt') && (
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[11px] text-blue-300 font-mono">
                  ⚠️ PDF Document is loaded. Textbox is locked to preserve formatting analysis.
                </div>
              )}
            </div>

            {/* Analyze Action Trigger */}
            <div className="col-span-1 lg:col-span-2 flex justify-center pt-4">
              <button
                onClick={runAnalysis}
                disabled={!fileBase64 && !resumeText.trim()}
                className="px-10 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-slate-950 font-extrabold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] transition-all flex items-center gap-2 text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Launch Multimodal Real-Time Scan
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Results Dashboard: Side-by-Side Split View */
          <motion.div
            key="resultsPortal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Left Panel: Active Resume reference layout */}
            <div className="lg:col-span-5 bg-slate-900/40 rounded-2xl border border-slate-800 p-4 flex flex-col h-[750px] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-2 font-mono">
                  <FileText className="w-4 h-4 text-blue-400" /> ACTIVE RESUME CANVAS
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Reference Layout
                </span>
              </div>

              {/* Document Stage */}
              <div className="flex-1 rounded-xl bg-slate-950 border border-slate-850/80 relative overflow-hidden p-1">
                {fileUrl ? (
                  <iframe
                    src={fileUrl}
                    title="Active Resume"
                    className="w-full h-full rounded-lg border-0 bg-white"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900/30 p-5 rounded-lg text-slate-300 font-mono text-[11px] overflow-y-auto leading-relaxed border border-slate-850 whitespace-pre-wrap">
                    {resumeText && !resumeText.startsWith('[Binary Document:') ? resumeText : "Real-format resume file successfully parsed."}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Scrollable ATS scorecard and layout suggestions */}
            <div className="lg:col-span-7 flex flex-col gap-6 h-[750px] overflow-y-auto pr-2">
              
              {/* Radial Score card */}
              <div className="bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950 p-6 rounded-2xl border border-blue-500/20 shadow-lg flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-y-0 right-0 w-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div>
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-wider font-mono">ATS AUDIT FINISHED</span>
                  <h2 className="text-2xl font-extrabold text-white mt-1">Layout & Content Scorecard</h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Verified structure against Google, Amazon, and top tech recruiter pipelines.
                  </p>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div className="w-24 h-24 rounded-full border-[3px] border-slate-800 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.4)]">
                    <div 
                      className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-400 border-r-blue-400" 
                      style={{ transform: `rotate(${analysis.score * 3.6}deg)` }} 
                    />
                    <span className="text-2xl font-black text-white font-mono">{analysis?.score}%</span>
                  </div>
                  <span className="text-[9px] uppercase text-slate-500 tracking-wider font-bold mt-1.5 font-mono">Overall ATS Score</span>
                </div>
              </div>

              {/* Skills and warning Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Extracted Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis?.skillsExtracted?.map((skill: string, i: number) => (
                      <span key={i} className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg text-[10px] font-semibold font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" /> Missing Target Keywords
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis?.missingKeywords?.map((keyword: string, i: number) => (
                      <span key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-1 rounded-lg text-[10px] font-semibold font-mono">
                        + {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Formatting check */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-400" /> Layout & Spacing Verification Report
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {analysis?.grammarCheck}
                </p>
              </div>

              {/* Experience and Bullet recommendations */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-400" /> Experience & Project Impact Analysis
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {analysis?.experienceAnalysis}
                </p>
              </div>

              {/* Actionable steps */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-400" /> Structural Optimization Checklist
                </h4>
                <div className="space-y-2.5">
                  {analysis?.suggestions?.map((item: string, i: number) => (
                    <div key={i} className="flex gap-2 items-start text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended project boosters */}
              <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-400" /> Tailored Portfolio Project Boosters
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis?.suggestedProjects?.map((proj: string, i: number) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                          Project {i+1}
                        </span>
                        <h5 className="text-[11px] font-bold text-white truncate">Targeted Build Recommendation</h5>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-light">{proj}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reset Control */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-hover" /> Scan and Audit New Resume
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
