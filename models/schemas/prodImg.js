const { Schema } = require('mongoose');

const prodImgSchema = new Schema({
    prodNum: {
        type: Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    prodImg: {
        type: String,
    },
})

module.exports = prodImgSchema;