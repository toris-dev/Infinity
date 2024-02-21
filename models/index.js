const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');
const ProductSchema = require('./schemas/product');
const prodCatSchema = require('./schemas/prodCat');

exports.User = mongoose.model('User', UserSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.ProdCategory = mongoose.model('ProdCat', prodCatSchema);