import { useState } from 'react';

function ProfileMenu({ isLoggedIn, user, onLogin, onLogout, onMenuToggle, showProfile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const branches = [
    'First Year',
    'Computer Science',
    'Civil',
    'Electrical',
    'Electronics and Communication',
    'Mechanical'
  ];

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setLoginError('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      setLoginError('Please enter an email');
      return;
    }
    if (!formData.email.includes('@')) {
      setLoginError('Please enter a valid email');
      return;
    }
    if (!formData.branch) {
      setLoginError('Please select a branch');
      return;
    }
    if (!formData.year) {
      setLoginError('Please select your year');
      return;
    }
    if (!formData.password.trim()) {
      setLoginError('Please enter a password');
      return;
    }
    if (formData.password.length < 6) {
      setLoginError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setLoading(true);
      // Call backend API to create user
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      const data = await response.json();
      onLogin({
        ...data.user,
        joinDate: new Date().toLocaleDateString()
      });
      
      setFormData({
        name: '',
        email: '',
        branch: '',
        year: '',
        password: ''
      });
      setLoginError('');
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-menu-container">
      <button className="profile-button" onClick={onMenuToggle}>
        {isLoggedIn ? (
          <>
            <span className="profile-avatar">{user?.name?.[0] || 'U'}</span>
            <span className="profile-label">{user?.name}</span>
          </>
        ) : (
          <>
            <span className="login-icon">👤</span>
            <span className="login-label">Login</span>
          </>
        )}
      </button>

      {showProfile && (
        <div className="profile-dropdown">
          {isLoggedIn ? (
            <>
              {/* ID Card */}
              <div className="student-id-card">
                <div className="id-card-header">
                  <span className="id-card-badge">STUDENT ID</span>
                </div>
                
                <div className="id-card-avatar">
                  <div className="avatar-circle">{user?.name?.[0]}</div>
                </div>

                <div className="id-card-body">
                  <h2 className="id-student-name">{user?.name}</h2>
                  <p className="id-college">{user?.branch}</p>
                  
                  <div className="id-details-grid">
                    <div className="id-detail-item">
                      <span className="id-detail-label">📧 Email</span>
                      <span className="id-detail-value">{user?.email}</span>
                    </div>
                    <div className="id-detail-item">
                      <span className="id-detail-label">🎓 Branch</span>
                      <span className="id-detail-value">{user?.branch}</span>
                    </div>
                    <div className="id-detail-item">
                      <span className="id-detail-label">📚 Year</span>
                      <span className="id-detail-value">{user?.year}</span>
                    </div>
                  </div>

                  <div className="id-card-footer">
                    <p className="id-joined-date">Joined: {user?.joinDate}</p>
                  </div>
                </div>
              </div>

              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <h3>🎓 Create Account</h3>
              <p className="login-description">Fill your details and select your branch & year</p>
              <form onSubmit={handleSubmit} className="login-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />

                {/* Branch Selection */}
                <div className="form-group">
                  <label className="form-label">🏛️ Select Your Branch</label>
                  <div className="branch-dropdown-group">
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="branch-select"
                    >
                      <option value="">Choose a branch...</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Year Selection */}
                <div className="form-group">
                  <label className="form-label">📅 Select Your Year</label>
                  <div className="year-buttons">
                    {years.map(year => (
                      <button
                        key={year}
                        type="button"
                        className={`year-btn ${formData.year === year ? 'active' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, year }))}
                        disabled={loading}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />

                {loginError && <p className="error-message">{loginError}</p>}
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : '✨ Create Account'}
                </button>
              </form>
              <p className="guest-note">🔓 Continue without login to browse as guest</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
