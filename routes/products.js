const express = require('express');
const router = express.Router();

const usersController = require('../controllers/products');
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
    const productId = req.params.id
    try {
        const result = await usersController.getSingle(productId);
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

router.post('/', validator.productRules(), validator.validate, async (req,res) => { 
    const product = {
        name: req.body.name,
        maker: req.body.maker,
        country: req.body.country,
        description: req.body.description,
        price: req.body.price, 
        stock: req.body.stock,
        category: req.body.category
    };
    try {
        const result = await usersController.createProduct(product)
        if (result.modifiedCount > 0){
            return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a Product.',});
        }
        result.toArray().then((products) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`The Id of the new product is:${products[0]._id}`);
        });
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}});

router.put('/:id', validator.productRules(), validator.validate, async (req,res) => { 
    const productId = req.params.id
    const product = {
        name: req.body.name,
        maker: req.body.maker,
        country: req.body.country,
        description: req.body.description,
        price: req.body.price, 
        stock: req.body.stock,
        category: req.body.category
    };
    try {
        const response = await usersController.updateProduct(productId, product)
        if (response === "1") {
            return res.status(200).json('The Updating of the Product was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen in the Updating of the Product. Try anoter id',})
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}});

router.delete('/:id', async (req,res) => {
    const productId = req.params.id
    try {
        const response = await usersController.deleteProduct(productId);
        if (response.deletedCount > 0) {
            return res.status(200).json('The Deleting of the Product was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen Deleting the Product. Try whit a diferent Id',});
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
});

module.exports = router;