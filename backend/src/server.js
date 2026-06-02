require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares globais
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/products', productRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Middleware de erros — sempre por último
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
})