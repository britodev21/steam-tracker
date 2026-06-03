import api from '../services/api'

export default function GameCard({ product, active, onClick, onRemoved }) {
  const thumbUrl = product.app_id
    ? `https://cdn.akamai.steamstatic.com/steam/apps/${product.app_id}/header.jpg`
    : null

  const isFree = parseFloat(product.price) === 0
  const hasDrop = parseFloat(product.price) < parseFloat(product.last_price)
  const dropPct = hasDrop
    ? Math.round(((product.last_price - product.price) / product.last_price) * 100)
    : null

  async function handleDelete(e) {
    e.stopPropagation()
    if (!confirm(`Remover "${product.title}"?`)) return
    try {
      await api.delete(`/products/${product.id}`)
      onRemoved()
    } catch {
      alert('Erro ao remover.')
    }
  }

  return (
    <div className={`game-card ${active ? 'active' : ''}`} onClick={onClick}>
      {thumbUrl
        ? <img className="game-thumb" src={thumbUrl} alt={product.title} />
        : <div className="game-thumb placeholder" />
      }
      <div className="game-info">
        <div className="game-name">{product.title}</div>
        <div className="game-email">{product.email}</div>
      </div>
      <div className="game-right">
        {isFree
          ? <span className="badge gray">Gratuito</span>
          : <span className="game-price">
              R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}
            </span>
        }
        {hasDrop && <span className="badge orange">-{dropPct}%</span>}
      </div>
      <button className="btn-del" onClick={handleDelete} title="Remover">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  )
}