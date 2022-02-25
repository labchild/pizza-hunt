const router = require('express').Router();
const htmlRoutes = require('./html/html-routes');
const apiRoutes = require('./apiRoutes');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

// if route does not exist
router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
