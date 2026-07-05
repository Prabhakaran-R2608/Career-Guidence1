# CareerPilot - Full-Stack Career Guidance & Placement Suite

A comprehensive, fully integrated, full-stack application built to guide students in their career trajectories, evaluate their placement readiness, analyze resumes, offer dynamic mock interviews, and practice coding challenges.

This application is powered by a robust **Express** backend proxying the **Gemini AI API** (with comprehensive local procedurally generated fallbacks) and a high-performance **React client** integrated via **Vite middleware**.

---

## 🚀 How to Run Locally in VS Code (Offline or Online)

Follow these simple steps to set up and run the entire application on your local machine using VS Code or any standard terminal:

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes packaged with Node.js)
- **VS Code** (or your preferred editor)

### 2. Open the Project
1. Extract or clone this project workspace into a local directory.
2. Launch VS Code.
3. Select **File > Open Folder...** (or `Cmd+O` / `Ctrl+O`) and choose the root directory containing this project.

### 3. Install Dependencies
Open the integrated terminal in VS Code (`Ctrl+`` or **Terminal > New Terminal**) and run:
```bash
npm install
```
This will install all required client-side and server-side packages declared in `package.json` (including Express, React, Vite, Tailwind CSS, TypeScript, and the Gemini AI SDK).

### 4. Configure Environment Variables
1. At the project root, create a file named `.env` by copying the provided example template:
   - **Linux/macOS:** `cp .env.example .env`
   - **Windows PowerShell:** `Copy-Item .env.example .env`
   - **Windows Command Prompt:** `copy .env.example .env`
2. Open the newly created `.env` file in VS Code and supply your Gemini API Key:
   ```env
   GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY_HERE"
   APP_URL="http://localhost:3000"
   ```
   *(Note: You can obtain a free-tier Gemini API Key from Google AI Studio).*

### 5. Start Development Server
Run the local dev compiler and backend API server simultaneously with:
```bash
npm run dev
```
- The backend Express server boots up on port `3000`.
- The Vite middleware interceptor automatically boots and serves the React client.
- Open your browser to **[http://localhost:3000](http://localhost:3000)** to interact with the system live!

### 6. Build and Test Production Build Locally
To compile the production-ready optimized build bundle and test server performance:
```bash
# 1. Build client assets & bundle the TS server file into self-contained CJS
npm run build

# 2. Boot the high-performance compiled server in production mode
npm start
```

---

## 🛠️ Project Architecture

This application employs a modern **Full-Stack (Client + Server)** architecture to protect API keys and ensure fast data response speeds:

```
├── .env.example              # Template for environment configuration
├── package.json              # Script automation & package dependency registry
├── tsconfig.json             # Compiler configurations for TypeScript
├── vite.config.ts            # Vite client asset compiler configuration
├── server.ts                 # Full-stack entry point (Express & Vite dev middleware)
├── data/
│   └── careerpilot.db        # JSON-based file persistence (auto-generated on boot)
├── server/
│   ├── ai.ts                 # Integration proxy for Gemini AI APIs
│   ├── db.ts                 # Persistence logic and query interfaces
│   └── procedural.ts         # High-fidelity procedural dataset generation algorithms
└── src/                      # React SPA Source Code
    ├── main.tsx              # React UI mounting point
    ├── App.tsx               # Main layout frame, routers, and global contexts
    ├── index.css             # Tailwind CSS style declarations & font imports
    ├── types.ts              # Shareable global typescript models
    └── components/           # Modularized UI features
        ├── AptitudeSystem.tsx   # Adaptive MCQs & cognitive test engine
        ├── CareerGuidance.tsx   # Quiz & personalized AI learning roadmap
        ├── CodingPractice.tsx   # Interactive code compiler, console, and category filters
        ├── ResumeAnalyzer.tsx   # Scoring, skill gaps, and keyword analysis
        └── MockInterview.tsx    # Audio/Text responsive AI simulator
```

---

## 🧠 Smart Offline Resiliency & AI Fallback Design

If you run this application in an **entirely offline environment** or without configuring a `GEMINI_API_KEY`, **the application is fully resilient and will not crash!**

- **Procedural Databases (`server/procedural.ts`)**: Generates 100+ technical coding challenges and 1,000+ cognitive/aptitude questions automatically.
- **Frontend Fallbacks (`src/components/CareerGuidance.tsx`)**: The Career guidance quiz, dynamic interview grading, and resume analyzer are equipped with high-fidelity frontend scoring models. If an API request fails, it automatically falls back to an immediate offline calculation, ensuring zero disruption.
- **Self-contained DB (`data/careerpilot.db`)**: Creates a structured, persistent state in a file inside the `data/` folder, preserving your signup info, profiles, scores, and streak details locally.
