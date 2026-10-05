// offset ve limit'e göre sayfalama: sayfa 2 -> offset 25
function Pagination({ total, limit, offset, onChange }) {
  const pageCount = Math.ceil(total / limit)
  const currentPage = offset / limit + 1

  if (pageCount <= 1) return null

  // çok sayfa varsa sadece yakındakileri göster
  const pages = []
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(pageCount, currentPage + 2); i++) {
    pages.push(i)
  }

  const goTo = (page) => onChange((page - 1) * limit)

  return (
    <div className="flex border border-muted rounded text-sm font-bold text-primary">
      <button
        disabled={currentPage === 1}
        onClick={() => goTo(1)}
        className="px-4 py-4 border-r border-muted disabled:text-muted disabled:bg-light"
      >
        First
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          className={`px-4 py-4 border-r border-muted ${page === currentPage ? 'bg-primary text-white' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === pageCount}
        onClick={() => goTo(currentPage + 1)}
        className="px-4 py-4 disabled:text-muted disabled:bg-light"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
