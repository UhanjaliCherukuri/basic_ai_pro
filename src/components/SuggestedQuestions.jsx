import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import { suggestedQuestionsList } from '../data/aiResponses';

export default function SuggestedQuestions({ onSelectQuestion, disabled }) {
  return (
    <div className="suggested-questions-container">
      <div className="suggested-header">
        <Sparkles size={15} className="text-secondary" />
        <span>Suggested Study Prompts:</span>
      </div>
      <div className="suggested-pills-wrap">
        {suggestedQuestionsList.map((question, index) => (
          <button
            key={index}
            className="suggestion-pill-btn"
            onClick={() => onSelectQuestion(question)}
            disabled={disabled}
            id={`suggested-q-${index}`}
          >
            <MessageSquare size={13} className="pill-icon" />
            <span>{question}</span>
          </button>
        ))}
      </div>

      <style>{`
        .suggested-questions-container {
          margin-bottom: 1.25rem;
          padding: 0.85rem 1rem;
          background-color: var(--bg-surface-hover);
          border: 1px dashed var(--border-strong);
          border-radius: var(--radius-md);
        }

        .suggested-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.785rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.65rem;
        }

        .suggested-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .suggestion-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.85rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }

        .suggestion-pill-btn:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--primary-light);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px var(--primary-glow);
        }

        .suggestion-pill-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pill-icon {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
