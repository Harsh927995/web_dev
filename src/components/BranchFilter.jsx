export default function BranchFilter({ branches, selectedBranch, onBranchChange }) {
  return (
    <div className="branch-filter-section">
      <h3>Select Your Branch</h3>
      <div className="branch-buttons">
        <button 
          className={`branch-button ${selectedBranch === 'All' ? 'active' : ''}`}
          onClick={() => onBranchChange('All')}
        >
          📚 All Branches
        </button>
        {branches.map((branch) => (
          <button
            key={branch}
            className={`branch-button ${selectedBranch === branch ? 'active' : ''}`}
            onClick={() => onBranchChange(branch)}
          >
            {getBranchIcon(branch)} {branch}
          </button>
        ))}
      </div>
    </div>
  );
}

function getBranchIcon(branch) {
  const icons = {
    'Computer Science': '💻',
    'Civil': '🏗️',
    'Electrical': '⚡',
    'Electronics and Communication': '📡',
    'Mechanical': '⚙️'
  };
  return icons[branch] || '📖';
}
