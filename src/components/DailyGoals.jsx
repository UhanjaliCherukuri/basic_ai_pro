import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus, Sparkles } from 'lucide-react';
import { initialDailyGoals } from '../data/mockData';

export default function DailyGoals() {
  const [goals, setGoals] = useState(initialDailyGoals);
  const [newGoalText, setNewGoalText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const toggleGoal = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal = {
      id: Date.now(),
      text: newGoalText.trim(),
      completed: false
    };
    setGoals([...goals, newGoal]);
    setNewGoalText('');
    setShowInput(false);
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = Math.round((completedCount / (goals.length || 1)) * 100);

  return (
    <div className="card daily-goals-card">
      <div className="card-header">
        <span className="card-title">
          <Target size={19} className="text-secondary" />
          <span>Daily Goals</span>
        </span>
        <span className="badge goals-count-badge">
          {completedCount} / {goals.length} Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="goal-progress-wrap">
        <div className="goal-progress-bar">
          <div
            className="goal-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="goal-percent-text">{progressPercent}% Achieved today</div>
      </div>

      {/* Goal Items */}
      <div className="goals-list">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-item ${goal.completed ? 'completed' : ''}`}
            onClick={() => toggleGoal(goal.id)}
          >
            <button className="goal-checkbox" aria-label="Toggle goal">
              {goal.completed ? (
                <CheckCircle2 size={18} className="text-emerald" />
              ) : (
                <Circle size={18} className="text-muted" />
              )}
            </button>
            <span className="goal-text">{goal.text}</span>
          </div>
        ))}
      </div>

      {/* Add New Goal */}
      {showInput ? (
        <form onSubmit={handleAddGoal} className="add-goal-form">
          <input
            type="text"
            className="add-goal-input"
            placeholder="Add new study goal..."
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            autoFocus
          />
          <div className="form-btns">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowInput(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </form>
      ) : (
        <button
          className="btn btn-ghost btn-sm add-goal-trigger-btn"
          onClick={() => setShowInput(true)}
        >
          <Plus size={15} />
          <span>Add Study Goal</span>
        </button>
      )}

      <style>{`
        .daily-goals-card {
          display: flex;
          flex-direction: column;
        }

        .goals-count-badge {
          background-color: rgba(139, 92, 246, 0.12);
          color: var(--secondary);
        }

        .goal-progress-wrap {
          margin-bottom: 1.15rem;
        }

        .goal-progress-bar {
          height: 7px;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .goal-progress-fill {
          height: 100%;
          background: var(--grad-accent);
          border-radius: var(--radius-full);
          transition: width 0.4s ease;
        }

        .goal-percent-text {
          font-size: 0.725rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
          font-weight: 600;
          text-align: right;
        }

        .goals-list {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1rem;
        }

        .goal-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.5rem 0.65rem;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .goal-item:hover {
          border-color: var(--border-strong);
        }

        .goal-checkbox {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
        }

        .goal-text {
          font-size: 0.825rem;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          flex: 1;
        }

        .goal-item.completed .goal-text {
          text-decoration: line-through;
          color: var(--text-muted);
        }

        .text-emerald {
          color: #10b981;
        }

        .add-goal-trigger-btn {
          width: 100%;
          border: 1px dashed var(--border-strong);
          color: var(--text-secondary);
          margin-top: auto;
        }

        .add-goal-trigger-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .add-goal-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: auto;
        }

        .add-goal-input {
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-strong);
          background: var(--bg-surface-hover);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.825rem;
          outline: none;
        }

        .add-goal-input:focus {
          border-color: var(--primary);
        }

        .form-btns {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
}
