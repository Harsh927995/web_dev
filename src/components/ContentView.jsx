function ContentView({ item }) {
  return (
    <article className="content-view">
      <header className="content-view-header">
        <div className="badge-section">
          <span className={`content-badge ${item.type === 'PYQ' ? 'pyq-badge' : 'notes-badge'}`}>
            {item.type === 'PYQ' ? '📋 PAST YEAR QUESTION' : '📖 CLASS NOTES'}
          </span>
          <span className="year-badge">{item.year}</span>
        </div>
        <h2>{item.title}</h2>
        <p className="meta">{item.subject} · {item.topic}</p>
      </header>

      <section className="content-section">
        <h3>📝 Content</h3>
        <pre>{item.content}</pre>
      </section>

      {item.notes && (
        <section className="content-section notes-section">
          <h3>💡 Study Notes & Tips</h3>
          <p>{item.notes}</p>
        </section>
      )}
    </article>
  );
}

export default ContentView;
