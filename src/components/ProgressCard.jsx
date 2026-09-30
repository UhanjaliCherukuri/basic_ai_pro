import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Calendar } from 'lucide-react';
import { subjectProgressList, weeklyActivityData } from '../data/mockData';

export default function ProgressCard() {
  const [hoveredDay, setHoveredDay] = useState(null);

  const maxHours = Math.max(...weeklyActivityData.map((d) => d.hours));
  const totalWeeklyHours = weeklyActivityData.reduce((acc, d) => acc + d.hours, 0).toFixed(1);

  return (
    <div className="card progress-card-container">
      <div className="card-header">
        <span className="card-title">
          <BarChart3 size={19} className="text-primary" />
          <span>Curriculum Mastery & Progress</span>
        </span>
        <div className="badge badge-weekly">
          <TrendingUp size={13} className="text-emerald" />
          <span>{totalWeeklyHours} hrs this week</span>
        </div>
      </div>

      <div className="progress-content-split">
        {/* Left: Subject Progress Bars */}
        <div className="subjects-bars-col">
          <div className="col-subtitle">Subject Completion Rates</div>
          <div className="bars-list">
            {subjectProgressList.map((subject) => (
              <div key={subject.name} className="subject-bar-item">
                <div className="subject-bar-header">
                  <span className="subject-name">{subject.name}</span>
                  <div className="subject-values">
                    <span className="subject-target-hint">{subject.target}</span>
                    <span className="subject-percent">{subject.progress}%</span>
                  </div>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${subject.progress}%`,
                      backgroundColor: subject.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weekly Study Hours Chart */}
        <div className="weekly-chart-col">
          <div className="col-subtitle">Weekly Activity (Hours)</div>
          <div className="chart-bars-wrap">
            {weeklyActivityData.map((item) => {
              const heightPercent = (item.hours / maxHours) * 100;
              const isHovered = hoveredDay === item.day;
              return (
                <div
                  key={item.day}
                  className="chart-col-item"
                  onMouseEnter={() => setHoveredDay(item.day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div className="bar-container-vertical">
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="chart-tooltip">
                        <strong>{item.hours}h</strong>
                        <span>{item.problems} solved</span>
                      </div>
                    )}
                    <div
                      className={`chart-bar-vertical ${item.day === 'Sat' ? 'peak-bar' : ''}`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`day-label ${item.day === 'Sat' ? 'highlight' : ''}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="chart-footer-note">
            <Calendar size={13} className="text-muted" />
            <span>Highest focus day: Saturday (6.0 hrs)</span>
          </div>
        </div>
      </div>

      <style>{`
        .progress-card-container {
          display: flex;
          flex-direction: column;
        }

        .badge-weekly {
          background-color: rgba(16, 185, 129, 0.12);
          color: #10b981;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .progress-content-split {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 2rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 900px) {
          .progress-content-split {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .col-subtitle {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.95rem;
        }

        .bars-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .subject-bar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .subject-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .subject-values {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .subject-target-hint {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .subject-percent {
          font-family: var(--font-mono);
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 34px;
          text-align: right;
        }

        .bar-track {
          width: 100%;
          height: 8px;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Vertical Bar Chart */
        .weekly-chart-col {
          display: flex;
          flex-direction: column;
        }

        .chart-bars-wrap {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 155px;
          padding: 1rem 0.5rem 0 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          position: relative;
        }

        .chart-col-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;
          flex: 1;
          cursor: pointer;
        }

        .bar-container-vertical {
          position: relative;
          width: 24px;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .chart-bar-vertical {
          width: 16px;
          background: linear-gradient(180deg, var(--primary) 0%, rgba(99, 102, 241, 0.45) 100%);
          border-radius: 4px 4px 0 0;
          transition: all var(--transition-fast);
        }

        .chart-col-item:hover .chart-bar-vertical {
          background: var(--grad-primary);
          filter: brightness(1.2);
          width: 18px;
        }

        .chart-bar-vertical.peak-bar {
          background: linear-gradient(180deg, #ec4899 0%, #8b5cf6 100%);
        }

        .chart-tooltip {
          position: absolute;
          top: -38px;
          left: 50%;
          transform: translateX(-50%);
          background: #0f172a;
          color: #ffffff;
          padding: 0.25rem 0.55rem;
          border-radius: 4px;
          font-size: 0.7rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          white-space: nowrap;
          z-index: 10;
          box-shadow: var(--shadow-md);
        }

        .chart-tooltip::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 4px 4px 0 4px;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }

        .day-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .day-label.highlight {
          color: var(--primary);
          font-weight: 700;
        }

        .chart-footer-note {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.75rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
