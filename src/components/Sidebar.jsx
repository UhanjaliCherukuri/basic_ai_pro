import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  BookOpen, 
  Code2, 
  BarChart3, 
  Settings, 
  Sparkles,
  GraduationCap,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'assistant', label: 'AI Assistant', icon: Bot, badge: 'Smart AI' },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, badge: '6 active' },
    { id: 'practice', label: 'Practice', icon: Code2, badge: '1 new' },
    { id: 'progress', label: 'Progress', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo Brand */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <Bot size={24} className="text-white" />
            <span className="logo-sparkle-dot"></span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Study<span className="brand-accent">AI</span></span>
            <span className="brand-badge">Demo v1.0</span>
          </div>
          {setMobileOpen && (
            <button 
              className="btn-icon mobile-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="nav-group-label">STUDY WORKSPACE</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    id={`nav-${item.id}`}
                  >
                    <div className="nav-item-content">
                      <Icon size={19} className={`nav-icon ${isActive ? 'active-icon' : ''}`} />
                      <span className="nav-label">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`nav-pill ${isActive ? 'nav-pill-active' : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick AI Pro Tip Box */}
        <div className="sidebar-promo-card">
          <div className="promo-card-header">
            <Sparkles size={16} className="text-accent" />
            <span>AI Study Copilot</span>
          </div>
          <p className="promo-card-text">
            Ask any question on Java, DSA, React, or Networks!
          </p>
          <button 
            className="btn btn-sm btn-primary w-full"
            onClick={() => handleNavClick('assistant')}
          >
            Ask AI Now
          </button>
        </div>

        {/* Bottom Student Mode Badge */}
        <div className="sidebar-footer">
          <div className="student-mode-badge">
            <div className="status-indicator-ping">
              <span className="status-dot"></span>
              <span className="status-ring"></span>
            </div>
            <div className="student-mode-text">
              <span className="mode-title">Student Mode</span>
              <span className="mode-subtitle">Workshop Session Active</span>
            </div>
            <GraduationCap size={18} className="text-secondary" />
          </div>
        </div>
      </aside>

      <style>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: var(--sidebar-width);
          background-color: var(--bg-surface);
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          z-index: 50;
          transition: transform var(--transition-normal);
        }

        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
          z-index: 45;
        }

        .sidebar-brand {
          height: var(--header-height);
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .brand-logo-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-md);
          background: var(--grad-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .logo-sparkle-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 9px;
          height: 9px;
          background-color: #10b981;
          border: 2px solid var(--bg-surface);
          border-radius: 50%;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .brand-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .brand-accent {
          background: var(--grad-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-badge {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mobile-close-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
        }

        .nav-group-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          padding: 0 0.75rem 0.65rem 0.75rem;
        }

        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .nav-item-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-item-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-icon {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .nav-item-btn:hover {
          background-color: var(--bg-surface-hover);
          color: var(--text-primary);
        }

        .nav-item-btn.active {
          background: var(--primary-light);
          color: var(--primary);
          font-weight: 700;
          border-color: rgba(99, 102, 241, 0.2);
        }

        .nav-item-btn.active .nav-icon {
          color: var(--primary);
        }

        .nav-pill {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          background-color: var(--bg-surface-hover);
          color: var(--text-muted);
        }

        .nav-pill-active {
          background-color: var(--primary);
          color: #ffffff;
        }

        .sidebar-promo-card {
          margin: 0.75rem 1rem;
          padding: 1rem;
          border-radius: var(--radius-md);
          background: var(--grad-surface);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-sm);
        }

        .promo-card-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.35rem;
        }

        .promo-card-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 0.75rem;
        }

        .w-full {
          width: 100%;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-subtle);
        }

        .student-mode-badge {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
        }

        .status-indicator-ping {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 12px;
          height: 12px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
        }

        .status-ring {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
          opacity: 0.7;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        .student-mode-text {
          display: flex;
          flex-direction: column;
          margin-left: 0.5rem;
          flex: 1;
        }

        .mode-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .mode-subtitle {
          font-size: 0.65rem;
          color: #10b981;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .sidebar-container {
            transform: translateX(-100%);
          }
          .sidebar-container.mobile-open {
            transform: translateX(0);
          }
          .mobile-close-btn {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
}
