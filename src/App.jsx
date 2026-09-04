import { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import contentItems from './data/pyqs.js';
import SearchBar from './components/SearchBar.jsx';
import ContentList from './components/ContentList.jsx';
import ContentView from './components/ContentView.jsx';
import ProfileMenu from './components/ProfileMenu.jsx';
import TermsAndConditions from './components/TermsAndConditions.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import BranchFilter from './components/BranchFilter.jsx';

const ALL_BRANCHES = ['All', 'First Year', ...Array.from(new Set(contentItems.map((item) => item.branch))).filter((b) => b !== 'All' && b !== 'First Year')];
const ALL_TOPICS = ['All', ...new Set(contentItems.map((item) => item.topic))];
const ALL_YEARS = ['All', ...new Set(contentItems.map((item) => item.year))];
const ALL_SUBJECTS = Array.from(new Set(contentItems.map((i) => i.subject)));

function App() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(contentItems[0]?.id || null);
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterBranch, setFilterBranch] = useState('All');
  const [filterSemester, setFilterSemester] = useState('All');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Local authentication & persistence
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kk_active_user'));
    } catch {
      return null;
    }
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(user));
  const [showProfile, setShowProfile] = useState(false);

  // Theme support
  const [theme, setTheme] = useState(() => localStorage.getItem('kk_theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kk_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kk_bookmarks')) || [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('kk_bookmarks', JSON.stringify(next));
      return next;
    });
  };

  // Modal states
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Section Refs for smooth scrolling
  const resourcesRef = useRef(null);
  const subjectsRef = useRef(null);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    const sem = filterSemester !== 'All' ? Number(filterSemester) : null;
    return contentItems.filter((item) => {
      if (filterTopic !== 'All' && item.topic !== filterTopic) return false;
      if (filterYear !== 'All' && item.year !== filterYear) return false;
      if (filterBranch !== 'All' && item.branch !== filterBranch) return false;
      if (sem !== null && item.semester && item.semester !== sem) return false;
      if (showBookmarksOnly && !bookmarks.includes(item.id)) return false;
      if (q) {
        const text = `${item.title} ${item.subject} ${item.content} ${item.notes || ''}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [search, filterTopic, filterYear, filterBranch, filterSemester, showBookmarksOnly, bookmarks]);

  const selectedItem = contentItems.find((item) => item.id === selectedId) || filteredItems[0] || null;

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('kk_active_user');
    setUser(null);
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  const handleResetFilters = () => {
    setSearch('');
    setFilterTopic('All');
    setFilterYear('All');
    setFilterBranch('All');
    setFilterSemester('All');
    setShowBookmarksOnly(false);
  };

  // Read URL query params when navigating from BranchSubjects or shared links
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const branchParam = params.get('branch');
    const subjectParam = params.get('subject');
    const semesterParam = params.get('semester');

    if (branchParam) setFilterBranch(branchParam);
    if (semesterParam) setFilterSemester(semesterParam);
    if (subjectParam) {
      const item = contentItems.find((i) => i.subject === subjectParam);
      if (item) {
        setFilterTopic(item.topic || 'All');
        setSelectedId(item.id);
      }
    }
  }, [location.search]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/khoje-khatam-logo.png" alt="Khoje Khatam Logo" className="logo" />
            <div>
              <p className="eyebrow">khoje khatam &bull; b.tech portal</p>
              <h1>Complete guide to PYQs, notes & tutorials</h1>
              <p className="local-tagline">Jharkhand engineering semester preparation made fast, structured & easy.</p>
            </div>
          </div>

          <div className="header-actions">
            <button 
              type="button" 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle visual theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <ProfileMenu 
              isLoggedIn={isLoggedIn}
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onMenuToggle={() => setShowProfile(!showProfile)}
              showProfile={showProfile}
            />
          </div>
        </div>
      </header>

      {/* Hero / About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-header-row">
              <h2>Master Your Engineering Semester Exams</h2>
              <span className="exam-tag">2023 - 2024 Solved Papers Available</span>
            </div>
            <p className="about-description">
              Welcome to <strong>Khoje Khatam</strong> — your centralized academic companion for B.Tech engineering. 
              Browse real previous year exam questions, detailed revision notes, and key exam tips across all semesters.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <div>
                  <h4>Curated by Branch & Subject</h4>
                  <p>Organized questions for Computer Science, Civil, Electrical, ECE, and Mechanical departments.</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="feature-icon">📖</span>
                <div>
                  <h4>Verified Notes & Solutions</h4>
                  <p>Core formulas, solved university exam questions, and structured revision points.</p>
                </div>
              </div>
            </div>

            <div className="about-cta">
              <button 
                type="button" 
                className="cta-button primary" 
                onClick={() => resourcesRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Question Papers ↓
              </button>
              <button 
                type="button" 
                className="cta-button secondary"
                onClick={() => subjectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Subjects →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Subject Badges */}
      <section className="quick-subjects" ref={subjectsRef}>
        <div className="section-title-wrap">
          <h3>Quick Access by Subject</h3>
          <p className="section-subtitle">Click any subject badge to load question sets instantly</p>
        </div>
        <div className="subject-badges">
          {ALL_SUBJECTS.map((subject) => (
            <button
              key={subject}
              type="button"
              className="subject-badge"
              onClick={() => {
                const firstItem = contentItems.find((i) => i.subject === subject);
                if (firstItem) {
                  setFilterTopic(firstItem.topic || 'All');
                  setSelectedId(firstItem.id);
                }
                resourcesRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>

      {/* Branch Navigation */}
      <BranchFilter 
        branches={ALL_BRANCHES}
        selectedBranch={filterBranch}
        onBranchChange={setFilterBranch}
      />

      {/* Main Content Area */}
      <main className="app-main" ref={resourcesRef}>
        <section className="sidebar">
          <SearchBar
            value={search}
            onChange={setSearch}
            topics={ALL_TOPICS}
            years={ALL_YEARS}
            selectedTopic={filterTopic}
            selectedYear={filterYear}
            onTopicChange={setFilterTopic}
            onYearChange={setFilterYear}
            onResetFilters={handleResetFilters}
          />

          {/* Active branch / semester filter indicator */}
          {(filterBranch !== 'All' || filterSemester !== 'All') && (
            <div className="active-filter-indicator">
              <span>
                🎯 <strong>{filterBranch !== 'All' ? filterBranch : 'All Branches'}</strong>
                {filterSemester !== 'All' && ` • Semester ${filterSemester}`}
              </span>
              <button type="button" className="clear-filter-chip" onClick={handleResetFilters} title="Reset to all">
                ✕ Clear
              </button>
            </div>
          )}

          {/* Bookmarks filter tab */}
          <div className="view-filter-tabs">
            <button
              type="button"
              className={`view-tab ${!showBookmarksOnly ? 'active' : ''}`}
              onClick={() => setShowBookmarksOnly(false)}
            >
              All Items ({contentItems.length})
            </button>
            <button
              type="button"
              className={`view-tab ${showBookmarksOnly ? 'active' : ''}`}
              onClick={() => setShowBookmarksOnly(true)}
            >
              ★ Saved ({bookmarks.length})
            </button>
          </div>

          <ContentList
            items={filteredItems}
            selectedId={selectedItem?.id}
            onSelect={setSelectedId}
            bookmarks={bookmarks}
          />
        </section>

        <section className="content-panel">
          {selectedItem ? (
            <ContentView 
              item={selectedItem} 
              isBookmarked={bookmarks.includes(selectedItem.id)}
              onToggleBookmark={toggleBookmark}
            />
          ) : (
            <div className="empty-state">
              <h2>No content found</h2>
              <p>Try resetting your search query or selecting "All" from the filters.</p>
              <button type="button" className="cta-button primary" onClick={handleResetFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section brand-col">
            <h3>Khoje Khatam</h3>
            <p>Your open-source companion for B.Tech engineering syllabus, question archives, and semester exam success.</p>
            <span className="footer-tagline">Ab Jharkhand ke Engineers ka Semester hoga aur bhi aasan.</span>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button type="button" className="footer-link-btn" onClick={() => subjectsRef.current?.scrollIntoView({ behavior: 'smooth' })}>
                  Subjects Directory
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setShowTerms(true)}>
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button type="button" className="footer-link-btn" onClick={() => setShowPrivacy(true)}>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-media">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36M7.86 18.5v-8.37H5.07v8.37h2.79z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="X (Twitter)" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Semester Updates</h4>
            {newsletterSubscribed ? (
              <p className="newsletter-success">🎉 Thank you for subscribing to semester updates!</p>
            ) : (
              <form 
                className="newsletter-signup" 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterSubscribed(true);
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter student email" 
                  className="newsletter-input" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  aria-label="Email address for semester updates"
                />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-text">© 2026 Khoje Khatam. All rights reserved. &bull; Engineered for B.Tech Excellence</p>
        </div>
      </footer>

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default App;
