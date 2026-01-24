const express = require('express');
const router = express.Router();

const usersController = require('../controllers/products');
const validator = require('../controllers/validator.js')

const errorHandeler = require('../utilities/error.js')

router.get('/', errorHandeler.handleErrors(usersController.getAll));

router.get('/:id', errorHandeler.handleErrors(usersController.getSingle));

router.post('/', validator.productRules(), validator.validate, errorHandeler.handleErrors(usersController.createProduct));

router.put('/:id', validator.productRules(), validator.validate, errorHandeler.handleErrors(usersController.updateProduct));

router.delete('/:id', errorHandeler.handleErrors(usersController.deleteProduct));

module.exports = router;