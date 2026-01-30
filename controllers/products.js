const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    //#swagger.tags=['Products']
    try {
        const result = await mongodb.getDatabase().db().collection('products').find(); 
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
};

const getSingle = async (req,res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: productId }); 
        if (!result){
                return res.status(400).json({error: 'Error', message: 'The ID dont mach whit any of the products, try anoter id',});
            }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
};

const createProduct = async (req,res) => {
    //#swagger.tags=['Products']
    try {
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
        if (response.modifiedCount > 0){
            return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a Product.',});
        }
        const result = await mongodb.getDatabase().db().collection('products').find().sort({'_id':-1}).limit(1); 
        if (!result){
            return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a Product.',});
        }
        result.toArray().then((products) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(`The Id of the new product is:${products[0]._id}`);
        });
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
};
 
const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
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
            return res.status(200).json('The Updating of the Product was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen in the Updating of the Product. Try anoter id',})
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}};

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId }); 
    if (response.deletedCount > 0) {
        return res.status(200).json('The Deleting of the Product was successful');
    } else {
        return res.status(500).json({error: 'Error', message: 'Some error has hapen Deleting the Product. Try whit a diferent Id',});
    }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
}};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};