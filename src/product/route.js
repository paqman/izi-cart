const URL_PREFIX = 'http://localhost:3000/cart/'

const productModel = require('./model')

/**
 * Return the complete list of products
 */
const getProducts = (req, res) => {
  const products = productModel.getProducts()

  res.send(products.map(product => ({
    id: product.id,
    name: product.name,
    // Add link to push one item in the cart
    link: `${URL_PREFIX}${product.id}`
  })))
}

module.exports = {
  getProducts
}
