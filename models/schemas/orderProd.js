const { Schema } = require('mongoose');

const orderProdSchema = new Schema({
    prodNum: {
        type: String,
        required: true,
    },
    orderProdCount: {
        type: Number,
        required: true,
    }
});

module.exports = orderProdSchema;