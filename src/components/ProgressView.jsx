import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Award, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { subjectProgressList, weeklyActivityData, studentProfile } from '../data/mockData';

export default function ProgressView() {
  const achievements = [
    { id: 1, title: '7-Day Streak Scholar', desc: 'Maintained uninterrupted daily study routine', icon: '🔥', date: 'Earned today' },
    { id: 2, title: 'Java OOP Master', desc: 'Completed all 4 pillars and quizzes with 80%+ accuracy', icon: '☕', date: '2 days ago' },
    { id: 3, title: 'DSA Sprint Champion', desc: 'Solved 100+ LeetCode-style algorithm problems', icon: '⚡', date: 'Last week' },
    { id: 4, title: 'Pomodoro Focus Master', desc: 'Completed 50 focused 25-minute study intervals', icon: '⏱', date: '2 weeks ago' }
  ];

  // Mock heatmap 28 days
  const heatmapDays = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    level: i % 7 === 0 ? 1 : (i % 3 === 0 ? 3 : (i % 2 === 0 ? 2 : 4))
  }));

  return (
    <div className="progress-view-layout">
      <div className="view-header">
        <h1 className="view-title">Study Analytics & Mastery 📊</h1>
        <p className="view-subtitle">Detailed insights into your study habits, syllabus coverage, and achievements</p>
      </div>

      {/* Top Highlight Summary */}
      <div className="grid-3 summary-cards-grid">
        <div className="card summary-card">
          <div className="summary-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#6366f1' }}>
            <TrendingUp size={22} />
          </div>
          <div className="summary-info">
            <span className="summary-label">Exam Readiness Index</span>
            <div className="summary-value">82%</div>
            <span className="summary-hint">Based on syllabus coverage & tests</span>
          </div>
        </div>

        <div className="card summary-card">
          <div className="summary-icon-wrap" style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444' }}>
            <Flame size={22} />
          </div>
          <div className="summary-info">
            <span className="summary-label">Current Active Streak</span>
            <div className="summary-value">{studentProfile.streakDays} Days</div>
            <span className="summary-hint">Top 5% among classmates</span>
          </div>
        </div>

        <div className="card summary-card">
          <div className="summary-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
            <Award size={22} />
          </div>
          <div className="summary-info">
            <span className="summary-label">Badges Unlocked</span>
            <div className="summary-value">12 Badges</div>
            <span className="summary-hint">+2 earned this month</span>
          </div>
        </div>
      </div>

      {/* Detailed Subject Completion */}
      <div className="card mastery-breakdown-card">
        <div className="card-header">
          <span className="card-title">
            <BarChart3 size={19} className="text-primary" />
            <span>Subject Mastery Breakdown</span>
          </span>
          <span className="badge badge-primary-light">6 Subjects Monitored</span>
        </div>

        <div className="mastery-list">
          {subjectProgressList.map((sub) => (
            <div key={sub.name} className="mastery-item">
              <div className="mastery-top-row">
                <span className="mastery-name">{sub.name}</span>
                <span className="mastery-percent">{sub.progress}% Mastery</span>
              </div>
              <div className="mastery-track">
                <div
                  className="mastery-fill"
                  style={{ width: `${sub.progress}%`, backgroundColor: sub.color }}
                />
              </div>
              <div className="mastery-status-row">
                <span>Target: {sub.target}</span>
                <span className="status-label-done">
                  {sub.progress >= 70 ? 'On Track for Grade A' : 'Needs Practice'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Activity Heatmap & Badges */}
      <div className="grid-2 activity-badges-grid">
        {/* Heatmap */}
        <div className="card heatmap-card">
          <div className="card-header">
            <span className="card-title">
              <Calendar size={19} className="text-secondary" />
              <span>Monthly Study Heatmap</span>
            </span>
          </div>
          <p className="heatmap-desc">Visual history of your daily study sessions over the past 4 weeks:</p>
          <div className="heatmap-grid">
            {heatmapDays.map((d) => (
              <div
                key={d.day}
                className={`heatmap-box level-${d.level}`}
                title={`Day ${d.day}: ${d.level * 1.5} study hours logged`}
              />
            ))}
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            <span className="legend-box level-1"></span>
            <span className="legend-box level-2"></span>
            <span className="legend-box level-3"></span>
            <span className="legend-box level-4"></span>
            <span>More</span>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="card achievements-card">
          <div className="card-header">
            <span className="card-title">
              <Award size={19} className="text-primary" />
              <span>Recent Achievements</span>
            </span>
          </div>
          <div className="achievements-list">
            {achievements.map((ach) => (
              <div key={ach.id} className="achievement-row">
                <span className="achievement-emoji">{ach.icon}</span>
                <div className="achievement-info">
                  <div className="achievement-title">{ach.title}</div>
                  <div className="achievement-desc">{ach.desc}</div>
                </div>
                <span className="achievement-date">{ach.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .progress-view-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.35rem;
        }

        .summary-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .summary-info {
          display: flex;
          flex-direction: column;
        }

        .summary-label {
          font-size: 0.775rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .summary-value {
          font-family: var(--font-mono);
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin: 0.2rem 0;
        }

        .summary-hint {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .mastery-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mastery-top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.4rem;
        }

        .mastery-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mastery-percent {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mastery-track {
          height: 8px;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .mastery-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }

        .mastery-status-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.725rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        .status-label-done {
          font-weight: 600;
          color: var(--primary);
        }

        /* Heatmap */
        .heatmap-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 1rem;
        }

        .heatmap-box {
          aspect-ratio: 1;
          border-radius: 4px;
          transition: transform 0.15s ease;
          cursor: pointer;
        }

        .heatmap-box:hover {
          transform: scale(1.15);
        }

        .level-1 { background-color: var(--bg-surface-hover); border: 1px solid var(--border-subtle); }
        .level-2 { background-color: rgba(99, 102, 241, 0.3); }
        .level-3 { background-color: rgba(99, 102, 241, 0.65); }
        .level-4 { background-color: var(--primary); }

        .heatmap-legend {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.45rem;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .legend-box {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          display: inline-block;
        }

        /* Achievements */
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .achievement-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }

        .achievement-emoji {
          font-size: 1.35rem;
        }

        .achievement-info {
          flex: 1;
        }

        .achievement-title {
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .achievement-desc {
          font-size: 0.725rem;
          color: var(--text-secondary);
        }

        .achievement-date {
          font-size: 0.675rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
