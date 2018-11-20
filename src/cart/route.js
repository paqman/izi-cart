const cart = require('./model')

/**
 * Return the cart object from the session
 * @param req Current request
 */
const getCartFromSession = req => req.session.cart || []

/**
 * Return the cart of the current user
 */
const getCart = (req, res) => {
  const currentCart = getCartFromSession(req)

  res.send(currentCart)
}

/**
 * Add an item to the cart or update the number of items
 */
const addItemToCart = (req, res) => {

}

module.exports = {
  getCart
}
