const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');
const ProductSchema = require('./schemas/product');
const prodCatSchema = require('./schemas/prodCat');
const orderSchema = require('./schemas/orders');

exports.User = mongoose.model('User', UserSchema);
exports.Product = mongoose.model('Product', ProductSchema);
exports.ProdCat = mongoose.model('ProdCat', prodCatSchema);
exports.Orders = mongoose.model('Orders', orderSchema);
