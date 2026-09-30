import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Bell, 
  Clock, 
  Save, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function SettingsView({ theme, toggleTheme }) {
  const [name, setName] = useState(studentProfile.name);
  const [tagline, setTagline] = useState(studentProfile.tagline);
  const [dailyGoalHours, setDailyGoalHours] = useState('4');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="settings-view-layout">
      <div className="view-header">
        <h1 className="view-title">Settings & Preferences ⚙️</h1>
        <p className="view-subtitle">Manage your student profile, theme appearance, and study goals</p>
      </div>

      <form onSubmit={handleSaveSettings} className="settings-form">
        {/* Profile Card */}
        <div className="card settings-card">
          <div className="card-header">
            <span className="card-title">
              <User size={19} className="text-primary" />
              <span>Student Profile</span>
            </span>
          </div>

          <div className="profile-edit-row">
            <div className="avatar-preview-wrap">
              <img
                src={studentProfile.avatar}
                alt="Student Avatar"
                className="profile-big-avatar"
              />
            </div>
            <div className="profile-inputs-col">
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Academic Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Appearance & Theme */}
        <div className="card settings-card">
          <div className="card-header">
            <span className="card-title">
              {theme === 'dark' ? <Moon size={19} className="text-secondary" /> : <Sun size={19} className="text-amber" />}
              <span>Appearance & Display</span>
            </span>
          </div>

          <div className="setting-toggle-row">
            <div>
              <div className="toggle-title">Theme Preference</div>
              <div className="toggle-desc">
                Currently running in <strong>{theme === 'dark' ? 'Dark Navy' : 'Light Clean'}</strong> mode
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber" /> : <Moon size={16} className="text-primary" />}
              <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
            </button>
          </div>
        </div>

        {/* Study Parameters */}
        <div className="card settings-card">
          <div className="card-header">
            <span className="card-title">
              <Clock size={19} className="text-primary" />
              <span>Study Session Preferences</span>
            </span>
          </div>

          <div className="grid-2 settings-grid-inner">
            <div className="form-group">
              <label className="form-label">Target Daily Study Time (Hours)</label>
              <select
                className="form-input"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(e.target.value)}
              >
                <option value="2">2 Hours / day</option>
                <option value="3">3 Hours / day</option>
                <option value="4">4 Hours / day (Recommended)</option>
                <option value="6">6 Hours / day (Intensive)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Pomodoro Chime Sound</label>
              <div className="checkbox-toggle-container" onClick={() => setSoundEnabled(!soundEnabled)}>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={() => {}}
                  className="settings-checkbox"
                />
                <span className="checkbox-label-text">
                  Play gentle chime audio on session completion
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="settings-submit-bar">
          {savedSuccess && (
            <div className="save-success-pill">
              <Check size={16} />
              <span>Preferences saved successfully!</span>
            </div>
          )}
          <button type="submit" className="btn btn-primary" id="save-settings-btn">
            <Save size={16} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      <style>{`
        .settings-view-layout {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 800px;
        }

        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .profile-edit-row {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        @media (max-width: 640px) {
          .profile-edit-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        .profile-big-avatar {
          width: 72px;
          height: 72px;
          border-radius: var(--radius-full);
          object-fit: cover;
          border: 3px solid var(--primary);
        }

        .profile-inputs-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          width: 100%;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-label {
          font-size: 0.775rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .form-input {
          padding: 0.55rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-strong);
          background-color: var(--bg-surface-hover);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.875rem;
          outline: none;
          transition: border-color var(--transition-fast);
        }

        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .setting-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .toggle-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .toggle-desc {
          font-size: 0.785rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .checkbox-toggle-container {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-top: 0.35rem;
          cursor: pointer;
        }

        .settings-checkbox {
          width: 18px;
          height: 18px;
          accent-color: var(--primary);
          cursor: pointer;
        }

        .checkbox-label-text {
          font-size: 0.825rem;
          color: var(--text-secondary);
        }

        .settings-submit-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .save-success-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          background-color: rgba(16, 185, 129, 0.15);
          color: #10b981;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
