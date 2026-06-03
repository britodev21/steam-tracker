import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import FeaturedStrip from './components/FeaturedStrip'
import GameCard from './components/GameCard'
import api from './services/api'
import './styles/layout.css'
import './styles/hero.css'
import './styles/games.css'

export default function App() {
  const [products, setProducts] = useState([])
  const [featured, setFeatured] = useState(null)
  
  useEffect(() => { fetchProducts() }, [])
  
  async function fetchProducts() {
    try {
      const { data } = await api.get('/products')
      setProducts(data)
      if (data.length > 0) setFeatured(prev => prev ?? data[0])
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
    }
  }


  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Hero featuredGame={featured} onProductAdded={fetchProducts} />
        <FeaturedStrip
          products={products}
          activeId={featured?.id}
          onSelect={setFeatured}
        />
        <section className="games-section">
          <div className="section-row">
            <span className="section-label">Meus jogos</span>
            <span className="section-count"> · {products.length} monitorados</span>
          </div>
          {products.length === 0
            ? <p className="empty">Nenhum jogo monitorado ainda.</p>
            : products.map(p => (
                <GameCard
                  key={p.id}
                  product={p}
                  active={featured?.id === p.id}
                  onClick={() => setFeatured(p)}
                  onRemoved={fetchProducts}
                />
              ))
          }
        </section>
      </main>
    </div>
  )
}