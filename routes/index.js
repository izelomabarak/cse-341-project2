const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send('Hello World');
// });

router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs'
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
