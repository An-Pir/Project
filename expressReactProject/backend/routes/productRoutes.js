const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getAllProducts, addNewProduct, upload } = require('../controllers/productController')

router.get(
      '/',
      getAllProducts
)

router.post(
      '/add',
      upload.single('image'),
      authMiddleware,
      addNewProduct
)

module.exports = router
