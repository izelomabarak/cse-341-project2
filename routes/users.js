const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validator = require('../controllers/validator.js')

const errorHandeler = require('../utilities/error.js')

router.get('/', errorHandeler.handleErrors(usersController.getAll));

router.get('/:id', errorHandeler.handleErrors(usersController.getSingle));

router.post('/', validator.userRules(), validator.validate, errorHandeler.handleErrors(usersController.createUser));

router.put('/:id', validator.userRules(), validator.validate, errorHandeler.handleErrors(usersController.updateUser));

router.delete('/:id', errorHandeler.handleErrors(usersController.deleteUser));

module.exports = router;