const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validator = require('../controllers/validator.js')

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', validator.userRules(), validator.validate, usersController.createUser);

router.put('/:id', validator.userRules(), validator.validate, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;