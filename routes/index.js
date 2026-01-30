const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req,res) => {
    //#swagger.tags=['Hello World']
    try {
        res.setHeader('Content-Type', 'application/json');
        res.send('Hello World');
    } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).json({error: 'Error', message: err.message,});
    }
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.get ('/login', passport.authenticate('github'), (req, res) => {});
router.get ('/logout', function(req, res, next) {
    req.logout (function(err) {
        if (err) { return next(err); }
        res.redirect('/')
    });
});

module.exports = router; 