const UserSchema = require('./schemas/user');
// const ProductSchema = require('./schemas/product');
const prodCategorySchema = require('./schemas/prodCategory');
const mongoose = require('mongoose');

exports.User = mongoose.model('User', UserSchema);
// exports.Product = mongoose.model('Product', ProductSchema);
exports.ProdCategory = mongoose.model('ProdCategory', prodCategorySchema);