require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const errorHandler = require('./middleware/errorHandler');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in local dev
    }
  },
  credentials: true
}));

app.use(express.json());

// Request logging in development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root dashboard for browser inspection
app.get('/', (req, res) => {
  if (req.headers.accept && !req.headers.accept.includes('text/html')) {
    return res.json({
      service: 'Khoje Khatam Backend API',
      status: 'online',
      version: '1.0.0',
      port: PORT,
      docs: '/api/health',
      endpoints: [
        '/api/health',
        '/api/resources',
        '/api/resources?branch=Computer%20Science',
        '/api/resources?semester=3',
        '/api/auth/register',
        '/api/auth/login',
        '/api/auth/me',
        '/api/bookmarks'
      ]
    });
  }

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Khoje Khatam Backend API | Server Dashboard</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(22, 30, 49, 0.85);
      --card-border: rgba(255, 255, 255, 0.08);
      --accent: #3b82f6;
      --accent-glow: rgba(59, 130, 246, 0.3);
      --success: #10b981;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e293b 0%, var(--bg) 75%);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    .container {
      max-width: 900px;
      width: 100%;
    }
    .header {
      text-align: center;
      margin-bottom: 36px;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--success);
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 16px;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--success);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 0.6; }
      50% { opacity: 1; }
      100% { opacity: 0.6; }
    }
    h1 {
      font-size: 2.3rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 40%, #93c5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 1.05rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 20px;
      backdrop-filter: blur(12px);
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      border-color: rgba(59, 130, 246, 0.4);
    }
    .card h3 {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.88rem;
      line-height: 1.5;
      margin-bottom: 14px;
    }
    .endpoint-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      background: rgba(59, 130, 246, 0.12);
      border: 1px solid rgba(59, 130, 246, 0.25);
      border-radius: 8px;
      color: #60a5fa;
      text-decoration: none;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.82rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .endpoint-link:hover {
      background: var(--accent);
      color: #fff;
    }
    .method {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      background: #1e3a8a;
      color: #93c5fd;
      margin-right: 4px;
    }
    .method.post {
      background: #064e3b;
      color: #6ee7b7;
    }
    .list-endpoints {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .quick-bar {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 24px;
    }
    .btn {
      padding: 10px 18px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 14px var(--accent-glow);
    }
    .btn-primary:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      color: var(--text);
      border: 1px solid var(--card-border);
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      color: var(--text-muted);
      font-size: 0.82rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">
        <span class="dot"></span>
        API Server Running on Port ${PORT}
      </div>
      <h1>Khoje Khatam Backend API</h1>
      <p class="subtitle">RESTful Services & Database Engine for the Study Portal</p>
    </div>

    <div class="grid">
      <!-- Health & Diagnostics -->
      <div class="card">
        <h3>🩺 Health Check</h3>
        <p>Real-time server uptime, version, and diagnostic stats in JSON format.</p>
        <a class="endpoint-link" href="/api/health" target="_blank"><span class="method">GET</span> /api/health →</a>
      </div>

      <!-- Resources API -->
      <div class="card">
        <h3>📚 All Resources</h3>
        <p>Curated database of 33 PYQs, lecture notes, and syllabus materials across all branches.</p>
        <a class="endpoint-link" href="/api/resources" target="_blank"><span class="method">GET</span> /api/resources →</a>
      </div>

      <!-- Branch Quick Links -->
      <div class="card">
        <h3>💻 Computer Science</h3>
        <p>Filter pyqs and notes specifically for the Computer Science department.</p>
        <a class="endpoint-link" href="/api/resources?branch=Computer%20Science" target="_blank"><span class="method">GET</span> ?branch=Computer Science →</a>
      </div>

      <div class="card">
        <h3>⚙️ Mechanical Eng.</h3>
        <p>Direct query for Mechanical Engineering thermodynamics, SOM, and dynamics.</p>
        <a class="endpoint-link" href="/api/resources?branch=Mechanical" target="_blank"><span class="method">GET</span> ?branch=Mechanical →</a>
      </div>

      <div class="card">
        <h3>🎓 First Year</h3>
        <p>Query resources for 1st year foundational common curriculum (Sems 1 & 2).</p>
        <a class="endpoint-link" href="/api/resources?branch=First%20Year" target="_blank"><span class="method">GET</span> ?branch=First Year →</a>
      </div>

      <div class="card">
        <h3>📖 Semester 3</h3>
        <p>Query resources for Semester 3 across all engineering branches.</p>
        <a class="endpoint-link" href="/api/resources?semester=3" target="_blank"><span class="method">GET</span> ?semester=3 →</a>
      </div>
    </div>

    <!-- Auth & Bookmarks API section -->
    <div class="card" style="margin-bottom: 24px;">
      <h3>🔐 Authentication & User API</h3>
      <p>Endpoints used by the frontend to sign in, register, and sync bookmarks to the database:</p>
      <div class="list-endpoints">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; color: #cbd5e1;">
          <span class="method post">POST</span> <code>/api/auth/register</code> - Create account with bcrypt password hashing
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; color: #cbd5e1;">
          <span class="method post">POST</span> <code>/api/auth/login</code> - Validate credentials and return signed JWT
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; color: #cbd5e1;">
          <span class="method">GET</span> <code>/api/auth/me</code> - Verify token and return user profile
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; color: #cbd5e1;">
          <span class="method">GET</span> <code>/api/bookmarks</code> - Retrieve saved bookmarks for logged-in user
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; color: #cbd5e1;">
          <span class="method post">POST</span> <code>/api/bookmarks/:id</code> - Toggle bookmark for authenticated user
        </div>
      </div>
    </div>

    <div class="quick-bar">
      <a class="btn btn-primary" href="http://localhost:5173" target="_blank">
        🚀 Open Frontend (localhost:5173)
      </a>
      <a class="btn btn-secondary" href="https://harsh927995.github.io/web_dev/" target="_blank">
        🌐 Open Live Site (GitHub Pages)
      </a>
    </div>

    <div class="footer">
      Khoje Khatam Full-Stack Platform • Node.js + Express + Local Persistent Store
    </div>
  </div>
</body>
</html>`);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Khoje Khatam Backend API',
    version: '1.0.0',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Centralized error handler
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 Khoje Khatam Backend Server Active!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`=========================================`);
});

module.exports = { app, server };
