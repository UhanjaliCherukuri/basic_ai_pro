import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Menu, 
  Calendar, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { studentProfile } from '../data/mockData';

export default function Header({ 
  theme, 
  toggleTheme, 
  mobileOpen, 
  setMobileOpen,
  onSearchFocus
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const popoverRef = useRef(null);

  // Formatted date string
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const sampleNotifications = [
    {
      id: 1,
      title: '🎯 Daily Challenge Ready',
      desc: 'Find the largest element in an array (10 pts)',
      time: '10m ago',
      unread: true
    },
    {
      id: 2,
      title: '🔥 7-Day Streak Achieved!',
      desc: 'You unlocked the Consistent Scholar badge',
      time: '2h ago',
      unread: true
    },
    {
      id: 3,
      title: '📚 Java OOP Exam Reminder',
      desc: 'College assessment scheduled for next week',
      time: '1d ago',
      unread: false
    }
  ];

  // Close notifications popover on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setUnreadCount(0);
  };

  return (
    <header className="top-header">
      {/* Left: Mobile Toggle & Search */}
      <div className="header-left">
        <button
          className="btn-icon mobile-menu-trigger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          id="mobile-menu-toggle"
        >
          <Menu size={20} />
        </button>

        <div className="search-bar-container">
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search subjects, DSA topics, formulas... (Ctrl + K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onSearchFocus}
            id="global-search-input"
          />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      {/* Right: Date, Theme Toggle, Notifications, User Profile */}
      <div className="header-right">
        {/* Date Display */}
        <div className="date-badge">
          <Calendar size={14} className="text-secondary" />
          <span>{dateFormatted}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="btn-icon theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          id="theme-toggle-btn"
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? (
            <Sun size={19} className="theme-icon sun-icon" />
          ) : (
            <Moon size={19} className="theme-icon moon-icon" />
          )}
        </button>

        {/* Notifications Button & Dropdown */}
        <div className="notification-wrapper" ref={popoverRef}>
          <button
            className="btn-icon notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            id="notifications-btn"
          >
            <Bell size={19} />
            {unreadCount > 0 && (
              <span className="notification-dot">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-popover">
              <div className="popover-header">
                <div>
                  <h4 className="popover-title">Notifications</h4>
                  <span className="popover-subtitle">{unreadCount} unread alerts</span>
                </div>
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={markAllRead}>
                    <Check size={14} /> Mark all read
                  </button>
                )}
              </div>
              <div className="popover-list">
                {sampleNotifications.map((n) => (
                  <div key={n.id} className={`popover-item ${n.unread ? 'unread' : ''}`}>
                    <div className="item-title-row">
                      <span className="item-title">{n.title}</span>
                      <span className="item-time">{n.time}</span>
                    </div>
                    <p className="item-desc">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar & Name */}
        <div className="user-profile-header">
          <div className="avatar-wrapper">
            <img
              src={studentProfile.avatar}
              alt={studentProfile.name}
              className="user-avatar"
            />
            <span className="online-indicator"></span>
          </div>
          <div className="user-info">
            <span className="user-name">{studentProfile.name}</span>
            <span className="user-role">Student</span>
          </div>
        </div>
      </div>

      <style>{`
        .top-header {
          height: var(--header-height);
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(10px);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          max-width: 520px;
        }

        .mobile-menu-trigger {
          display: none;
          background: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          color: var(--text-primary);
          cursor: pointer;
        }

        .search-bar-container {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 0.9rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          height: 40px;
          padding: 0 3rem 0 2.5rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--text-primary);
          outline: none;
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          border-color: var(--primary);
          background-color: var(--bg-surface);
          box-shadow: 0 0 0 3px var(--primary-glow);
        }

        .search-input::placeholder {
          color: var(--text-muted);
          font-size: 0.825rem;
        }

        .search-kbd {
          position: absolute;
          right: 0.75rem;
          padding: 0.15rem 0.45rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.675rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }

        .date-badge {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.4rem 0.8rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          font-size: 0.785rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .theme-toggle-btn, .notification-btn {
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle-btn:hover, .notification-btn:hover {
          background-color: var(--border-subtle);
          color: var(--text-primary);
        }

        .sun-icon {
          color: #f59e0b;
        }

        .moon-icon {
          color: #6366f1;
        }

        .notification-wrapper {
          position: relative;
        }

        .notification-dot {
          position: absolute;
          top: -3px;
          right: -3px;
          min-width: 17px;
          height: 17px;
          padding: 0 4px;
          background-color: var(--accent-rose);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--bg-surface);
        }

        .notifications-popover {
          position: absolute;
          top: calc(100% + 0.65rem);
          right: 0;
          width: 320px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          padding: 1rem;
          z-index: 100;
          animation: slideDown 0.2s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .popover-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 0.75rem;
        }

        .popover-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .popover-subtitle {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .mark-read-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--primary);
          cursor: pointer;
          font-weight: 600;
        }

        .popover-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .popover-item {
          padding: 0.6rem;
          border-radius: var(--radius-sm);
          background-color: var(--bg-surface-hover);
          transition: background var(--transition-fast);
        }

        .popover-item.unread {
          border-left: 3px solid var(--primary);
          background-color: var(--primary-light);
        }

        .item-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }

        .item-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .item-time {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .item-desc {
          font-size: 0.73rem;
          color: var(--text-secondary);
          line-height: 1.3;
        }

        .user-profile-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 0.5rem;
          border-left: 1px solid var(--border-subtle);
        }

        .avatar-wrapper {
          position: relative;
        }

        .user-avatar {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          object-fit: cover;
          border: 2px solid var(--primary);
        }

        .online-indicator {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 9px;
          height: 9px;
          background-color: #10b981;
          border-radius: 50%;
          border: 2px solid var(--bg-surface);
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .user-role {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .mobile-menu-trigger {
            display: inline-flex;
          }
          .top-header {
            padding: 0 1.25rem;
          }
        }

        @media (max-width: 768px) {
          .date-badge {
            display: none;
          }
          .search-kbd {
            display: none;
          }
          .user-info {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
