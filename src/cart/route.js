const cartModel = require('./model')

const getProducts = (req, res) => {
  res.send(cartModel.getProducts())
}

module.exports = {
  getProducts
}
