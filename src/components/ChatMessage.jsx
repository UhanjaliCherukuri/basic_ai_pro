import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function ChatMessage({ message }) {
  const isAI = message.sender === 'ai';
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render formatted markdown-like text
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Check if message has code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.slice(3, -3).trim().split('\n');
        let lang = 'code';
        let codeBody = part.slice(3, -3).trim();

        if (lines.length > 0 && /^[a-zA-Z0-9]+$/.test(lines[0].trim())) {
          lang = lines[0].trim();
          codeBody = lines.slice(1).join('\n');
        }

        return (
          <div key={index} className="code-snippet-box">
            <div className="code-header-bar">
              <span className="code-lang-tag">{lang.toUpperCase()}</span>
              <button
                className="code-copy-btn"
                onClick={() => copyToClipboard(codeBody)}
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} /> Copy
                  </>
                )}
              </button>
            </div>
            <pre>
              <code>{codeBody}</code>
            </pre>
          </div>
        );
      }

      // Format standard text: lines, bullet points, bolding, inline code
      const paragraphs = part.split('\n');
      return (
        <div key={index} className="text-block">
          {paragraphs.map((line, pIndex) => {
            const trimmed = line.trim();
            if (!trimmed) {
              return <div key={pIndex} className="line-break" />;
            }

            // Heading 3
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={pIndex} className="chat-heading-3">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            // Heading 4
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={pIndex} className="chat-heading-4">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }

            // Bullet point
            if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
              return (
                <div key={pIndex} className="chat-bullet-row">
                  <span className="bullet-dot">•</span>
                  <span>{parseInlineStyles(trimmed.slice(2))}</span>
                </div>
              );
            }

            // Numbered list
            const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
            if (numMatch) {
              return (
                <div key={pIndex} className="chat-numbered-row">
                  <span className="numbered-badge">{numMatch[1]}.</span>
                  <span>{parseInlineStyles(numMatch[2])}</span>
                </div>
              );
            }

            // Quote / callout
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote key={pIndex} className="chat-quote">
                  {parseInlineStyles(trimmed.slice(2))}
                </blockquote>
              );
            }

            // Table rows simple support
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
              // skip markdown divider row
              if (trimmed.includes('---')) return null;
              const cells = trimmed
                .split('|')
                .filter((_, i, arr) => i !== 0 && i !== arr.length - 1)
                .map((c) => c.trim());
              return (
                <div key={pIndex} className="chat-table-row">
                  {cells.map((cell, cIdx) => (
                    <span key={cIdx} className="chat-table-cell">
                      {parseInlineStyles(cell)}
                    </span>
                  ))}
                </div>
              );
            }

            return (
              <p key={pIndex} className="chat-paragraph">
                {parseInlineStyles(line)}
              </p>
            );
          })}
        </div>
      );
    });
  };

  // Helper to parse bold **text** and inline `code`
  const parseInlineStyles = (text) => {
    if (!text) return '';
    const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return tokens.map((token, i) => {
      if (token.startsWith('`') && token.endsWith('`')) {
        return (
          <code key={i} className="inline-code">
            {token.slice(1, -1)}
          </code>
        );
      }
      if (token.startsWith('**') && token.endsWith('**')) {
        return (
          <strong key={i} className="strong-text">
            {token.slice(2, -2)}
          </strong>
        );
      }
      return token;
    });
  };

  return (
    <div className={`chat-message-row ${isAI ? 'message-ai' : 'message-user'}`}>
      {/* AI Avatar */}
      {isAI && (
        <div className="message-avatar ai-avatar">
          <Bot size={18} className="text-white" />
        </div>
      )}

      {/* Bubble Container */}
      <div className="message-bubble-wrapper">
        <div className="message-header-meta">
          <span className="sender-name">
            {isAI ? 'StudyAI Assistant' : studentProfile.name}
          </span>
          <span className="message-timestamp">{message.timestamp || 'Just now'}</span>
        </div>

        <div className={`message-bubble ${isAI ? 'bubble-ai' : 'bubble-user'}`}>
          <div className="message-body">
            {renderFormattedContent(message.text)}
          </div>

          {isAI && (
            <div className="bubble-actions">
              <button
                className="action-icon-btn"
                onClick={() => copyToClipboard(message.text)}
                title="Copy response"
              >
                {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {!isAI && (
        <div className="message-avatar user-avatar-container">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="user-msg-avatar"
          />
        </div>
      )}

      <style>{`
        .chat-message-row {
          display: flex;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
          width: 100%;
          animation: messageFadeIn 0.25s ease-out;
        }

        @keyframes messageFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message-ai {
          justify-content: flex-start;
        }

        .message-user {
          justify-content: flex-end;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ai-avatar {
          background: var(--grad-primary);
          box-shadow: 0 4px 10px var(--primary-glow);
        }

        .user-avatar-container {
          overflow: hidden;
          border-radius: var(--radius-full);
          border: 2px solid var(--primary);
        }

        .user-msg-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .message-bubble-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 82%;
        }

        @media (max-width: 768px) {
          .message-bubble-wrapper {
            max-width: 90%;
          }
        }

        .message-user .message-bubble-wrapper {
          align-items: flex-end;
        }

        .message-header-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .sender-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .message-bubble {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-lg);
          font-size: 0.925rem;
          line-height: 1.6;
          position: relative;
          word-break: break-word;
        }

        .bubble-ai {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          border-top-left-radius: 4px;
          box-shadow: var(--shadow-sm);
        }

        .bubble-user {
          background: var(--grad-primary);
          color: #ffffff;
          border-top-right-radius: 4px;
          box-shadow: 0 4px 14px var(--primary-glow);
        }

        .bubble-user .inline-code {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .chat-heading-3 {
          font-size: 1.05rem;
          font-weight: 700;
          margin: 0.75rem 0 0.4rem 0;
          color: var(--primary);
        }

        .chat-heading-4 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0.6rem 0 0.3rem 0;
          color: var(--text-primary);
        }

        .chat-paragraph {
          margin-bottom: 0.5rem;
        }

        .chat-bullet-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
          padding-left: 0.5rem;
        }

        .bullet-dot {
          color: var(--primary);
          font-weight: bold;
        }

        .chat-numbered-row {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.4rem;
          padding-left: 0.25rem;
        }

        .numbered-badge {
          font-weight: 700;
          color: var(--primary);
        }

        .chat-quote {
          border-left: 3px solid var(--primary);
          padding-left: 0.85rem;
          margin: 0.5rem 0;
          color: var(--text-secondary);
          font-style: italic;
          background: var(--bg-surface-hover);
          padding: 0.5rem 0.85rem;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }

        .chat-table-row {
          display: flex;
          border-bottom: 1px solid var(--border-subtle);
          padding: 0.4rem 0;
          font-size: 0.825rem;
        }

        .chat-table-cell {
          flex: 1;
          padding: 0 0.5rem;
        }

        .strong-text {
          font-weight: 700;
        }

        .line-break {
          height: 0.5rem;
        }

        .bubble-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .action-icon-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 0.725rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .action-icon-btn:hover {
          background-color: var(--bg-surface-hover);
          color: var(--text-primary);
        }

        .code-snippet-box {
          background-color: #0b0f19;
          color: #f8fafc;
          border-radius: var(--radius-md);
          padding: 0.85rem;
          margin: 0.75rem 0;
          font-family: var(--font-mono);
          font-size: 0.825rem;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .code-lang-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #818cf8;
          letter-spacing: 0.05em;
        }

        .code-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: #e2e8f0;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .code-copy-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .text-emerald {
          color: #10b981;
        }
      `}</style>
    </div>
  );
}
