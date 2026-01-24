const router = require('express').Router();

router.use('/', require('./swagger'));
const errorHandeler = require('../utilities/error.js')

router.get('/', (req,res) => {
    //#swagger.tags=['Hello World']
    errorHandeler.handleErrors(res.send('Hello World'));
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router; 