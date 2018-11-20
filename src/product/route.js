const helper = require('../utils/helper')

const productModel = require('./model')

/**
 * Return the complete list of products
 */
const getProducts = (req, res) => {
  const products = productModel.getProducts()

  res.send(products.map(product => ({
    id: product.id,
    name: product.name,
    link: helper.getUrl(`/cart/${product.id}`) // Add link to push one item in the cart
  })))
}

module.exports = {
  getProducts
}
