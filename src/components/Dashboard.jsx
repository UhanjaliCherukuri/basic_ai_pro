import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  PlayCircle,
  Code2,
  Brain,
  Coffee,
  Network,
  Binary,
  Bot
} from 'lucide-react';
import { studentProfile, statsData, continueLearningCourses } from '../data/mockData';
import PomodoroTimer from './PomodoroTimer';
import PracticeCard from './PracticeCard';
import ProgressCard from './ProgressCard';
import DailyGoals from './DailyGoals';
import QuickNotes from './QuickNotes';
import StudyPlanner from './StudyPlanner';

export default function Dashboard({ onNavigateTab, onAskAIWithPrompt }) {
  // Icon mapper for dynamic stats icons
  const getStatIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen size={20} />;
      case 'CheckCircle2': return <CheckCircle2 size={20} />;
      case 'Clock': return <Clock size={20} />;
      case 'Flame': return <Flame size={20} className="flame-icon-pulse" />;
      default: return <Sparkles size={20} />;
    }
  };

  const getCourseIcon = (iconName) => {
    switch (iconName) {
      case 'Coffee': return <Coffee size={20} />;
      case 'Binary': return <Binary size={20} />;
      case 'Network': return <Network size={20} />;
      case 'Brain': return <Brain size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div className="dashboard-content-layout">
      {/* 1. Welcome Banner Section */}
      <section className="welcome-banner">
        <div className="welcome-banner-text">
          <div className="welcome-badge">
            <Sparkles size={14} className="text-secondary" />
            <span>AI Study Copilot Activated</span>
          </div>
          <h1 className="welcome-heading">
            Good Afternoon, {studentProfile.name} 👋
          </h1>
          <p className="welcome-subheading">
            Ready to learn something new today?
          </p>
          <div className="welcome-action-buttons">
            <button
              className="btn btn-primary"
              onClick={() => onNavigateTab('assistant')}
              id="banner-ask-ai-btn"
            >
              <Bot size={17} />
              <span>Ask AI Assistant</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigateTab('practice')}
              id="banner-practice-btn"
            >
              <Code2 size={17} />
              <span>Solve Today's Problem</span>
            </button>
          </div>
        </div>

        <div className="welcome-banner-card">
          <div className="streak-circle-graphic">
            <Flame size={32} className="text-rose flame-icon-pulse" />
            <div className="streak-number">{studentProfile.streakDays}</div>
            <div className="streak-label">Days Streak!</div>
          </div>
          <p className="streak-encourage-msg">
            You're on fire! Complete today's DSA challenge to extend your streak.
          </p>
        </div>
      </section>

      {/* 2. Statistics Overview Cards */}
      <section className="stats-section">
        <div className="grid-4">
          {statsData.map((stat) => (
            <div key={stat.id} className="card stat-card" id={`stat-card-${stat.id}`}>
              <div className="stat-card-top">
                <div
                  className="stat-icon-wrapper"
                  style={{
                    backgroundColor: stat.bgColor,
                    color: stat.color
                  }}
                >
                  {getStatIcon(stat.icon)}
                </div>
                <span className="stat-change-tag">{stat.change}</span>
              </div>
              <div className="stat-card-bottom">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Continue Learning Section */}
      <section className="continue-learning-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Continue Learning</h2>
            <p className="section-desc">Pick up right where you left off in your semester modules</p>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onNavigateTab('subjects')}
          >
            <span>All Subjects (6)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid-4 course-cards-grid">
          {continueLearningCourses.map((course) => (
            <div key={course.id} className="card course-card">
              <div className="course-card-top">
                <div
                  className="course-icon-badge"
                  style={{
                    backgroundColor: `rgba(99, 102, 241, 0.1)`,
                    color: course.badgeColor
                  }}
                >
                  {getCourseIcon(course.icon)}
                </div>
                <span className="badge course-category-badge">
                  {course.category}
                </span>
              </div>

              <h3 className="course-title">{course.title}</h3>
              <p className="course-module-name">{course.module}</p>

              {/* Progress Bar & Percentage */}
              <div className="course-progress-block">
                <div className="progress-info-row">
                  <span className="progress-label">Progress</span>
                  <span className="progress-percent" style={{ color: course.badgeColor }}>
                    {course.progress}%
                  </span>
                </div>
                <div className="course-progress-track">
                  <div
                    className="course-progress-fill"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.badgeColor
                    }}
                  />
                </div>
                <div className="progress-lesson-counts">
                  <span>{course.lessonsCompleted} of {course.totalLessons} lessons</span>
                </div>
              </div>

              {/* Card Footer Button */}
              <button
                className="btn btn-secondary btn-sm course-continue-btn"
                onClick={() => onAskAIWithPrompt(`Explain ${course.title} ${course.nextTopic}`)}
                id={`continue-${course.id}-btn`}
              >
                <PlayCircle size={15} />
                <span>Continue</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Quick Tools Section */}
      <section className="quick-tools-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Quick Tools & Study Suite</h2>
            <p className="section-desc">Interactive tools for time management and daily retention</p>
          </div>
        </div>

        <div className="grid-4 tools-grid">
          {/* Pomodoro Timer */}
          <PomodoroTimer />

          {/* Daily Goals */}
          <DailyGoals />

          {/* Quick Notes */}
          <QuickNotes />

          {/* Study Planner */}
          <StudyPlanner onNavigateSubjects={() => onNavigateTab('subjects')} />
        </div>
      </section>

      {/* 5. Practice & Curriculum Mastery Split */}
      <section className="practice-progress-split-section">
        <div className="split-grid-wrapper">
          {/* Practice Section Card */}
          <div className="split-col-practice">
            <PracticeCard />
          </div>

          {/* Progress Section Card */}
          <div className="split-col-progress">
            <ProgressCard />
          </div>
        </div>
      </section>

      <style>{`
        .dashboard-content-layout {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Welcome Banner */
        .welcome-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(124, 58, 237, 0.12) 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          border-radius: var(--radius-xl);
          padding: 2rem 2.25rem;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .welcome-banner::before {
          content: '';
          position: absolute;
          top: -50px;
          right: -50px;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.75rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.75rem;
        }

        .welcome-heading {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 0.35rem;
        }

        .welcome-subheading {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .welcome-action-buttons {
          display: flex;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .welcome-banner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.25rem 1.75rem;
          text-align: center;
          max-width: 260px;
          box-shadow: var(--shadow-md);
        }

        .streak-circle-graphic {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .flame-icon-pulse {
          animation: flamePulse 1.8s infinite ease-in-out;
        }

        @keyframes flamePulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 2px #ef4444); }
          50% { transform: scale(1.15); filter: drop-shadow(0 0 8px #ef4444); }
        }

        .streak-number {
          font-family: var(--font-mono);
          font-size: 1.85rem;
          font-weight: 800;
          color: #ef4444;
          line-height: 1;
          margin-top: 0.25rem;
        }

        .streak-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .streak-encourage-msg {
          font-size: 0.775rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        @media (max-width: 900px) {
          .welcome-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .welcome-banner-card {
            max-width: 100%;
            width: 100%;
          }
        }

        /* Stats Cards */
        .stat-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.25rem 1.4rem;
        }

        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-change-tag {
          font-size: 0.725rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .stat-value {
          font-family: var(--font-mono);
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.825rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-top: 0.2rem;
        }

        /* Sections Common */
        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 1.15rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .section-desc {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        /* Course Cards */
        .course-card {
          display: flex;
          flex-direction: column;
          padding: 1.35rem;
        }

        .course-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.85rem;
        }

        .course-icon-badge {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .course-category-badge {
          background-color: var(--bg-surface-hover);
          color: var(--text-secondary);
          border: 1px solid var(--border-subtle);
        }

        .course-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .course-module-name {
          font-size: 0.775rem;
          color: var(--text-muted);
          line-height: 1.35;
          margin-bottom: 1rem;
          min-height: 32px;
        }

        .course-progress-block {
          margin-bottom: 1.15rem;
        }

        .progress-info-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .course-progress-track {
          height: 7px;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .course-progress-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.6s ease;
        }

        .progress-lesson-counts {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        .course-continue-btn {
          width: 100%;
          margin-top: auto;
        }

        /* Split Section: Practice & Progress */
        .split-grid-wrapper {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1100px) {
          .split-grid-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
