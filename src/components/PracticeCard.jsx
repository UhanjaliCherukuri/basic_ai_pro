import React, { useState } from 'react';
import { 
  Code2, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Play, 
  X, 
  Sparkles,
  ChevronRight,
  Terminal
} from 'lucide-react';
import { todayPracticeChallenge } from '../data/mockData';

export default function PracticeCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleRunCode = () => {
    setIsRunningTest(true);
    setTestResult(null);

    setTimeout(() => {
      setIsRunningTest(false);
      setTestResult({
        success: true,
        output: 'Output: 5\nExpected: 5\nPassed all 2 test cases (12ms, faster than 94.2% of submissions)',
        scoreEarned: 10
      });
    }, 800);
  };

  return (
    <>
      <div className="card practice-card">
        <div className="card-header">
          <div className="practice-header-left">
            <span className="card-title">
              <Code2 size={19} className="text-secondary" />
              <span>Today's Challenge</span>
            </span>
          </div>
          <span className="badge badge-easy">
            {todayPracticeChallenge.difficulty}
          </span>
        </div>

        <div className="practice-question-body">
          <h3 className="challenge-title">{todayPracticeChallenge.title}</h3>
          <p className="challenge-desc">{todayPracticeChallenge.description}</p>
        </div>

        {/* Challenge Meta Pills */}
        <div className="challenge-meta-row">
          <div className="meta-pill">
            <span className="pill-dot"></span>
            <span>{todayPracticeChallenge.topic}</span>
          </div>
          <div className="meta-pill points-pill">
            <Trophy size={13} className="text-amber" />
            <span>+{todayPracticeChallenge.points} Points</span>
          </div>
          <div className="meta-pill">
            <Clock size={13} className="text-muted" />
            <span>{todayPracticeChallenge.timeEstimate}</span>
          </div>
        </div>

        {/* Start Button */}
        <button
          className="btn btn-primary start-practice-btn"
          onClick={() => setModalOpen(true)}
          id="start-practice-btn"
        >
          <span>Start Practice</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Interactive Practice Demo Modal */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Code2 size={20} className="text-primary" />
                <h3 className="modal-title">{todayPracticeChallenge.title}</h3>
                <span className="badge badge-easy">{todayPracticeChallenge.difficulty}</span>
              </div>
              <button
                className="btn-icon modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-desc">{todayPracticeChallenge.description}</p>

              <div className="code-editor-sim">
                <div className="code-editor-header">
                  <div className="editor-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="editor-filename">Solution.java</span>
                  <span className="editor-lang">Java 17</span>
                </div>
                <pre className="code-editor-content">
                  <code>{todayPracticeChallenge.codeStarter}</code>
                </pre>
              </div>

              {/* Test Runner Status */}
              {testResult && (
                <div className="test-result-box success">
                  <div className="result-header">
                    <CheckCircle size={16} className="text-emerald" />
                    <strong>Challenge Solved! All test cases passed.</strong>
                  </div>
                  <pre className="result-details">{testResult.output}</pre>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <span className="demo-notice">
                <Sparkles size={14} className="text-secondary" /> Interactive College Demo Runner
              </span>
              <div className="footer-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleRunCode}
                  disabled={isRunningTest}
                >
                  {isRunningTest ? (
                    <>Running Tests...</>
                  ) : (
                    <>
                      <Play size={14} /> Run & Submit
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .practice-card {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .badge-easy {
          background-color: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .challenge-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.4rem;
        }

        .challenge-desc {
          font-size: 0.825rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .challenge-meta-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-bottom: 1.25rem;
        }

        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.65rem;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--secondary);
        }

        .points-pill {
          background-color: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
        }

        .start-practice-btn {
          width: 100%;
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        /* Modal Styles */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
          animation: modalFade 0.2s ease-out;
        }

        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-window {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 650px;
          box-shadow: var(--shadow-xl);
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow: hidden;
        }

        .modal-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }

        .modal-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .modal-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
        }

        .modal-body {
          padding: 1.5rem;
          overflow-y: auto;
        }

        .modal-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .code-editor-sim {
          background-color: #0b0f19;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 1rem;
        }

        .code-editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 1rem;
          background-color: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .editor-dots {
          display: flex;
          gap: 6px;
        }

        .editor-dots .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot.red { background: #ef4444; }
        .dot.yellow { background: #f59e0b; }
        .dot.green { background: #10b981; }

        .editor-filename {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .editor-lang {
          font-size: 0.7rem;
          color: #6366f1;
          font-weight: 600;
        }

        .code-editor-content {
          padding: 1rem;
          color: #e2e8f0;
          font-family: var(--font-mono);
          font-size: 0.825rem;
          line-height: 1.5;
          overflow-x: auto;
        }

        .test-result-box {
          padding: 0.85rem 1rem;
          border-radius: var(--radius-md);
          background-color: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          margin-top: 1rem;
        }

        .result-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-size: 0.875rem;
          margin-bottom: 0.4rem;
        }

        .result-details {
          font-family: var(--font-mono);
          font-size: 0.775rem;
          color: var(--text-secondary);
          white-space: pre-wrap;
        }

        .modal-footer {
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-hover);
        }

        .demo-notice {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .footer-actions {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </>
  );
}
