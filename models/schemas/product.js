const { Schema } = require('mongoose');
const prodImg = require('./prodImg');
const prodSubCat = require('./prodSubCat');


const productSchema = new Schema({
    prodNum: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    prodName: {
        type: String,
        required: true,
    },
    prodSubCat: {
        type: prodSubCat,
        required: true,
    },
    prodCost: {
        type: Number,
        required: true,
    },
    prodContent: {
        type: String,
    },
    prodImgs: {
        type: [prodImg],
    },
    prodUseYn: {
        type: Date,
        required: true,
        default: null,
    },
    prodRegDate: {
        type: Date,
        required: true,
        default: () => Date.now() + 9*60*60*1000,
    },
    prodRemains: {
        type: Number,
        required: true,
    },
    prodSize: {
        type: String,
        required: true,
    },
    prodColor: {
        type: String,
        required: true,
    },
    prodCount: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = productSchema;