function SearchBar({
  value,
  onChange,
  topics,
  years,
  selectedTopic,
  selectedYear,
  onTopicChange,
  onYearChange,
  onResetFilters
}) {
  const hasActiveFilters = Boolean(value || selectedTopic !== 'All' || selectedYear !== 'All');

  return (
    <div className="search-bar">
      <div className="search-header">
        <label htmlFor="search-input" className="search-title">🔍 Search & Filter</label>
        {hasActiveFilters && (
          <button 
            type="button" 
            className="reset-filters-btn" 
            onClick={() => {
              onChange('');
              onTopicChange('All');
              onYearChange('All');
              if (onResetFilters) onResetFilters();
            }}
          >
            Reset
          </button>
        )}
      </div>

      <div className="search-input-wrapper">
        <input
          id="search-input"
          type="search"
          placeholder="Search topics, questions, formulas..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Search PYQs and study notes"
        />
      </div>

      <div className="filters-row">
        <label>
          <span>Topic</span>
          <select 
            value={selectedTopic} 
            onChange={(event) => onTopicChange(event.target.value)}
            aria-label="Filter by topic"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Year</span>
          <select 
            value={selectedYear} 
            onChange={(event) => onYearChange(event.target.value)}
            aria-label="Filter by year"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
