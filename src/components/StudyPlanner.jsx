import React from 'react';
import { Calendar, Clock, Bell, CheckCircle2, ChevronRight } from 'lucide-react';

export default function StudyPlanner({ onNavigateSubjects }) {
  const upcomingSchedules = [
    {
      id: 1,
      subject: 'Java OOP Exam',
      time: 'Tomorrow, 10:00 AM',
      type: 'Exam',
      color: '#6366f1',
      badge: 'Mid-term'
    },
    {
      id: 2,
      subject: 'DSA Coding Contest',
      time: 'Friday, 4:00 PM',
      type: 'Practice',
      color: '#8b5cf6',
      badge: 'Competitive'
    },
    {
      id: 3,
      subject: 'Computer Networks Quiz',
      time: 'Saturday, 11:30 AM',
      type: 'Assessment',
      color: '#06b6d4',
      badge: 'Lab Quiz'
    }
  ];

  return (
    <div className="card study-planner-card">
      <div className="card-header">
        <span className="card-title">
          <Calendar size={19} className="text-secondary" />
          <span>Study Planner</span>
        </span>
        <span className="badge planner-badge">3 Scheduled</span>
      </div>

      <div className="planner-items-list">
        {upcomingSchedules.map((item) => (
          <div key={item.id} className="planner-row-item">
            <div
              className="planner-color-strip"
              style={{ backgroundColor: item.color }}
            />
            <div className="planner-detail">
              <div className="planner-top">
                <span className="planner-subject-name">{item.subject}</span>
                <span className="planner-type-pill" style={{ color: item.color }}>
                  {item.badge}
                </span>
              </div>
              <div className="planner-meta">
                <Clock size={12} className="text-muted" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-secondary btn-sm planner-view-btn"
        onClick={onNavigateSubjects}
      >
        <span>View Academic Calendar</span>
        <ChevronRight size={14} />
      </button>

      <style>{`
        .study-planner-card {
          display: flex;
          flex-direction: column;
        }

        .planner-badge {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .planner-items-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .planner-row-item {
          display: flex;
          align-items: stretch;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: transform var(--transition-fast);
        }

        .planner-row-item:hover {
          transform: translateX(3px);
          border-color: var(--border-strong);
        }

        .planner-color-strip {
          width: 5px;
          flex-shrink: 0;
        }

        .planner-detail {
          padding: 0.65rem 0.85rem;
          flex: 1;
        }

        .planner-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .planner-subject-name {
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .planner-type-pill {
          font-size: 0.675rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .planner-meta {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .planner-view-btn {
          width: 100%;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
        }
      `}</style>
    </div>
  );
}
