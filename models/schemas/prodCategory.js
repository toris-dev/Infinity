const { Schema } = require('mongoose');

const prodCategorySchema = new Schema({
    prodMajorCat: {
        type: Number,
        required: true,
    },
    prodSubCat: {
        type: String,
        required: true
    }
});

module.exports = prodCategorySchema;