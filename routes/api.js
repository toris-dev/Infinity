const express = require('express');
const router = express.Router();

const loginRouter = require('../apis/login');
const usersRouter = require('../apis/users');
const adminRouter = require('../apis/admin');
const authRouter = require('../apis/auth');
const productRouter = require('../apis/product');
const orderRouter = require('../apis/orders');

router.use('/auth', authRouter);
router.use('/login', loginRouter);
router.use('/users', usersRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);
router.use('/orders', orderRouter);

module.exports = router;