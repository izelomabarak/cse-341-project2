const express = require('express');
const router = express.Router();

const usersController = require('../controllers/products');
const validator = require('../controllers/validator.js');

router.get('/', usersController.getAll);

router.get('/:id',  usersController.getSingle);

router.post('/', validator.productRules(), validator.validate, usersController.createProduct);

router.put('/:id', validator.productRules(), validator.validate, usersController.updateProduct);

router.delete('/:id', usersController.deleteProduct);

module.exports = router;