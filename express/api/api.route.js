var express = require('express')
var router = express.Router()

/**
 * Router imports
 * Import all the router files
 */
var productsRouter = require('./routes/products.route')

/**
 * Route configurations
 * Pass on requests to specific routers
 */
router.use('/products', productsRouter)


module.exports = router;
