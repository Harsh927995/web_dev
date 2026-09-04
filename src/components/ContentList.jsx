function ContentList({ items, selectedId, onSelect, bookmarks = [] }) {
  return (
    <div className="content-list">
      <div className="content-list-header">
        <h2>📚 Available Resources</h2>
        <span className="items-count-badge">{items.length} items</span>
      </div>
      <div className="content-list-items">
        {items.length === 0 ? (
          <div className="empty-list">
            <p>🔍 No resources match your filters.</p>
            <span className="empty-list-sub">Try adjusting the search query or selecting a different branch.</span>
          </div>
        ) : (
          items.map((item) => {
            const isSaved = bookmarks.includes(item.id);
            return (
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
                  {isSaved && <span className="item-saved-star" title="Bookmarked">★</span>}
                </div>
                <div className="content-item-meta">
                  <span>{item.subject}</span>
                  <span>&bull;</span>
                  <span>{item.year}</span>
                  <span>&bull;</span>
                  <span className={`type-label ${item.type === 'PYQ' ? 'pyq' : 'notes'}`}>
                    {item.type}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ContentList;
