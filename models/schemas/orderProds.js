const { Schema } = require('mongoose');

const orderProdsSchema = new Schema({
    prodNum: {
        type: String,
        required: true,
    },
    orderProdCount: {
        type: Number,
        required: true,
    }
});

module.exports = orderProdsSchema;