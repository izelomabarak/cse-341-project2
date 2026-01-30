const express = require('express');
const router = express.Router();

const usersController = require('../controllers/products');
const validator = require('../middleware/validator.js');
const authenticate = require('../middleware/authenticate.js')

router.get('/', usersController.getAll);

router.get('/:id',  usersController.getSingle);

router.post('/', authenticate.isAuthenticated, validator.productRules(), validator.validate, usersController.createProduct);

router.put('/:id', authenticate.isAuthenticated, validator.productRules(), validator.validate, usersController.updateProduct);

router.delete('/:id', authenticate.isAuthenticated, usersController.deleteProduct);

module.exports = router;