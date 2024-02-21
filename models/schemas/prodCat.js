const { Schema } = require('mongoose');
const prodSubSchema = require('./prodSubCat');

const prodCatSchema = new Schema({
    prodMajorCat: {
        type: Number,
        required: true,
    },
    prodSubCat: {
        type: [prodSubSchema],
        required: true,
    },
});

module.exports = prodCatSchema;
