const express = require('express')
const session = require('express-session')

const logger = require('./src/utils/logger')
const product = require('./src/product/route')
const cart = require('./src/cart/route')

const PORT = 3000
const app = express()

// Session management
app.use(session({
  secret: 'S3ss10nManag3m3nt!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Application routes
app.get('/product', product.getProducts)
app.get('/cart', cart.getCart)

// Run server
app.listen(PORT, () => logger.debug(`Example app listening on port ${PORT}!`))
