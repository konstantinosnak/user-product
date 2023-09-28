const express = require('express');
const router = express.Router();


const productController = require('../controllers/product.controller');

router.get('/', productController.findAll);
router.get('/:product', productController.findOne);
router.post('/', productController.create);
router.patch('/:username', productController.update);
router.delete('/:product', productController.delete);

module.exports = router;