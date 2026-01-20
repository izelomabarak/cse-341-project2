const express = require('express');
const router = express.Router();

const usersController = require('../controllers/products');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createProduct);

router.put('/:id', usersController.updateProduct);

router.delete('/:id', usersController.deleteProduct);

module.exports = router;