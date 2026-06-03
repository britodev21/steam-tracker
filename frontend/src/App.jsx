import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'
import api from './services/api'

export default function App() {
  const [products, setProducts] = useState([])

  async function fetchProducts() {
    try {
      const { data } = await api.get('/products')
      setProducts(data)
    } catch (err) {
      console.error('Erro ao buscar produtos:', err)
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/products')
        setProducts(data)
      } catch (err) {
        console.error('Erro ao buscar produtos:', err)
      }
    }
    load()
  }, [])

  return (
    <div className="container">
      <header>
        <h1>🎮 Steam Price Tracker</h1>
        <p>Monitore preços de jogos e receba alertas por e-mail</p>
      </header>
      <main>
        <ProductForm onProductAdded={fetchProducts} />
        <ProductList products={products} onProductRemoved={fetchProducts} />
      </main>
    </div>
  )
}