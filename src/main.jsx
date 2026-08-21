import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import BranchSubjects from './pages/BranchSubjects.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/branch/:branch" element={<BranchSubjects />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
