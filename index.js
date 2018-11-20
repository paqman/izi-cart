const express = require('express')

const logger = require('./src/utils/logger')
const cart = require('./src/routes/cart')

const app = express()
const port = 3000

app.get('/products', cart.getProducts)

app.listen(port, () => logger.debug(`Example app listening on port ${port}!`))
