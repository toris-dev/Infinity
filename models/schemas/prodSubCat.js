const { Schema } = require('mongoose');

const prodSubCatSchema = new Schema({
    prodSubCat: {
        type: String,
        required: true,
    },
});

module.exports = prodSubCatSchema;