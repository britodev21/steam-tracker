import api from '../services/api'

export default function ProductList({ products, onProductRemoved }) {
  async function handleDelete(id) {
    if (!confirm('Remover monitoramento desse jogo?')) return

    try {
      await api.delete(`/products/${id}`)
      onProductRemoved()
    } catch {
      alert('Erro ao remover produto.')
    }
  }

  if (products.length === 0) {
    return (
      <div className="empty">
        <p>Nenhum jogo monitorado ainda.</p>
      </div>
    )
  }

  return (
    <div className="product-list">
      <h2>Jogos monitorados</h2>
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-email">📧 {product.email}</p>
            <a href={product.url} target="_blank" rel="noreferrer">
              Ver na Steam →
            </a>
          </div>
          <div className="product-price">
            {parseFloat(product.price) === 0 ? (
              <span className="free">Gratuito</span>
            ) : (
              <>
                <span className="price">
                  R$ {parseFloat(product.price).toFixed(2).replace('.', ',')}
                </span>
                {product.last_price !== product.price && (
                  <span className="last-price">
                    antes: R$ {parseFloat(product.last_price).toFixed(2).replace('.', ',')}
                  </span>
                )}
              </>
            )}
            <button className="btn-remove" onClick={() => handleDelete(product.id)}>
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}