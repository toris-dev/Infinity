const { Schema } = require('mongoose');

const orderProdsSchema = new Schema({
    prodNum: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    prodName: {
        type: String,
        required: true,
    },
    prodCost: {
        type: Number,
        required: true,
    },
    orderProdCount: {
        type: Number,
        required: true,
    }
});

module.exports = orderProdsSchema;