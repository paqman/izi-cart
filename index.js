const express = require('express')

const logger = require('./src/utils/logger')
const cart = require('./src/cart/route')

const app = express()
const port = 3000

app.get('/product', cart.getProducts)

app.listen(port, () => logger.debug(`Example app listening on port ${port}!`))
