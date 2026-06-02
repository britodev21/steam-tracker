const productService = require('../services/productService')

async function create(req, res) {
  try {
    const { url, email } = req.body

    if (!url || !email) {
      return res.status(400).json({ error: 'URL e e-mail são obrigatórios.' })
    }

    const product = await productService.createProduct(url, email)
    return res.status(201).json(product)

  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

async function getAll(req, res) {
  try {
    const products = await productService.getAllProducts()
    return res.status(200).json(products)

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

async function getById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id)
    return res.status(200).json(product)

  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

async function remove(req, res) {
  try {
    const product = await productService.deleteProduct(req.params.id)
    return res.status(200).json({ message: 'Produto removido com sucesso.', product })

  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

module.exports = { create, getAll, getById, remove }