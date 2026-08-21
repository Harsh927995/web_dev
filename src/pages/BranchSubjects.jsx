import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contentItems from '../data/pyqs.js';

export default function BranchSubjects() {
  const { branch } = useParams();
  const navigate = useNavigate();

  const subjects = Array.from(new Set(
    contentItems
      .filter((i) => i.branch === branch)
      .map((i) => i.subject)
  ));

  return (
    <div style={{ padding: 24 }}>
      <h2>Subjects for {branch}</h2>
      {subjects.length === 0 ? (
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
      )}

      <div style={{ marginTop: 20 }}>
        <button className="branch-button" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
}
