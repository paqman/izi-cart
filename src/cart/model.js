/**
 * Add the product to the current cart
 * @param product Product to add
 * @param cart Current user's cart
 */
const addProductToCart = (product, cart) => {
  const productFromCart = cart.find(p => p.id === product.id)
    || Object.assign({}, product, { quantity: 0 })

  // This product is not in the cart yet
  if (productFromCart.quantity === 0) {
    cart.push(productFromCart)
  }

  productFromCart.quantity += 1

  return cart
}

/**
 * Remove the product from the current cart
 * @param product The product to remove
 * @param cart Current user's cart
 */
const removeProductFromCart = (product, cart) => {
  const productFromCart = cart.find(p => p.id === product.id)
  // Item is not in the current cart
  if (productFromCart === undefined) {
    return cart
  }

  productFromCart.quantity -= 1

  return cart.filter(p => p.quantity > 0)
}

/**
 * Add total to a product (quantity * price)
 * @param product The product to update
 */
const handleProductTotal = product => Object
  .assign({}, product, { total: product.quantity * product.price })

module.exports = {
  addProductToCart,
  handleProductTotal,
  removeProductFromCart
}
