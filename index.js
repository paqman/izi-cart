const express = require('express')
const cart = require('./src/routes/cart')
const app = express()
const port = 3000

app.get('/', cart.getProducts)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
