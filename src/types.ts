export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  skills: string[];
  interests: string[];
  academicPerformance: string;
  aptitudeLevel: string;
  personalityTraits: string[];
  strengths: string[];
  weaknesses: string[];
  resumeScore: number;
  codingProgress: {
    solvedCount: number;
    totalCount: number;
    byDifficulty: { Easy: number; Medium: number; Hard: number };
  };
  aptitudeAnalytics: {
    solvedCount: number;
    correctCount: number;
    byCategory: Record<string, { total: number; correct: number }>;
  };
  interviewScore: number;
  placementReadiness: number;
  dailyStreak: number;
  lastActiveDate?: string;
}

export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  uploadedAt: string;
  parsedText: string;
}

export interface ResumeAnalysis {
  id: string;
  resumeId: string;
  score: number;
  skillsExtracted: string[];
  grammarCheck: string;
  missingKeywords: string[];
  experienceAnalysis: string;
  suggestions: string[];
  recommendedTech: string[];
  suggestedProjects: string[];
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  hiddenTestCases: { input: string; output: string }[];
}

export interface CodingSubmission {
  id: string;
  userId: string;
  questionId: string;
  code: string;
  language: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error';
  runtime: number; // ms
  passedCount: number;
  totalCount: number;
  submittedAt: string;
}

export interface AptitudeQuestion {
  id: string;
  question: string;
  category: 'Quantitative' | 'Logical' | 'Verbal';
  subcategory: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AptitudeResult {
  id: string;
  userId: string;
  score: number;
  category: string;
  totalQuestions: number;
  completedAt: string;
}

export interface InterviewResult {
  id: string;
  userId: string;
  type: 'HR' | 'Technical' | 'Coding';
  duration: number; // seconds
  scores: {
    communication: number;
    technical: number;
    confidence: number;
    grammar: number;
    problemSolving: number;
  };
  feedback: string;
  weaknessAnalysis: string;
  suggestions: string[];
  completedAt: string;
}

export interface LearningRoadmap {
  id: string;
  userId: string;
  title: string;
  steps: {
    title: string;
    description: string;
    duration: string;
    topics: string[];
  }[];
  dailyTasks: string[];
  weeklyGoals: string[];
  certifications: string[];
  projects: string[];
  youtubeResources: { title: string; url: string }[];
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  category: string;
  roomId: string;
}
