const express = require('express')
const session = require('express-session')

const logger = require('./src/utils/logger')
const product = require('./src/product/route')
const cart = require('./src/cart/route')

const PORT = 3000
const app = express()

// Session management
// For dev purpose we are using the in memory storage
app.use(session({
  secret: 'S3ss10nManag3m3nt!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Initialize session cart in a middleware
const cartInitializer = (req, res, next) => {
  if (req.session.cart === undefined) {
    req.session.cart = []
  }
  next()
}
app.use(cartInitializer)

// Routes
app.get('/product', product.getProducts)
app.get('/cart', cart.getCart)
app.post('/cart/:id', cart.addItemToCart)
app.delete('/cart/:id', cart.removeItemFromCart)

// Run server
app.listen(PORT, () => logger.debug(`izi-cart listening on port ${PORT}!`))
