const { Schema } = require('mongoose');
const prodSubSchema = require('./prodSubCat');

const prodCatSchema = new Schema({
  prodMajorCat: {
    type: Number,
    required: true,
  },
  prodSubCats: {
    type: [prodSubSchema],
    required: true,
  },
});

module.exports = prodCatSchema;
