import React, { useState } from 'react';
import { FileText, Plus, Trash2, Tag } from 'lucide-react';
import { initialQuickNotes } from '../data/mockData';

export default function QuickNotes() {
  const [notes, setNotes] = useState(initialQuickNotes);
  const [isAdding, setIsAdding] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;

    const newNote = {
      id: Date.now(),
      title: noteTitle.trim(),
      content: noteContent.trim(),
      date: 'Just now',
      tag: 'Revision'
    };

    setNotes([newNote, ...notes]);
    setNoteTitle('');
    setNoteContent('');
    setIsAdding(false);
  };

  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="card quick-notes-card">
      <div className="card-header">
        <span className="card-title">
          <FileText size={19} className="text-primary" />
          <span>Quick Notes</span>
        </span>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsAdding(!isAdding)}
          id="add-note-btn"
        >
          <Plus size={15} />
          <span>{isAdding ? 'Close' : 'New Note'}</span>
        </button>
      </div>

      {/* Note Creation Box */}
      {isAdding && (
        <form onSubmit={handleAddNote} className="note-creation-form">
          <input
            type="text"
            className="note-title-input"
            placeholder="Topic title (e.g., Quick Formula)..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="note-body-textarea"
            rows="2"
            placeholder="Write key point or snippet here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
          />
          <div className="note-form-actions">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save Note
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      <div className="notes-list-wrap">
        {notes.length === 0 ? (
          <div className="no-notes-placeholder">No notes saved yet. Add one above!</div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card-item">
              <div className="note-item-header">
                <span className="note-item-title">{note.title}</span>
                <button
                  className="delete-note-btn"
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  title="Delete Note"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <p className="note-item-content">{note.content}</p>
              <div className="note-item-footer">
                <span className="note-tag-badge">
                  <Tag size={10} /> {note.tag}
                </span>
                <span className="note-time-label">{note.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        .quick-notes-card {
          display: flex;
          flex-direction: column;
        }

        .note-creation-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          margin-bottom: 0.85rem;
        }

        .note-title-input {
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-strong);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.825rem;
          outline: none;
        }

        .note-body-textarea {
          padding: 0.4rem 0.6rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-strong);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.8rem;
          resize: none;
          outline: none;
        }

        .note-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .notes-list-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          max-height: 230px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }

        .note-card-item {
          padding: 0.75rem;
          background-color: var(--bg-surface-hover);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: border-color var(--transition-fast);
        }

        .note-card-item:hover {
          border-color: var(--border-strong);
        }

        .note-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .note-item-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .delete-note-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          border-radius: 4px;
        }

        .delete-note-btn:hover {
          color: var(--accent-rose);
        }

        .note-item-content {
          font-size: 0.785rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .note-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .note-tag-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.675rem;
          font-weight: 600;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-full);
        }

        .note-time-label {
          font-size: 0.675rem;
          color: var(--text-muted);
        }

        .no-notes-placeholder {
          text-align: center;
          padding: 1.5rem 0;
          color: var(--text-muted);
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
