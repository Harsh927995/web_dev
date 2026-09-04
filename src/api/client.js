const API_BASE = 'http://localhost:5000/api';

function getToken() {
  try {
    return localStorage.getItem('kk_token') || null;
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    if (token) {
      localStorage.setItem('kk_token', token);
    } else {
      localStorage.removeItem('kk_token');
    }
  } catch {}
}

async function request(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    // If backend is offline or network fails
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      console.warn(`[API Client] Backend server unreachable at ${API_BASE}. Operating in local fallback mode.`);
      throw new Error('BACKEND_OFFLINE');
    }
    throw err;
  }
}

// Authentication endpoints
export const authAPI = {
  async register(userData) {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.token) setToken(res.token);
    return res;
  },

  async login(credentials) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.token) setToken(res.token);
    return res;
  },

  async getMe() {
    return request('/auth/me');
  },

  logout() {
    setToken(null);
  }
};

// Resources endpoints
export const resourceAPI = {
  async getResources(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v && v !== 'All') query.append(k, v);
    });
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request(`/resources${qs}`);
  },

  async getResourceById(id) {
    return request(`/resources/${id}`);
  }
};

// Bookmarks endpoints
export const bookmarkAPI = {
  async getBookmarks() {
    return request('/bookmarks');
  },

  async toggleBookmark(resourceId) {
    return request(`/bookmarks/${resourceId}`, {
      method: 'POST'
    });
  }
};
