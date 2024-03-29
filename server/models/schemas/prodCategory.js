const { Schema } = require('mongoose');
const prodSubSchema = require('./prodSubCategory');

const prodCategorySchema = new Schema({
  prodMajorCategory: {
    type: String,
    required: true
  },
  prodSubCategories: {
    type: prodSubSchema,
    required: true
  }
});

module.exports = prodCategorySchema;
