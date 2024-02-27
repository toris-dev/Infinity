const express = require('express');
const router = express.Router();

const usersRouter = require('../apis/users');
const adminRouter = require('../apis/admin');
const authRouter = require('../apis/auth');
const productRouter = require('../apis/product');
const orderRouter = require('../apis/orders');
const categoryRouter = require('../apis/category');
const isAdmin = require('../middlewares/isAdmin');
const getUserFromJWT = require('../middlewares/get-user-from-jwt');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/orders', getUserFromJWT, orderRouter);
router.use('/category', categoryRouter);

module.exports = router;
