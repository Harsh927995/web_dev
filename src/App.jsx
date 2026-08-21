import { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import contentItems from './data/pyqs.js';
import SearchBar from './components/SearchBar.jsx';
import ContentList from './components/ContentList.jsx';
import ContentView from './components/ContentView.jsx';
import ProfileMenu from './components/ProfileMenu.jsx';
import TermsAndConditions from './components/TermsAndConditions.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import BranchFilter from './components/BranchFilter.jsx';

function App() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(contentItems[0]?.id || null);
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterBranch, setFilterBranch] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isHeaderMinimized, setIsHeaderMinimized] = useState(false);

  const branches = useMemo(() => ['All', ...new Set(contentItems.map((item) => item.branch))], []);
  const topics = useMemo(() => ['All', ...new Set(contentItems.map((item) => item.topic))], []);
  const years = useMemo(() => ['All', ...new Set(contentItems.map((item) => item.year))], []);

  const filteredItems = useMemo(() => {
    return contentItems.filter((item) => {
      const matchesSearch = [item.title, item.subject, item.content, item.notes]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTopic = filterTopic === 'All' || item.topic === filterTopic;
      const matchesYear = filterYear === 'All' || item.year === filterYear;
      const matchesBranch = filterBranch === 'All' || item.branch === filterBranch;

      return matchesSearch && matchesTopic && matchesYear && matchesBranch;
    });
  }, [search, filterTopic, filterYear, filterBranch]);

  const selectedItem = contentItems.find((item) => item.id === selectedId) || filteredItems[0] || null;

  const handleLogin = (userData) => {
    setUser({
      ...userData,
      joinDate: new Date().toLocaleDateString()
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setShowProfile(false);
  };

  useEffect(() => {
    alert('namaskar swagat hai aapka');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderMinimized(true);
      } else {
        setIsHeaderMinimized(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // read query params to set filters when navigating from other pages
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const branchParam = params.get('branch');
    const subjectParam = params.get('subject');

    if (branchParam) setFilterBranch(branchParam);
    if (subjectParam) {
      // set topic to the first matching topic for the subject
      const item = contentItems.find(i => i.subject === subjectParam);
      if (item) {
        setFilterTopic(item.topic || 'All');
        setSelectedId(item.id);
      }
    }
  }, [location.search]);

  return (
    <div className="app-shell">
      <header className={`app-header ${isHeaderMinimized ? 'minimized' : ''}`}>
        <div className="header-content">
          <div className="logo-section">
            <img src="/khoje-khatam-logo.png.png" alt="Khoje Khatam Logo" className="logo" />
            <div>
              <p className="eyebrow">khoje khatam</p>
              <h1>Complete guide to PYQs, notes & tutorials for B.Tech students</h1>
              <p className="local-tagline">Ab Jharkhand ke Engineers ka Semester hoga aur bhi aasan.</p>
            </div>
          </div>
          <ProfileMenu 
            isLoggedIn={isLoggedIn}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onMenuToggle={() => setShowProfile(!showProfile)}
            showProfile={showProfile}
          />
        </div>
      </header>

      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2>About Khoje Khatam</h2>
            <p className="about-description">
              Welcome to your ultimate study companion for B.Tech excellence. Khoje Khatam is a comprehensive learning platform designed to help engineering students master their subjects through carefully curated Previous Year Questions, detailed study notes, and expert tutorials.
            </p>
            
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <div>
                  <h4>Focused Learning</h4>
                  <p>Organized resources by subject, topic, and year to streamline your study journey</p>
                </div>
              </div>
              
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <div>
                  <h4>Community Support</h4>
                  <p>Learn and grow with a community of thousands of B.Tech students like you</p>
                </div>
              </div>
            </div>

            <div className="about-cta">
              <p className="cta-text">Start exploring thousands of resources and excel in your B.Tech journey today!</p>
              <button className="cta-button" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                Explore Resources →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-subjects">
        <h3>Quick Access by Subject</h3>
        <div className="subject-badges">
          {Array.from(new Set(contentItems.map(i => i.subject))).map(subject => (
            <button
              key={subject}
              className="subject-badge"
              onClick={() => {
                setFilterTopic(contentItems.find(i => i.subject === subject)?.topic || 'All');
                const firstItem = contentItems.find(i => i.subject === subject);
                if (firstItem) setSelectedId(firstItem.id);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            >
              {subject}
            </button>
          ))}
        </div>
      </section>

      <BranchFilter 
        branches={branches}
        selectedBranch={filterBranch}
        onBranchChange={setFilterBranch}
      />

      <main className="app-main">
        <section className="sidebar">
          <SearchBar
            value={search}
            onChange={setSearch}
            topics={topics}
            years={years}
            selectedTopic={filterTopic}
            selectedYear={filterYear}
            onTopicChange={setFilterTopic}
            onYearChange={setFilterYear}
          />

          <ContentList
            items={filteredItems}
            selectedId={selectedItem?.id}
            onSelect={setSelectedId}
          />
        </section>

        <section className="content-panel">
          {selectedItem ? (
            <ContentView item={selectedItem} />
          ) : (
            <div className="empty-state">
              <h2>No content found</h2>
              <p>Change your search or filters to see more PYQs and notes.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Khoje Khatam</h3>
            <p>Your ultimate B.Tech study companion. Master PYQs, notes, and tutorials in one platform.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><button className="footer-link-btn" onClick={() => setShowTerms(true)}>Terms & Conditions</button></li>
              <li><button className="footer-link-btn" onClick={() => setShowPrivacy(true)}>Privacy Policy</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect With Us</h4>
            <div className="social-media">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter">
                𝕏
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                in
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                ◇
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" title="YouTube">
                ▶
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
                ◎
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <div className="newsletter-signup">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-text">© 2026 Khoje Khatam. All rights reserved. | Made with ❤️ for B.Tech Students</p>
        </div>
      </footer>

      {showTerms && <TermsAndConditions onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
}

export default App;
