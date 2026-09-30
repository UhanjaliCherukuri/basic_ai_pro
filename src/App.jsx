import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import SubjectsView from './components/SubjectsView';
import PracticeView from './components/PracticeView';
import ProgressView from './components/ProgressView';
import SettingsView from './components/SettingsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prefilledQuery, setPrefilledQuery] = useState('');

  // Dark/Light Theme state with localStorage persistence
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('studyai-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('studyai-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAskAIWithPrompt = (promptText) => {
    setPrefilledQuery(promptText);
    setActiveTab('assistant');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onNavigateTab={setActiveTab}
            onAskAIWithPrompt={handleAskAIWithPrompt}
          />
        );
      case 'assistant':
        return <ChatAssistant initialPrompt={prefilledQuery} />;
      case 'subjects':
        return <SubjectsView onAskAIWithPrompt={handleAskAIWithPrompt} />;
      case 'practice':
        return <PracticeView onAskAIWithPrompt={handleAskAIWithPrompt} />;
      case 'progress':
        return <ProgressView />;
      case 'settings':
        return <SettingsView theme={theme} toggleTheme={toggleTheme} />;
      default:
        return (
          <Dashboard
            onNavigateTab={setActiveTab}
            onAskAIWithPrompt={handleAskAIWithPrompt}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onSearchFocus={() => setActiveTab('assistant')}
        />

        <main className="page-container">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
}
