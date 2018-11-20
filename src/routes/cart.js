const PRODUCTS = [{ id: 1, name: 'flechettes' }]

const getProducts = (req, res) => {
  res.send(PRODUCTS)
}

module.exports = {
  getProducts
}
