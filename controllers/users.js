const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('users').find(); 
    return result
};

const getSingle = async (userId) => {
    //#swagger.tags=['Users']
    const Id = new ObjectId(userId);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: Id }); 
    return result
};

const createUser = async (user) => {
    //#swagger.tags=['Users']
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user); 
    const result = await mongodb.getDatabase().db().collection('users').find().sort({'_id':-1}).limit(1); 
    return result
};
 
const updateUser = async (userId, user) => {
    //#swagger.tags=['Users']
    const Id = new ObjectId(userId);
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: Id }, user); 
    let result = "0" 
    if (response.modifiedCount > 0) {
        result = "1"
    } else {
        result = "2"
    }
    return result
};

const deleteUser = async (userId) => {
    //#swagger.tags=['Users']
    const Id = new ObjectId(userId);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: Id }); 
    return response
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};