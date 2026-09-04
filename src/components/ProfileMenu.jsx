import { useState, useEffect, useRef } from 'react';
import { authAPI } from '../api/client.js';

const BRANCHES = ['First Year', 'Computer Science', 'Civil', 'Electrical', 'Electronics and Communication', 'Mechanical'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

function ProfileMenu({ isLoggedIn, user, onLogin, onLogout, onMenuToggle, showProfile }) {
  const [authMode, setAuthMode] = useState('register');
  const [formData, setFormData] = useState({ name: '', email: '', branch: '', year: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    if (!showProfile) return;
    const handleClick = (e) => menuRef.current && !menuRef.current.contains(e.target) && onMenuToggle();
    const handleKey = (e) => e.key === 'Escape' && onMenuToggle();
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [showProfile, onMenuToggle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setLoginError('Please enter your name');
    if (!formData.email.trim() || !formData.email.includes('@')) return setLoginError('Please enter a valid email');
    if (!formData.branch) return setLoginError('Please select your branch');
    if (!formData.year) return setLoginError('Please select your year');
    if (formData.password.length < 6) return setLoginError('Password must be at least 6 characters');

    try {
      const res = await authAPI.register(formData);
      if (res.success && res.user) {
        localStorage.setItem('kk_active_user', JSON.stringify(res.user));
        onLogin(res.user);
        setFormData({ name: '', email: '', branch: '', year: '', password: '' });
        setLoginError('');
        return;
      }
    } catch (err) {
      if (err.message !== 'BACKEND_OFFLINE') {
        return setLoginError(err.message);
      }
    }

    // Local fallback if backend is offline
    try {
      const storedUsers = JSON.parse(localStorage.getItem('kk_users') || '[]');
      const existingUser = storedUsers.find((u) => u.email.toLowerCase() === formData.email.toLowerCase());
      if (existingUser) {
        return setLoginError('Account already exists with this email. Please Sign In.');
      }

      const rollNumber = `KK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newUser = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        branch: formData.branch,
        year: formData.year,
        password: formData.password,
        rollNumber,
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      storedUsers.push(newUser);
      localStorage.setItem('kk_users', JSON.stringify(storedUsers));
      localStorage.setItem('kk_active_user', JSON.stringify(newUser));

      onLogin(newUser);
      setFormData({ name: '', email: '', branch: '', year: '', password: '' });
      setLoginError('');
    } catch {
      setLoginError('Failed to save account locally.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return setLoginError('Please enter your email');
    if (!formData.password) return setLoginError('Please enter your password');

    try {
      const res = await authAPI.login({ email: formData.email, password: formData.password });
      if (res.success && res.user) {
        localStorage.setItem('kk_active_user', JSON.stringify(res.user));
        onLogin(res.user);
        setFormData({ name: '', email: '', branch: '', year: '', password: '' });
        setLoginError('');
        return;
      }
    } catch (err) {
      if (err.message !== 'BACKEND_OFFLINE') {
        return setLoginError(err.message);
      }
    }

    // Local fallback if backend is offline
    const storedUsers = JSON.parse(localStorage.getItem('kk_users') || '[]');
    const matchedUser = storedUsers.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
    );

    if (matchedUser) {
      localStorage.setItem('kk_active_user', JSON.stringify(matchedUser));
      onLogin(matchedUser);
      setFormData({ name: '', email: '', branch: '', year: '', password: '' });
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Please check your credentials or create an account.');
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@btech.ac.in',
      branch: 'Computer Science',
      year: '3rd Year',
      rollNumber: 'KK-2026-7842',
      joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    localStorage.setItem('kk_active_user', JSON.stringify(demoUser));
    onLogin(demoUser);
  };

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <button 
        type="button"
        className="profile-button" 
        onClick={onMenuToggle}
        aria-expanded={showProfile}
        aria-label="Student Profile Menu"
      >
        {isLoggedIn ? (
          <>
            <span className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
            <span className="profile-label">{user?.name}</span>
          </>
        ) : (
          <>
            <span className="login-icon">👤</span>
            <span className="login-label">Student ID / Login</span>
          </>
        )}
      </button>

      {showProfile && (
        <div className="profile-dropdown">
          {isLoggedIn ? (
            <div className="profile-logged-in-view">
              <div className="student-id-card">
                <div className="id-card-header">
                  <span className="id-card-badge">VERIFIED STUDENT ID</span>
                </div>
                
                <div className="id-card-avatar">
                  <div className="avatar-circle">{user?.name?.[0]?.toUpperCase()}</div>
                </div>

                <div className="id-card-body">
                  <h3 className="id-student-name">{user?.name}</h3>
                  <p className="id-roll">{user?.rollNumber || 'KK-2026-STD'}</p>
                  
                  <div className="id-details-grid">
                    <div className="id-detail-item">
                      <span className="id-detail-label">🎓 Branch</span>
                      <span className="id-detail-value">{user?.branch}</span>
                    </div>
                    <div className="id-detail-item">
                      <span className="id-detail-label">📚 Year</span>
                      <span className="id-detail-value">{user?.year}</span>
                    </div>
                    <div className="id-detail-item id-full-width">
                      <span className="id-detail-label">📧 Email</span>
                      <span className="id-detail-value">{user?.email}</span>
                    </div>
                  </div>

                  <div className="id-card-footer">
                    <p className="id-joined-date">Member Since: {user?.joinDate}</p>
                  </div>
                </div>
              </div>

              <button type="button" className="logout-btn" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="profile-auth-view">
              <div className="auth-tab-switch">
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('register'); setLoginError(''); }}
                >
                  Create ID
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => { setAuthMode('login'); setLoginError(''); }}
                >
                  Sign In
                </button>
              </div>

              {authMode === 'register' ? (
                <form onSubmit={handleRegister} className="login-form">
                  <p className="login-description">Get your instant Student ID Card to bookmark PYQs & access solutions.</p>
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="form-group">
                    <label className="form-label">🏛️ Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                      className="branch-select"
                    >
                      <option value="">Select your branch...</option>
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">📅 Year of Study</label>
                    <div className="year-buttons">
                      {YEARS.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          className={`year-btn ${formData.year === yr ? 'active' : ''}`}
                          onClick={() => setFormData((p) => ({ ...p, year: yr }))}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="password"
                    name="password"
                    placeholder="Password (min 6 chars)"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  {loginError && <p className="error-message">{loginError}</p>}

                  <button type="submit" className="login-btn">
                    ✨ Generate Student ID
                  </button>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit} className="login-form">
                  <p className="login-description">Enter your registered email and password to access your Student ID.</p>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email ID"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />

                  {loginError && <p className="error-message">{loginError}</p>}

                  <button type="submit" className="login-btn">
                    🔑 Sign In
                  </button>
                </form>
              )}

              <div className="guest-options">
                <button type="button" className="demo-login-btn" onClick={handleDemoLogin}>
                  ⚡ Instant Demo Student Login
                </button>
                <p className="guest-note">Browsing as guest? You can access all PYQs freely.</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
