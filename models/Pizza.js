const { Schema, model } = require('mongoose');

// model includes
// name of pizza
// name of pizza creator (user)
// timestamp pizza created at
// timestamp pizza updated at
// suggested pizza size
// pizza toppings
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

// create pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;