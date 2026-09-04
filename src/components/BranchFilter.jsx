import { useNavigate } from 'react-router-dom';
import { branchTaglines, branchIcons } from '../data/pyqs.js';

export default function BranchFilter({ branches, selectedBranch, onBranchChange }) {
  const navigate = useNavigate();

  const handleClick = (branch) => {
    if (onBranchChange) onBranchChange(branch);
    navigate(branch === 'All' ? '/' : `/branch/${encodeURIComponent(branch)}`);
  };

  const specificBranches = branches.filter((b) => b !== 'All');

  return (
    <div className="branch-filter-section">
      <div className="section-title-wrap">
        <h3>Select Your Engineering Branch</h3>
        <p className="section-subtitle">Choose your department to explore branch-specific subjects & PYQs</p>
      </div>
      <div className="branch-buttons">
        <button 
          type="button"
          className={`branch-button ${selectedBranch === 'All' ? 'active' : ''}`}
          onClick={() => handleClick('All')}
        >
          <div className="branch-btn-title">📚 All Branches</div>
          <p className="branch-btn-tagline">"Master all departments in one place."</p>
        </button>
        {specificBranches.map((branch) => (
          <button
            key={branch}
            type="button"
            className={`branch-button ${selectedBranch === branch ? 'active' : ''}`}
            onClick={() => handleClick(branch)}
          >
            <div className="branch-btn-title">{branchIcons[branch] || '📖'} {branch}</div>
            {branchTaglines[branch] && (
              <p className="branch-btn-tagline">"{branchTaglines[branch]}"</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

