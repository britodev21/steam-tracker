import { useState } from 'react'
import api from '../services/api'

export default function ProductForm({ onProductAdded }) {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await api.post('/products', { url, email })
      setSuccess('✅ Jogo cadastrado com sucesso!')
      setUrl('')
      setEmail('')
      onProductAdded()
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar produto.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card">
      <h2>Monitorar novo jogo</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>URL do jogo na Steam</label>
          <input
            type="url"
            placeholder="https://store.steampowered.com/app/..."
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Seu e-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <p className="msg error">{error}</p>}
        {success && <p className="msg success">{success}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Monitorar preço'}
        </button>
      </form>
    </div>
  )
}