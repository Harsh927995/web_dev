const fs = require('fs');
const path = require('path');
const initialResources = require('../seed/initialData.js');

const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

class Database {
  constructor() {
    this.data = {
      users: [],
      resources: [],
      bookmarks: []
    };
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        if (!this.data.resources || this.data.resources.length === 0) {
          this.data.resources = initialResources;
          this.save();
        }
      } else {
        this.data.resources = initialResources;
        this.save();
      }
      console.log(`[DB] Connected to persistent store (${this.data.resources.length} resources loaded)`);
    } catch (err) {
      console.error('[DB] Error initializing database:', err);
      this.data.resources = initialResources;
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[DB] Failed to persist data to file:', err);
    }
  }

  // --- Users ---
  async findUserByEmail(email) {
    if (!email) return null;
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  async findUserById(id) {
    return this.data.users.find(u => u.id === id) || null;
  }

  async createUser(userData) {
    const user = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.data.users.push(user);
    this.save();
    return user;
  }

  // --- Resources ---
  async findResources({ branch, semester, subject, topic, year, search, type }) {
    let items = [...this.data.resources];

    if (branch && branch !== 'All') {
      items = items.filter(i => i.branch === branch);
    }
    if (semester && semester !== 'All') {
      const semNum = Number(semester);
      items = items.filter(i => !i.semester || i.semester === semNum);
    }
    if (subject && subject !== 'All') {
      items = items.filter(i => i.subject.toLowerCase() === subject.toLowerCase());
    }
    if (topic && topic !== 'All') {
      items = items.filter(i => i.topic === topic);
    }
    if (year && year !== 'All') {
      items = items.filter(i => i.year === year);
    }
    if (type && type !== 'All') {
      items = items.filter(i => i.type === type);
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(i => {
        const text = `${i.title} ${i.subject} ${i.content} ${i.notes || ''}`.toLowerCase();
        return text.includes(q);
      });
    }

    return items;
  }

  async findResourceById(id) {
    return this.data.resources.find(i => i.id === id) || null;
  }

  // --- Bookmarks ---
  async getBookmarksByUser(userId) {
    return this.data.bookmarks
      .filter(b => b.userId === userId)
      .map(b => b.resourceId);
  }

  async toggleBookmark(userId, resourceId) {
    const existingIndex = this.data.bookmarks.findIndex(
      b => b.userId === userId && b.resourceId === resourceId
    );

    let isBookmarked = false;
    if (existingIndex >= 0) {
      this.data.bookmarks.splice(existingIndex, 1);
      isBookmarked = false;
    } else {
      this.data.bookmarks.push({
        id: `bm_${Date.now()}`,
        userId,
        resourceId,
        createdAt: new Date().toISOString()
      });
      isBookmarked = true;
    }
    this.save();
    return {
      isBookmarked,
      bookmarks: await this.getBookmarksByUser(userId)
    };
  }
}

const db = new Database();
module.exports = db;
