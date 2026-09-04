import { useState } from 'react';

function ContentView({ item, isBookmarked, onToggleBookmark }) {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = async () => {
    const textToCopy = `${item.title}\n\nSubject: ${item.subject} | Branch: ${item.branch} | Year: ${item.year}\n\nContent:\n${item.content}\n\nStudy Notes:\n${item.notes || 'N/A'}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const fileContent = `===============================================================
${item.title.toUpperCase()}
Subject: ${item.subject} | Branch: ${item.branch} | Semester: ${item.semester || 'N/A'} | Year: ${item.year}
===============================================================

${item.content}

===============================================================
EXAM TIPS & SOLUTIONS / NOTES:
===============================================================
${item.notes || 'No extra notes provided.'}

---------------------------------------------------------------
Downloaded from Khoje Khatam Study Portal
https://harsh927995.github.io/web_dev/
---------------------------------------------------------------`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id || 'question-paper'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <article className="content-view">
      <header className="content-view-header">
        <div className="view-header-top">
          <div className="badge-section">
            <span className={`content-badge ${item.type === 'PYQ' ? 'pyq-badge' : 'notes-badge'}`}>
              {item.type === 'PYQ' ? '📋 PAST YEAR QUESTION' : '📖 CLASS NOTES'}
            </span>
            <span className="year-badge">Exam {item.year}</span>
            {item.semester && <span className="year-badge">Semester {item.semester}</span>}
            <span className="branch-tag">{item.branch}</span>
          </div>

          <div className="content-actions">
            <button 
              type="button" 
              className="action-icon-btn download-btn" 
              onClick={handleDownload}
              title="Download full question paper as file"
            >
              📥 Download
            </button>
            <button 
              type="button" 
              className={`action-icon-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={() => onToggleBookmark && onToggleBookmark(item.id)}
              title={isBookmarked ? "Remove Bookmark" : "Save Bookmark"}
              aria-label="Bookmark this item"
            >
              {isBookmarked ? '★ Saved' : '☆ Bookmark'}
            </button>
            <button 
              type="button" 
              className="action-icon-btn" 
              onClick={handleCopy}
              title="Copy content to clipboard"
            >
              {copied ? '✓ Copied' : '📄 Copy'}
            </button>
            <button 
              type="button" 
              className="action-icon-btn" 
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        <h2>{item.title}</h2>
        <p className="meta">{item.subject} &bull; Topic: <strong>{item.topic}</strong></p>
      </header>

      <section className="content-section questions-container">
        <div className="section-subtitle-bar">
          <h3>📝 Core Material / Questions</h3>
        </div>
        <div className="formatted-content">
          <pre>{item.content}</pre>
        </div>
      </section>

      {item.notes && (
        <section className="content-section notes-section">
          <div className="section-subtitle-bar">
            <h3>💡 Key Concepts & Exam Tips</h3>
          </div>
          <p className="notes-text">{item.notes}</p>
        </section>
      )}
    </article>
  );
}

export default ContentView;
