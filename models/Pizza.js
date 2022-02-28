const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
            virtuals: true,
            getters: true
        },
        id: false
    });

PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies +1, 0);
});

// create pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;