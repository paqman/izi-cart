const logger = require('../utils/logger')
const helper = require('../utils/helper')
const cart = require('./model')
const product = require('../product/model')

/**
 * Return the cart object from the session
 * @param req Current request
 */
const getUserCart = req => req.session.cart

/**
 * Return the cart of the current user
 * @param req Current Request
 * @param res Current Response
 */
const getCart = (req, res) => {
  const currentCart = getUserCart(req)

  return res
    .send(currentCart.map(cartItem => Object.assign({}, cartItem, {
      link: helper.getUrl(`/cart/${cartItem.id}`) // Add link to remove item
    })))
}

/**
 * Check the ID provided in the request and verifies that this product actually exists
 * in the database
 * @param itemId ID of the product
 */
const handleProductParameter = (itemId) => {
  const id = parseInt(itemId, 10)
  if (id === undefined || Number.isNaN(id)) {
    return undefined
  }

  logger.debug(`Searching product ${id}`)

  return product.getProduct(id)
}

/**
 * Update the current cart with the right operation (increase or decrease)
 * through the provided function
 * @param req Current Request
 * @param res Current Response
 * @param updateCartFunction Update function, must take care of updating the cart content
 * @returns {*}
 */
const updateCart = (req, res, updateCartFunction) => {
  // Handle ID parameter
  const productToUpdate = handleProductParameter(req.params.id)
  if (productToUpdate === undefined) {
    return helper.notFound(res, 'Item not found')
  }

  logger.debug(`Updating ${JSON.stringify(productToUpdate, null, 2)}`)

  // Update cart with the function passed as parameter (increase/decrease) then total price
  req.session.cart = updateCartFunction(productToUpdate, getUserCart(req))
    .map(cart.handleProductTotal)

  return getCart(req, res)
}

/**
 * Add an item to the cart or update the quantity of items
 */
const addItemToCart = (req, res) => updateCart(req, res, cart.addProductToCart)

/**
 * Remove an item from the cart or update the quantity of items
 */
const removeItemFromCart = (req, res) => updateCart(req, res, cart.removeProductFromCart)

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart
}
