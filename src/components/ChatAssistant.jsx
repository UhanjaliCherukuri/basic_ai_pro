import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  HelpCircle, 
  ArrowDown, 
  BookOpen,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import SuggestedQuestions from './SuggestedQuestions';
import { findAIResponse } from '../data/aiResponses';

export default function ChatAssistant({ embedded = false, initialPrompt = '' }) {
  const initialMessage = {
    id: 'msg-0',
    sender: 'ai',
    text: "Hi Uhanjali! 👋 I'm your AI Study Assistant. I can help you understand concepts, practice coding, prepare for exams, and create study plans.",
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasTriggeredPromptRef = useRef(false);

  // Auto-scroll to bottom of chat
  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && !hasTriggeredPromptRef.current) {
      hasTriggeredPromptRef.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: timeStr
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Realistic typing delay for workshop presentation (600ms - 900ms)
    setTimeout(() => {
      const aiReplyText = findAIResponse(query);
      const aiMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 750);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className={`ai-assistant-wrapper ${embedded ? 'embedded-mode' : 'fullscreen-mode'}`}>
      {/* Header */}
      <div className="chat-assistant-header">
        <div className="header-info">
          <div className="chat-bot-icon">
            <Bot size={24} className="text-white" />
            <span className="ai-active-indicator"></span>
          </div>
          <div>
            <h2 className="chat-header-title">AI Study Assistant 🤖</h2>
            <p className="chat-header-subtitle">Ask me anything about your studies.</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleClearChat}
            title="Reset Chat"
            id="clear-chat-btn"
          >
            <Trash2 size={15} />
            <span className="hide-on-mobile">Reset</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions */}
      <SuggestedQuestions 
        onSelectQuestion={(q) => handleSendMessage(q)} 
        disabled={isTyping} 
      />

      {/* Messages Scroll Area */}
      <div className="chat-messages-container">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* AI Typing Indicator */}
        {isTyping && (
          <div className="chat-message-row message-ai typing-row">
            <div className="message-avatar ai-avatar">
              <Bot size={18} className="text-white" />
            </div>
            <div className="typing-bubble">
              <span className="typing-text">AI is thinking</span>
              <div className="typing-dots-container">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box Area */}
      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <textarea
            ref={inputRef}
            className="chat-textarea"
            rows="1"
            placeholder="Type your study question (e.g., Explain Java OOP or Give me a DSA problem)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            id="chat-user-input"
          />
          <button
            className="chat-send-btn"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            id="chat-send-btn"
            aria-label="Send message"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="input-hint-row">
          <span>Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line</span>
          <span className="hint-pill">Offline AI Demo Mode</span>
        </div>
      </div>

      <style>{`
        .ai-assistant-wrapper {
          display: flex;
          flex-direction: column;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          overflow: hidden;
        }

        .fullscreen-mode {
          height: calc(100vh - var(--header-height) - 4rem);
          min-height: 580px;
        }

        .embedded-mode {
          height: 600px;
        }

        @media (max-width: 768px) {
          .fullscreen-mode {
            height: calc(100vh - var(--header-height) - 2.5rem);
            min-height: 500px;
          }
        }

        .chat-assistant-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid var(--border-subtle);
          background: var(--grad-surface);
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chat-bot-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .ai-active-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #10b981;
          border: 2px solid var(--bg-surface);
        }

        .chat-header-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .chat-header-subtitle {
          font-size: 0.825rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .chat-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .typing-row {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 1.15rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          border-top-left-radius: 4px;
        }

        .typing-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .typing-dots-container {
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .chat-input-wrapper {
          padding: 1rem 1.75rem 1.25rem 1.75rem;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
        }

        .chat-input-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-lg);
          padding: 0.5rem 0.75rem 0.5rem 1rem;
          transition: all var(--transition-fast);
        }

        .chat-input-container:focus-within {
          border-color: var(--primary);
          background-color: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .chat-textarea {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          color: var(--text-primary);
          resize: none;
          outline: none;
          line-height: 1.4;
          max-height: 120px;
        }

        .chat-textarea::placeholder {
          color: var(--text-muted);
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--grad-primary);
          color: #ffffff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
          flex-shrink: 0;
          box-shadow: 0 2px 8px var(--primary-glow);
        }

        .chat-send-btn:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .input-hint-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.725rem;
          color: var(--text-muted);
          padding: 0 0.25rem;
        }

        .hint-pill {
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .hide-on-mobile {
            display: none;
          }
          .chat-messages-container {
            padding: 1rem;
          }
          .chat-input-wrapper {
            padding: 0.75rem 1rem;
          }
          .input-hint-row span:first-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
