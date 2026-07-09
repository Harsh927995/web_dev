function SearchBar({
  value,
  onChange,
  topics,
  years,
  selectedTopic,
  selectedYear,
  onTopicChange,
  onYearChange,
}) {
  return (
    <div className="search-bar">
      <label>
        Search
        <input
          type="search"
          placeholder="Search PYQs or notes..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>

      <div className="filters-row">
        <label>
          Topic
          <select value={selectedTopic} onChange={(event) => onTopicChange(event.target.value)}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </label>

        {/* <label>
          Year
          <select value={selectedYear} onChange={(event) => onYearChange(event.target.value)}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label> */}
      </div>
    </div>
  );
}

export default SearchBar;
