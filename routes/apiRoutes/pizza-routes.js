const { route } = require('..');

const router = require('express').Router();

// GET all and POST at /api/pizzas
router
    route('/')
    .get()
    .post();

// GET one, PUT, DELETE at /api/pizzas/:id
router
    .route('/:id')
    .get()
    .put()
    .delete();

module.exports = router;