const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().db().collection('products').find(); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users)
   });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('products').find({ _id: userId }); 
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
   });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const response = await mongodb.getDatabase().db().collection('products').insertOne(user); 
    if (response.acknowledged) {
        const result = await mongodb.getDatabase().db().collection('products').find().sort({'_id':-1}).limit(1); 
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(`The Id of the new user is:${users[0]._id}`);
        });
    } else {
        res.status(500).json(response.error || 'Some error has hapen in the Creation of a User.')
    }
};
 
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: userId }, user); 
    if (response.modifiedCount > 0) {
        res.status(200).json('The Updating od the User was successful');
    } else {
        res.status(500).json(response.error || 'Some error has hapen in the Updating of the User.')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: userId }); 
    if (response.deletedCount > 0) {
        res.status(200).json('The Deleting od the User was successful');
    } else {
        res.status(500).json(response.error || 'Some error has hapen Deleting the User.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};