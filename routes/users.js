const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validator = require('../controllers/validator.js')

router.get('/', async (req,res) => {
    try {
        const result = await usersController.getAll();
        if (!result){
            return res.status(400).json({error: 'Error', message: 'Sorry No Content',});
        }
        result.toArray().then((products) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(products)
        });
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
});

router.get('/:id', async (req,res) => {
    const userId = req.params.id
    try {
        const result = await usersController.getSingle(userId);
        if (!result){
            return res.status(400).json({error: 'Error', message: 'The ID dont mach whit any of the products, try anoter id',});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
});

router.post('/', validator.userRules(), validator.validate, async (req,res) => { 
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    try {
        const result = await usersController.createUser(user)
        if (result.modifiedCount > 0){
            return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a User.',});
        }
        result.toArray().then((user) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`The Id of the new user is:${user[0]._id}`);
        });
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}});

router.put('/:id', validator.userRules(), validator.validate, async (req,res) => { 
    const userId = req.params.id
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    try {
        const response = await usersController.updateUser(userId, user)
        if (response === "1") {
            return res.status(200).json('The Updating of the User was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen in the Updating of the User. Try anoter id',})
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}});

router.delete('/:id', async (req,res) => {
    const userId = req.params.id
    try {
        const response = await usersController.deleteUser(userId);
        if (response.deletedCount > 0) {
            return res.status(200).json('The Deleting of the User was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen Deleting the User. Try whit a diferent Id',});
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
});

module.exports = router;