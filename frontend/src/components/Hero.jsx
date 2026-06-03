import { useState } from 'react'
import api from '../services/api'

export default function Hero({ featuredGame, onProductAdded }) {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const bgUrl = featuredGame?.app_id
    ? `https://cdn.akamai.steamstatic.com/steam/apps/${featuredGame.app_id}/header.jpg`
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await api.post('/products', { url, email })
      setSuccess('Jogo adicionado com sucesso!')
      setUrl('')
      setEmail('')
      onProductAdded()
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao cadastrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero">
      {bgUrl && (
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />
      )}
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="topbar">
          <span className="topbar-title">Steam Price Tracker</span>
        </div>

        <h1 className="hero-title">
          Monitore.<br />Compre.<br />
          <span>Economize.</span>
        </h1>
        <p className="hero-sub">
          Alertas inteligentes de preços<br />para jogadores inteligentes.
        </p>

        <form className="hero-form" onSubmit={handleSubmit}>
          <div className="hero-fields">
            <div className="field-wrap">
              <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="url"
                className="hero-input"
                placeholder="Cole a URL do jogo na Steam..."
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="field-wrap">
              <svg className="field-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                type="email"
                className="hero-input"
                placeholder="Seu e-mail para alertas..."
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p className="msg error">{error}</p>}
          {success && <p className="msg success">✓ {success}</p>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : '+ Monitorar preço'}
          </button>
        </form>
      </div>
    </div>
  )
}