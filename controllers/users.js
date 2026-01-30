const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try{
        const result = await mongodb.getDatabase().db().collection('users').find(); 
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

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId }); 
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

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection('users').insertOne(user); 
        if (response.modifiedCount > 0){
                return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a User.',});
        }
        const result = await mongodb.getDatabase().db().collection('users').find().sort({'_id':-1}).limit(1); 
        if (!result){
            return res.status(400).json({error: 'Error', message: 'Some error has hapen in the Creation of a User.',});
        }
        result.toArray().then((user) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(`The Id of the new user is:${user[0]._id}`);
        });
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
};
 
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        };
        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user); 
        if (response.modifiedCount > 0) {
            return res.status(200).json('The Updating of the User was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen in the Updating of the User. Try anoter id',})
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId }); 
    if (response.deletedCount > 0) {
            return res.status(200).json('The Deleting of the User was successful');
        } else {
            return res.status(500).json({error: 'Error', message: 'Some error has hapen Deleting the User. Try whit a diferent Id',});
        }
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};