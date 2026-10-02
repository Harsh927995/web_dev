import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import contentItems, { branchCurriculum, branchTaglines, branchIcons } from '../data/pyqs.js';
import logoImg from '../assets/logo.png';

const semesterYearMapping = {
  1: '1st Year (Autumn)',
  2: '1st Year (Spring)',
  3: '2nd Year (Autumn)',
  4: '2nd Year (Spring)',
  5: '3rd Year (Autumn)',
  6: '3rd Year (Spring)',
  7: '4th Year (Autumn)',
  8: '4th Year (Spring)'
};

export default function BranchSubjects() {
  const { branch } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

<<<<<<< HEAD
  // Selected semester: read initial from URL param or null
  const initialSem = searchParams.get('sem') ? Number(searchParams.get('sem')) : null;
  const [selectedSemester, setSelectedSemester] = useState(initialSem);

  // Persistent Theme
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('kk_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kk_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isFirstYear = branch === 'First Year';
  const branchIcon = branchIcons[branch] || '📚';
  const semesters = isFirstYear ? [1, 2] : [3, 4, 5, 6, 7, 8];

  // Subjects for the current branch & selected semester
  const branchData = branchCurriculum[branch] || {};
  const semesterSubjects = selectedSemester ? (branchData[selectedSemester] || []) : [];

  const handleSelectSemester = (sem) => {
    setSelectedSemester(sem);
    setSearchParams({ sem: sem.toString() });
  };

  const handleBackToSemesters = () => {
    setSelectedSemester(null);
    setSearchParams({});
  };

  return (
    <div className="app-shell branch-page-shell">
      {/* Navigation Header */}
      <header className="app-header branch-header">
        <div className="header-content">
          <Link to="/" className="logo-section">
            <img src={logoImg} alt="Khoje Khatam Logo" className="logo" />
            <div>
              <p className="eyebrow">khoje khatam &bull; b.tech portal</p>
              <h1>Engineering Curriculum</h1>
            </div>
          </Link>
          <div className="header-actions">
            <button 
              type="button" 
              className="theme-toggle-btn" 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle visual theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
=======
  const [selectedSemester, setSelectedSemester] = React.useState('');

  const isFirstYearBranch = branch?.trim().toLowerCase() === 'first year';
  if (isFirstYearBranch) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Branch not available</h2>
        <p>This branch has been removed from the app.</p>
        <div style={{ marginTop: 20 }}>
          <button className="branch-button" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    );
  }

  const subjectsForBranch = contentItems.filter((i) => i.branch === branch);
  const semesterOptions = Array.from(
    new Set(
      Array.from({ length: 8 }, (_, index) => String(index + 1)).concat(
        subjectsForBranch.map((item) => item.semester).filter(Boolean)
      )
    )
  ).sort((a, b) => Number(a) - Number(b));
  const subjects = selectedSemester
    ? Array.from(new Set(subjectsForBranch.filter((i) => i.semester === selectedSemester).map((i) => i.subject)))
    : Array.from(new Set(subjectsForBranch.map((i) => i.subject)));

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const hasSemesterFilters = semesterOptions.length > 0;
  const showSemesterPrompt = hasSemesterFilters && !selectedSemester;

  return (
    <div style={{ padding: 24 }}>
      <h2>Subjects for {branch}</h2>

      {hasSemesterFilters ? (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
          {semesterOptions.map((semester) => (
            <button
              key={semester}
              className={`branch-button ${selectedSemester === semester ? 'active' : ''}`}
              onClick={() => handleSemesterClick(semester)}
            >
              Semester {semester}
>>>>>>> b62ad1f (Update app UI and layout)
            </button>
            <button type="button" className="back-nav-button" onClick={() => navigate('/')}>
              ← Back to Home
            </button>
          </div>
        </div>
<<<<<<< HEAD
      </header>
=======
      ) : null}

      {showSemesterPrompt ? (
        <p>Select a semester to view subjects.</p>
      ) : null}

      {hasSemesterFilters ? (
        selectedSemester ? (
          subjects.length === 0 ? (
            <p>No subjects found for semester {selectedSemester}.</p>
          ) : (
            <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
              {subjects.map((s) => (
                <button
                  key={s}
                  className="subject-badge"
                  onClick={() => {
                    const params = new URLSearchParams({ subject: s, branch, semester: selectedSemester });
                    navigate(`/?${params.toString()}`);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )
        ) : null
      ) : (
        subjects.length === 0 ? (
          <p>No subjects found for this branch.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            {subjects.map((s) => (
              <button
                key={s}
                className="subject-badge"
                onClick={() => {
                  const params = new URLSearchParams({ subject: s, branch });
                  navigate(`/?${params.toString()}`);
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )
      )}
>>>>>>> b62ad1f (Update app UI and layout)

      <div className="branch-subjects-container">
        {/* Branch Title Banner */}
        <div className="branch-title-banner">
          <span className="branch-hero-icon">{branchIcon}</span>
          <div className="branch-banner-text">
            <h2>{isFirstYear ? 'First Year (Common Engineering)' : `${branch} Engineering`}</h2>
            {branchTaglines[branch] && (
              <p className="branch-tagline-quote">"{branchTaglines[branch]}"</p>
            )}
            <p className="branch-meta">
              {isFirstYear 
                ? 'Foundation curriculum for all engineering departments • Semester 1 & 2' 
                : 'Jharkhand B.Tech Degree Curriculum • Core Semesters 3 to 8'}
            </p>
          </div>
        </div>

        {/* STEP 1: If no semester is selected, show all semesters */}
        {!selectedSemester ? (
          <div className="semester-selection-view">
            <div className="section-title-wrap">
              <span className="step-tag">Step 1 of 2</span>
              <h3>{isFirstYear ? 'Select Semester (Semester 1 & 2)' : 'Select Semester (Semester 3 to 8)'}</h3>
              <p className="section-subtitle">
                {isFirstYear 
                  ? 'First Year engineering foundation is common across all branches. Choose your semester below:' 
                  : 'Core branch specializations begin in 2nd Year (Semester 3). Choose your current semester below:'}
              </p>
            </div>

            <div className="semesters-grid">
              {semesters.map((sem) => {
                const subjectsForSem = branchData[sem] || [];
                const yearLabel = semesterYearMapping[sem];

                return (
                  <button
                    key={sem}
                    type="button"
                    className="semester-card-button"
                    onClick={() => handleSelectSemester(sem)}
                  >
                    <div className="semester-card-top">
                      <span className="semester-badge">Semester {sem}</span>
                      <span className="semester-year">{yearLabel}</span>
                    </div>

                    <div className="semester-card-middle">
                      <h4>Semester {sem}</h4>
                      <p className="semester-subjects-preview">
                        {subjectsForSem.slice(0, 3).join(', ')}
                        {subjectsForSem.length > 3 ? '...' : ''}
                      </p>
                    </div>

                    <div className="semester-card-bottom">
                      <span className="semester-subject-count">
                        📚 {subjectsForSem.length} Subjects
                      </span>
                      <span className="semester-action-link">
                        Explore Subjects →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* STEP 2: Semester selected, show subjects belonging to that semester */
          <div className="subjects-selection-view">
            <div className="subjects-nav-bar">
              <button 
                type="button" 
                className="back-to-semesters-btn"
                onClick={handleBackToSemesters}
              >
                ← Change Semester (Viewing Semester {selectedSemester})
              </button>
              <div className="breadcrumbs">
                <span>{branch}</span>
                <span>/</span>
                <strong className="active-breadcrumb">Semester {selectedSemester} ({semesterYearMapping[selectedSemester]})</strong>
              </div>
            </div>

            <div className="section-title-wrap">
              <span className="step-tag">Step 2 of 2</span>
              <h3>Semester {selectedSemester} Subjects</h3>
              <p className="section-subtitle">
                Click any subject below to open curated Past Year Questions (PYQs), formulas, and lecture notes.
              </p>
            </div>

            {semesterSubjects.length === 0 ? (
              <div className="empty-state">
                <p>No subjects listed for Semester {selectedSemester} yet.</p>
                <button type="button" className="cta-button primary" onClick={handleBackToSemesters}>
                  Choose Another Semester
                </button>
              </div>
            ) : (
              <div className="branch-subjects-grid">
                {semesterSubjects.map((subjectName) => (
                  <button
                    key={subjectName}
                    type="button"
                    className="subject-card-button"
                    onClick={() => {
                      const params = new URLSearchParams({
                        branch,
                        semester: selectedSemester.toString(),
                        subject: subjectName
                      });
                      navigate(`/?${params.toString()}`);
                    }}
                  >
                    <div className="subject-card-info">
                      <span className="subject-card-icon">📖</span>
                      <div>
                        <h4>{subjectName}</h4>
                        <span className="subject-card-sub">Semester {selectedSemester} Core</span>
                      </div>
                    </div>
                    <span className="subject-item-count">
                      View Questions & Notes →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
