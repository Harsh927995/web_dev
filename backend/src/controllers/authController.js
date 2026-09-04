const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/auth');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'student',
      rollNumber: user.rollNumber
    },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

function sanitizeUser(user) {
  const { password, ...sanitized } = user;
  return sanitized;
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, branch, year } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Student name is required' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid student email is required' });
    }
    if (!branch) {
      return res.status(400).json({ success: false, message: 'Branch selection is required' });
    }
    if (!year) {
      return res.status(400).json({ success: false, message: 'Year of study is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existing = await db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account already exists with this email address' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const yearNum = new Date().getFullYear();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const rollNumber = `KK-${yearNum}-${randomCode}`;
    const joinDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newUser = await db.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      branch,
      year,
      rollNumber,
      role: 'student',
      joinDate
    });

    const token = generateToken(newUser);
    return res.status(201).json({
      success: true,
      message: 'Student account created successfully',
      token,
      user: sanitizeUser(newUser)
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password credentials' });
    }

    const token = generateToken(user);
    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: sanitizeUser(user)
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await db.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }
    return res.status(200).json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (err) {
    next(err);
  }
};
