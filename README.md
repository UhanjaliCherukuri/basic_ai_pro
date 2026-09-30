# 🤖 StudyAI - College AI Study Assistant

A modern, responsive, frontend-only **AI Study Assistant** web application designed for interactive college workshops, hackathons, and classroom live demonstrations.

Built with **React**, **Vite**, **Lucide React**, and **Vanilla CSS**.

---

## 🌟 Key Demo Features

### 1. 🤖 Smart AI Study Assistant
- **Predefined Knowledge Engine:** Comprehensive responses covering:
  - **Java OOP:** 4 Pillars (Encapsulation, Inheritance, Polymorphism, Abstraction) with code examples and pro tips.
  - **DSA:** Optimal Two Sum with HashMap, time/space complexity analysis, and self-check questions.
  - **React:** Components, JSX, State vs. Props, Virtual DOM, and Hooks breakdown.
  - **APIs:** Client-server restaurant metaphor, REST HTTP methods (GET, POST, PUT, DELETE), status codes, and fetch example.
  - **Study Plan:** 7-day college exam timetable using Pomodoro and Active Recall.
  - **Computer Networks:** 7-layer OSI Model with memory mnemonics and TCP vs UDP comparison.
  - **Machine Learning:** Supervised, Unsupervised, Reinforcement Learning, and the ML pipeline.
- **Smart Fallback:** Helpful guidance if an unknown query is entered in demo mode.
- **Interactive UX:**
  - One-click suggested prompt buttons.
  - Animated typing indicator (`"AI is thinking..."`).
  - Auto-scrolling to the latest message.
  - Syntax-highlighted code blocks with a one-click **Copy Code** button.

### 2. 🏠 Student Dashboard
- **Personalized Welcome:** *"Good Afternoon, Uhanjali 👋"* with active 7-day streak indicator.
- **Key Statistics Cards:**
  - 📚 Enrolled Subjects: **6**
  - 📝 Problems Solved: **128**
  - ⏱ Study Time: **24h**
  - 🔥 Current Streak: **7 days**
- **Continue Learning Modules:**
  - Java Programming (80%)
  - Data Structures & Algorithms (60%)
  - Computer Networks (50%)
  - Machine Learning (40%)

### 3. 🛠️ Interactive Quick Tools
- ⏱ **Working Pomodoro Timer:** 25-minute focus session with Start, Pause, Reset, Break mode selector, and Web Audio API chime!
- 🎯 **Daily Goals Checklist:** Interactive task checkboxes that dynamically recalculate the day's completion percentage.
- 📝 **Quick Notes:** Create, review, and delete exam formula reminders saved locally.
- 📅 **Study Planner:** Schedule milestones for mid-term exams and lab tests.

### 4. 📝 Practice Arena
- **Today's Challenge:** *"Find the largest element in an array"* (Easy, Arrays, 10 pts).
- **Interactive Code Runner Modal:** View Java code boilerplate, hit **Run & Submit**, and see simulated test cases pass with speed benchmarks.

### 5. 📊 Curriculum Progress & Analytics
- Progress bars for Java (80%), DSA (60%), React (70%), Networking (50%), and ML (40%).
- Interactive **Weekly Study Hours Chart** with hover tooltips and daily breakdown.
- 30-day visual activity heatmap and unlocked academic achievement badges.

### 6. 🌓 Theme Customization & Responsiveness
- **Dark Mode / Light Mode Toggle:** Smooth transition between clean white and dark navy palette, persisted in `localStorage`.
- **Mobile Responsive Drawer:** Collapsible sidebar menu for tablets and smartphones.

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── Sidebar.jsx            # Responsive navigation & student mode badge
│   ├── Header.jsx             # Search bar, notifications popover, theme toggle, avatar
│   ├── Dashboard.jsx          # Welcome banner, stats cards, courses, tools split
│   ├── ChatAssistant.jsx      # Chat conversation manager, typing indicator, auto-scroll
│   ├── ChatMessage.jsx        # Rich message bubble, code snippets with copy button
│   ├── SuggestedQuestions.jsx # Quick suggestion pills
│   ├── PomodoroTimer.jsx      # 25-minute working timer with chime
│   ├── DailyGoals.jsx         # Interactive checklist with live progress bar
│   ├── QuickNotes.jsx         # Note card creation & tag manager
│   ├── StudyPlanner.jsx       # Upcoming exam & lab test schedule
│   ├── PracticeCard.jsx       # Daily challenge card with code modal
│   ├── PracticeView.jsx       # Dedicated coding challenges arena
│   ├── SubjectsView.jsx       # Curriculum syllabus & subject breakdown
│   ├── ProgressView.jsx       # Exam readiness index, heatmap & badges
│   └── SettingsView.jsx       # Profile editor & study preferences
├── data/
│   ├── aiResponses.js         # Predefined knowledge base & keyword matching
│   └── mockData.js            # Student profile, courses, and stats
├── App.jsx                    # Root tab routing & theme state
├── main.jsx                   # React entry point
└── index.css                  # Modern CSS design system (light & dark mode tokens)
```

---

## 🎤 College Workshop Demo Script

1. **Introduction (1 min):**
   - Point out the clean UI, student profile (*"Uhanjali"*), and the 7-day streak counter.
   - Click the **Sun/Moon icon** in the top header to showcase instant dark/light mode switching.
2. **AI Assistant Demo (2 mins):**
   - Click **AI Assistant** in the sidebar.
   - Click the suggested pill **"Explain Java OOP"**. Show the typing animation and the structured markdown output with Java code and copy button.
   - Type *"What is an API?"* in the input box and hit Enter to demonstrate responsive text handling.
3. **Pomodoro & Quick Tools (1 min):**
   - Go back to the **Dashboard**.
   - Click **Start** on the Pomodoro timer to show the active countdown and progress circle.
   - Check off a task in **Daily Goals** to see the progress bar animate.
4. **Practice Challenge (1 min):**
   - Click **Start Practice** on Today's Challenge.
   - Click **Run & Submit** in the modal to show test cases passing in real time.
