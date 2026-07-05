import * as fs from 'fs';
import * as path from 'path';
import {
  User,
  StudentProfile,
  Resume,
  ResumeAnalysis,
  CodingQuestion,
  CodingSubmission,
  AptitudeQuestion,
  AptitudeResult,
  InterviewResult,
  LearningRoadmap,
  Notification,
  ChatMessage,
  Task
} from '../src/types';
import { generateCodingQuestions, generateAptitudeQuestions } from './procedural';

interface Schema {
  users: User[];
  student_profiles: StudentProfile[];
  resumes: Resume[];
  resume_analysis: ResumeAnalysis[];
  coding_questions: CodingQuestion[];
  coding_submissions: CodingSubmission[];
  aptitude_questions: AptitudeQuestion[];
  aptitude_results: AptitudeResult[];
  interview_results: InterviewResult[];
  learning_roadmaps: LearningRoadmap[];
  notifications: Notification[];
  chatbot_history: ChatMessage[];
  tasks: Task[];
}

const DB_PATH = path.join(process.cwd(), 'data', 'careerpilot.db');

export class Database {
  private data: Schema = {
    users: [],
    student_profiles: [],
    resumes: [],
    resume_analysis: [],
    coding_questions: [],
    coding_submissions: [],
    aptitude_questions: [],
    aptitude_results: [],
    interview_results: [],
    learning_roadmaps: [],
    notifications: [],
    chatbot_history: [],
    tasks: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_PATH)) {
      try {
        const fileContent = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(fileContent);

        let updated = false;
        if (!this.data.coding_questions || this.data.coding_questions.length < 100) {
          this.data.coding_questions = generateCodingQuestions();
          updated = true;
        }
        if (!this.data.aptitude_questions || this.data.aptitude_questions.length < 1000) {
          this.data.aptitude_questions = generateAptitudeQuestions();
          updated = true;
        }
        if (this.data.student_profiles) {
          this.data.student_profiles.forEach(prof => {
            if (prof.userId === 'student-1') {
              if (prof.codingProgress) {
                prof.codingProgress.totalCount = 100;
                updated = true;
              }
            }
          });
        }
        if (updated) {
          this.save();
        }
      } catch (e) {
        console.error('Error reading DB, reinitializing:', e);
        this.seed();
        this.save();
      }
    } else {
      this.seed();
      this.save();
    }
  }

  public save() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving DB:', e);
    }
  }

  // Helper getters
  public get users() { return this.data.users; }
  public get student_profiles() { return this.data.student_profiles; }
  public get resumes() { return this.data.resumes; }
  public get resume_analysis() { return this.data.resume_analysis; }
  public get coding_questions() { return this.data.coding_questions; }
  public get coding_submissions() { return this.data.coding_submissions; }
  public get aptitude_questions() { return this.data.aptitude_questions; }
  public get aptitude_results() { return this.data.aptitude_results; }
  public get interview_results() { return this.data.interview_results; }
  public get learning_roadmaps() { return this.data.learning_roadmaps; }
  public get notifications() { return this.data.notifications; }
  public get chatbot_history() { return this.data.chatbot_history; }
  public get tasks() { return this.data.tasks; }

  private seed() {
    // 1. Create Admins and Users
    const defaultAdmin: User = {
      id: 'admin-1',
      email: 'admin@careerpilot.ai',
      passwordHash: 'admin123', // Simple authentication for preview demo
      name: 'System Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    const demoStudent: User = {
      id: 'student-1',
      email: 'student@careerpilot.ai',
      passwordHash: 'student123',
      name: 'John Doe',
      role: 'student',
      createdAt: new Date().toISOString(),
    };

    this.data.users.push(defaultAdmin, demoStudent);

    // 2. Demo Student Profile
    const demoProfile: StudentProfile = {
      userId: 'student-1',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Python'],
      interests: ['Full Stack Development', 'AI/ML Engineering'],
      academicPerformance: 'CGPA: 8.5/10',
      aptitudeLevel: 'Intermediate',
      personalityTraits: ['Analytical', 'Inquisitive', 'Collaborative'],
      strengths: ['Problem Solving', 'Frontend UI Design'],
      weaknesses: ['Data Structures & Algorithms Complexity', 'Public Speaking'],
      resumeScore: 78,
      codingProgress: {
        solvedCount: 3,
        totalCount: 6,
        byDifficulty: { Easy: 2, Medium: 1, Hard: 0 },
      },
      aptitudeAnalytics: {
        solvedCount: 15,
        correctCount: 12,
        byCategory: {
          Quantitative: { total: 5, correct: 4 },
          Logical: { total: 5, correct: 4 },
          Verbal: { total: 5, correct: 4 },
        },
      },
      interviewScore: 82,
      placementReadiness: 76,
      dailyStreak: 5,
      lastActiveDate: new Date().toISOString(),
    };

    this.data.student_profiles.push(demoProfile);

    // 3. Real LeetCode style Coding Questions
    const codingQuestions = generateCodingQuestions();
    this.data.coding_questions.push(...codingQuestions);

    // 4. Real IndiaBix style Aptitude Questions
    const aptitudeQuestions = generateAptitudeQuestions();
    this.data.aptitude_questions.push(...aptitudeQuestions);

    // 5. Default Collaborative Tasks (Task management feature request!)
    const defaultTasks: Task[] = [
      {
        id: 'task-1',
        title: 'Update Resume Profile Summary',
        description: 'Refine the top statement with targeted keywords for full-stack react developers.',
        status: 'inprogress',
        priority: 'high',
        assignee: 'John Doe',
        dueDate: '2026-07-10',
        category: 'Resume Prep',
        roomId: 'default-study-group'
      },
      {
        id: 'task-2',
        title: 'Solve "Valid Parentheses" Stack challenge',
        description: 'Complete the stack-based brackets matching challenge on the code practice dashboard.',
        status: 'todo',
        priority: 'medium',
        assignee: 'John Doe',
        dueDate: '2026-07-06',
        category: 'Coding Practice',
        roomId: 'default-study-group'
      },
      {
        id: 'task-3',
        title: 'Practice HR Interview questions on Weaknesses',
        description: 'Record an interactive speech answering "Tell me about a time you overcame a technical weakness".',
        status: 'done',
        priority: 'medium',
        assignee: 'John Doe',
        dueDate: '2026-07-03',
        category: 'Mock Interview',
        roomId: 'default-study-group'
      }
    ];

    this.data.tasks.push(...defaultTasks);

    // 6. Seed notifications
    this.data.notifications.push({
      id: 'notif-1',
      userId: 'student-1',
      title: 'Welcome to CareerPilot AI!',
      message: 'Take your first interactive AI Career Quiz to unlock personalized development roadmaps.',
      isRead: false,
      createdAt: new Date().toISOString()
    });
  }
}

// Global instance
export const db = new Database();
