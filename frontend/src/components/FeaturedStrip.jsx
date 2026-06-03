export default function FeaturedStrip({ products, activeId, onSelect }) {
  if (products.length === 0) return null

  return (
    <div className="featured-strip">
      {products.map(p => {
        const thumbUrl = p.app_id
          ? `https://cdn.akamai.steamstatic.com/steam/apps/${p.app_id}/header.jpg`
          : null
        const isFree = parseFloat(p.price) === 0

        return (
          <div
            key={p.id}
            className={`feat-card ${activeId === p.id ? 'active' : ''}`}
            onClick={() => onSelect(p)}
          >
            {thumbUrl
              ? <img src={thumbUrl} alt={p.title} />
              : <div className="feat-thumb-placeholder" />
            }
            <div className="feat-info">
              <div className="feat-name">{p.title}</div>
              {isFree
                ? <span className="badge gray sm">Gratuito</span>
                : <span className="badge orange sm">
                    R$ {parseFloat(p.price).toFixed(2).replace('.', ',')}
                  </span>
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}