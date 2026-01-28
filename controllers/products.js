const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
    //#swagger.tags=['Products']
    const result = await mongodb.getDatabase().db().collection('products').find(); 
    return result
};

const getSingle = async (productId) => {
    //#swagger.tags=['Products']
    const id = new ObjectId(productId);
    const result = await mongodb.getDatabase().db().collection('products').findOne({ _id: id }); 
    return result
};

const createProduct = async (product) => {
    //#swagger.tags=['Products']
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product); 
    const result = await mongodb.getDatabase().db().collection('products').find().sort({'_id':-1}).limit(1); 
    return result
};
 
const updateProduct = async (productId, product) => {
    //#swagger.tags=['Products']
    const Id = new ObjectId(productId);
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: Id }, product);
    let result = "0" 
    if (response.modifiedCount > 0) {
        result = "1"
    } else {
        result = "2"
    }
    return result
};

const deleteProduct = async (productId) => {
    //#swagger.tags=['Products']
    const Id = new ObjectId(productId);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: Id }); 
    return response
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};