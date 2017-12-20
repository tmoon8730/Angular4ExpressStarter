var express = require('express')
var router = express.Router()

var productsRouter = require('./routes/products.route')

router.use('/products', productsRouter)

module.exports = router;
