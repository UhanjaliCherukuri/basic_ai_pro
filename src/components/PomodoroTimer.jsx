import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, Volume2, Sparkles } from 'lucide-react';

export default function PomodoroTimer() {
  const MODES = {
    focus: { name: 'Focus', duration: 25 * 60, color: 'var(--primary)' },
    shortBreak: { name: 'Short Break', duration: 5 * 60, color: 'var(--accent-emerald)' },
    longBreak: { name: 'Long Break', duration: 15 * 60, color: 'var(--accent-cyan)' }
  };

  const [currentMode, setCurrentMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(MODES.focus.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);
  const intervalRef = useRef(null);

  // Play a soft synthetic chime when timer completes
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playChime();
            if (currentMode === 'focus') {
              setSessionsCompleted((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, currentMode]);

  const handleModeChange = (modeKey) => {
    setIsRunning(false);
    setCurrentMode(modeKey);
    setTimeLeft(MODES[modeKey].duration);
  };

  const handleTogglePlay = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(MODES[currentMode].duration);
  };

  // Format MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Calculate percentage
  const total = MODES[currentMode].duration;
  const percentCompleted = ((total - timeLeft) / total) * 100;

  return (
    <div className="card pomodoro-card">
      <div className="card-header">
        <span className="card-title">
          <Clock size={19} className="text-primary" />
          <span>Pomodoro Timer</span>
        </span>
        <span className="badge pomodoro-badge">
          {sessionsCompleted} Sessions Done
        </span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="timer-mode-tabs">
        {Object.entries(MODES).map(([key, val]) => (
          <button
            key={key}
            className={`timer-tab-btn ${currentMode === key ? 'active' : ''}`}
            onClick={() => handleModeChange(key)}
          >
            {val.name}
          </button>
        ))}
      </div>

      {/* Timer Clock Face */}
      <div className="timer-display-wrap">
        <div className="timer-ring-container">
          <svg className="timer-svg" viewBox="0 0 160 160">
            <circle
              className="timer-bg-circle"
              cx="80"
              cy="80"
              r="70"
            />
            <circle
              className="timer-progress-circle"
              cx="80"
              cy="80"
              r="70"
              style={{
                strokeDashoffset: `${440 - (440 * percentCompleted) / 100}`
              }}
            />
          </svg>
          <div className="timer-time-center">
            <div className="timer-numbers">{timeFormatted}</div>
            <div className="timer-status-label">
              {isRunning ? '🔥 Focus Time' : 'Paused'}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="timer-controls-row">
        <button
          className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'} timer-play-btn`}
          onClick={handleTogglePlay}
          id="pomodoro-toggle-btn"
        >
          {isRunning ? (
            <>
              <Pause size={17} /> Pause
            </>
          ) : (
            <>
              <Play size={17} /> Start
            </>
          )}
        </button>

        <button
          className="btn btn-secondary timer-reset-btn"
          onClick={handleReset}
          title="Reset Timer"
          id="pomodoro-reset-btn"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <style>{`
        .pomodoro-card {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .pomodoro-badge {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .timer-mode-tabs {
          display: flex;
          background-color: var(--bg-surface-hover);
          padding: 0.25rem;
          border-radius: var(--radius-md);
          margin-bottom: 1.25rem;
          gap: 0.25rem;
        }

        .timer-tab-btn {
          flex: 1;
          padding: 0.45rem 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.775rem;
          font-weight: 600;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .timer-tab-btn.active {
          background-color: var(--bg-surface);
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        .timer-display-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.75rem 0 1.25rem 0;
        }

        .timer-ring-container {
          position: relative;
          width: 170px;
          height: 170px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .timer-bg-circle {
          fill: none;
          stroke: var(--border-subtle);
          stroke-width: 8;
        }

        .timer-progress-circle {
          fill: none;
          stroke: var(--primary);
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 440;
          transition: stroke-dashoffset 0.8s ease-in-out;
        }

        .timer-time-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .timer-numbers {
          font-family: var(--font-mono);
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .timer-status-label {
          font-size: 0.725rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.15rem;
        }

        .timer-controls-row {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .timer-play-btn {
          flex: 2;
        }

        .timer-reset-btn {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
