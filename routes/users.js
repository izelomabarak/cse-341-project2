const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validator = require('../middleware/validator.js')
const authenticate = require('../middleware/authenticate.js')

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', authenticate.isAuthenticated, validator.userRules(), validator.validate, usersController.createUser);

router.put('/:id', authenticate.isAuthenticated, validator.userRules(), validator.validate, usersController.updateUser);

router.delete('/:id', authenticate.isAuthenticated, usersController.deleteUser);

module.exports = router;