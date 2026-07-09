function ContentList({ items, selectedId, onSelect }) {
  return (
    <div className="content-list">
      <h2>📚 Available content</h2>
      <div className="content-list-items">
        {items.length === 0 ? (
          <div className="empty-list">No items match your filters.</div>
        ) : (
          items.map((item) => (
            <button
              key={item.id}
              className={item.id === selectedId ? 'content-item active' : 'content-item'}
              onClick={() => onSelect(item.id)}
            >
              <div className="content-item-header">
                <span className="content-type-badge">
                  {item.type === 'PYQ' ? '📋' : '📖'}
                </span>
                <strong>{item.title}</strong>
              </div>
              <div className="content-item-meta">
                {item.subject} • {item.year} • 
                <span className={`type-label ${item.type === 'PYQ' ? 'pyq' : 'notes'}`}>
                  {item.type}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ContentList;
