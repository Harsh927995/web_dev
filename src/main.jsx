import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import BranchSubjects from './pages/BranchSubjects.jsx';
import './styles.css';

const basename = window.location.pathname.startsWith('/web_dev') ? '/web_dev' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <Router>
=======
    <BrowserRouter basename={basename}>
>>>>>>> b62ad1f (Update app UI and layout)
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/branch/:branch" element={<BranchSubjects />} />
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
