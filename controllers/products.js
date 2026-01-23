const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Products']
    const result = await mongodb.getDatabase().db().collection('products').find(); 
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products)
   });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId }); 
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
   });
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const product = {
        name: req.body.name,
        maker: req.body.maker,
        country: req.body.country,
        description: req.body.description,
        price: req.body.price, 
        stock: req.body.stock,
        category: req.body.category
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product); 
    if (response.acknowledged) {
        const result = await mongodb.getDatabase().db().collection('products').find().sort({'_id':-1}).limit(1); 
        result.toArray().then((products) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`The Id of the new product is:${products[0]._id}`);
        });
    } else {
        res.status(500).json(response.error || 'Some error has hapen in the Creation of a Product.')
    }
};
 
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const product = {
        name: req.body.name,
        maker: req.body.maker,
        country: req.body.country,
        description: req.body.description,
        price: req.body.price, 
        stock: req.body.stock,
        category: req.body.category
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product); 
    if (response.modifiedCount > 0) {
        res.status(200).json('The Updating of the Product was successful');
    } else {
        res.status(500).json(response.error || 'Some error has hapen in the Updating of the Product.')
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }); 
    if (response.deletedCount > 0) {
        res.status(200).json('The Deleting of the Product was successful');
    } else {
        res.status(500).json(response.error || 'Some error has hapen Deleting the Product.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};