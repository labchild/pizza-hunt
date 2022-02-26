const { Schema, model } = require('mongoose');

// model includes
// name of pizza
// name of pizza creator (user)
// timestamp pizza created at
// timestamp pizza updated at
// suggested pizza size
// pizza toppings
const PizzaSchema = new Schema(
    // field definitions
    {
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
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    // options
    {
        toJSON: {
            virtuals: true
        },
        id: false
    });

PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// create pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;