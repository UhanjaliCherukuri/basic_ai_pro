import React, { useState } from 'react';
import { 
  BookOpen, 
  Coffee, 
  Binary, 
  Network, 
  Brain, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';

export default function SubjectsView({ onAskAIWithPrompt }) {
  const subjects = [
    {
      id: 'java',
      name: 'Java Programming',
      code: 'CS-301',
      credits: 4,
      instructor: 'Dr. Sharma',
      progress: 80,
      icon: Coffee,
      color: '#6366f1',
      description: 'Comprehensive core Java, OOP paradigms, collections framework, multithreading, and JDBC.',
      modules: [
        'Introduction & Java Syntax',
        'Object-Oriented Programming (OOP) 4 Pillars',
        'Collections Framework & Generics',
        'Exception Handling & Multithreading',
        'Java I/O & File Operations'
      ]
    },
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      code: 'CS-302',
      credits: 4,
      instructor: 'Prof. Ananya',
      progress: 60,
      icon: Binary,
      color: '#8b5cf6',
      description: 'Algorithm complexity analysis, linear and non-linear data structures, trees, graphs, and dynamic programming.',
      modules: [
        'Time & Space Complexity Big-O',
        'Arrays, Strings & Two Pointers',
        'Linked Lists, Stacks & Queues',
        'Trees & Binary Search Trees',
        'Graph Algorithms (BFS/DFS, Dijkstra)'
      ]
    },
    {
      id: 'networks',
      name: 'Computer Networks',
      code: 'CS-303',
      credits: 3,
      instructor: 'Dr. Vikram',
      progress: 50,
      icon: Network,
      color: '#06b6d4',
      description: 'Network architectures, OSI reference model, TCP/IP protocol suite, subnetting, and socket programming.',
      modules: [
        'Physical Layer & Transmission Media',
        'Data Link Layer & MAC Addressing',
        'Network Layer, IPv4/IPv6 & Routing',
        'Transport Layer: TCP vs UDP & Congestion Control',
        'Application Layer Protocols (HTTP, DNS)'
      ]
    },
    {
      id: 'ml',
      name: 'Machine Learning',
      code: 'CS-304',
      credits: 3,
      instructor: 'Dr. Kavita',
      progress: 40,
      icon: Brain,
      color: '#ec4899',
      description: 'Supervised and unsupervised learning, mathematical formulations, regressions, classification, and neural nets.',
      modules: [
        'Math Foundations: Linear Algebra & Probability',
        'Linear & Logistic Regression',
        'Decision Trees & Random Forests',
        'Unsupervised Clustering (K-Means)',
        'Introduction to Deep Neural Networks'
      ]
    },
    {
      id: 'react',
      name: 'React & Web Development',
      code: 'CS-305',
      credits: 3,
      instructor: 'Prof. Rahul',
      progress: 70,
      icon: Layers,
      color: '#10b981',
      description: 'Modern frontend development with JavaScript ES6+, React component architecture, Hooks, and REST API integration.',
      modules: [
        'Modern ES6+ JavaScript & DOM APIs',
        'React JSX & Component Lifecycles',
        'State Management & Custom Hooks',
        'React Router & Client-Side Navigation',
        'RESTful API Integration & Performance'
      ]
    },
    {
      id: 'os',
      name: 'Operating Systems',
      code: 'CS-306',
      credits: 4,
      instructor: 'Dr. Ramesh',
      progress: 65,
      icon: Cpu,
      color: '#f59e0b',
      description: 'Process management, CPU scheduling, thread synchronization, deadlocks, and virtual memory paging.',
      modules: [
        'OS Architecture & System Calls',
        'Processes, Threads & CPU Scheduling',
        'Process Synchronization & Deadlocks',
        'Virtual Memory & Page Replacement',
        'File Systems & Disk Scheduling'
      ]
    }
  ];

  return (
    <div className="subjects-view-container">
      <div className="view-header">
        <div>
          <h1 className="view-title">Enrolled Academic Subjects 📚</h1>
          <p className="view-subtitle">Semester 6 Computer Science Curriculum & Learning Modules</p>
        </div>
      </div>

      <div className="subjects-grid">
        {subjects.map((sub) => {
          const Icon = sub.icon;
          return (
            <div key={sub.id} className="card subject-detail-card">
              <div className="subject-card-head">
                <div
                  className="subject-icon-wrap"
                  style={{ backgroundColor: `${sub.color}15`, color: sub.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="subject-meta-badges">
                  <span className="badge badge-code">{sub.code}</span>
                  <span className="badge badge-credits">{sub.credits} Credits</span>
                </div>
              </div>

              <h2 className="subject-card-name">{sub.name}</h2>
              <span className="instructor-name">Instructor: {sub.instructor}</span>
              <p className="subject-card-desc">{sub.description}</p>

              {/* Progress */}
              <div className="subject-progress-box">
                <div className="progress-label-row">
                  <span>Syllabus Completion</span>
                  <strong>{sub.progress}%</strong>
                </div>
                <div className="sub-bar-track">
                  <div
                    className="sub-bar-fill"
                    style={{ width: `${sub.progress}%`, backgroundColor: sub.color }}
                  />
                </div>
              </div>

              {/* Module List Preview */}
              <div className="modules-list">
                <div className="modules-heading">Core Syllabus Modules:</div>
                {sub.modules.map((m, idx) => (
                  <div key={idx} className="module-item-row">
                    <span className="mod-number">{idx + 1}</span>
                    <span className="mod-title">{m}</span>
                  </div>
                ))}
              </div>

              {/* Ask AI button */}
              <button
                className="btn btn-primary btn-sm ask-subject-ai-btn"
                onClick={() => onAskAIWithPrompt(`Explain key concepts and exam topics in ${sub.name}`)}
              >
                <Bot size={15} />
                <span>Ask AI about {sub.name}</span>
              </button>
            </div>
          );
        })}
      </div>

      <style>{`
        .subjects-view-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .view-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .view-subtitle {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 900px) {
          .subjects-grid {
            grid-template-columns: 1fr;
          }
        }

        .subject-detail-card {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .subject-card-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .subject-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subject-meta-badges {
          display: flex;
          gap: 0.45rem;
        }

        .badge-code {
          background-color: var(--bg-surface-hover);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
        }

        .badge-credits {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .subject-card-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .instructor-name {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }

        .subject-card-desc {
          font-size: 0.825rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 1.15rem;
        }

        .subject-progress-box {
          margin-bottom: 1.15rem;
        }

        .progress-label-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-bottom: 0.35rem;
        }

        .sub-bar-track {
          height: 7px;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .sub-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
        }

        .modules-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
          padding: 0.85rem;
          background-color: var(--bg-surface-hover);
          border-radius: var(--radius-md);
        }

        .modules-heading {
          font-size: 0.725rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .module-item-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.785rem;
          color: var(--text-secondary);
        }

        .mod-number {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .ask-subject-ai-btn {
          margin-top: auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
