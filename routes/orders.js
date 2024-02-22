const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const hashPassword = require('../utils/hash-password');
const asyncHandler = require('../utils/async-handler');



/**
 * 작성자 : 이정은
 * 작성시작일 : 2024.02.22
 * 주문 조회 API
 */
router.get('/',asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const product = await Orders.findOne({ orderNum: orderNum });
    res.json(product);
}));
  
module.exports = router;