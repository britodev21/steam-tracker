const pool = require('../config/database');
const { scrapeSteamGame } = require('../scrapers/steamScraper')

// Valida se a URL é da Steam
function isValidSteamUrl(url) {
  try {
    const parsed = new URL(url)
    return parsed.hostname === 'store.steampowered.com' && parsed.pathname.includes('/app/')
  } catch {
    return false
  }
}

// Cadastra um novo produto
async function createProduct(url, email) {
  if (!isValidSteamUrl(url)) {
    throw new Error('URL inválida. Use uma URL da Steam no formato: https://store.steampowered.com/app/...')
  }

  // Verifica se já existe esse produto com esse email
  const existing = await pool.query(
    'SELECT id FROM products WHERE url = $1 AND email = $2',
    [url, email]
  )

  if (existing.rows.length > 0) {
    throw new Error('Você já está monitorando esse jogo com esse e-mail.')
  }

  // Raspa os dados da Steam
  const { title, price } = await scrapeSteamGame(url)

  // Salva no banco
  const result = await pool.query(
    `INSERT INTO products (url, title, price, last_price, email)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [url, title, price, price, email]
  )

  return result.rows[0]
}

// Lista todos os produtos
async function getAllProducts() {
  const result = await pool.query(
    'SELECT * FROM products ORDER BY created_at DESC'
  )
  return result.rows
}

// Busca produto por id
async function getProductById(id) {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  )

  if (result.rows.length === 0) {
    throw new Error('Produto não encontrado.')
  }

  return result.rows[0]
}

// Deleta produto
async function deleteProduct(id) {
  const result = await pool.query(
    'DELETE FROM products WHERE id = $1 RETURNING *',
    [id]
  )

  if (result.rows.length === 0) {
    throw new Error('Produto não encontrado.')
  }

  return result.rows[0]
}

module.exports = { createProduct, getAllProducts, getProductById, deleteProduct }