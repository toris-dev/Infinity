const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');
const ProductSchema = require('./schemas/product');
const prodCatSchema = require('./schemas/prodCat');
const prodImgSchema = require('./schemas/prodImg');
const orderSchema = require('./schemas/orders');

exports.User = mongoose.model('User', UserSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.ProdCat = mongoose.model('ProdCat', prodCatSchema);
exports.prodImg = mongoose.model('prodImg', prodImgSchema);
exports.Orders = mongoose.model('orders', orderSchema);