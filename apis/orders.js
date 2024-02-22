const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const hashedValue = require('../utils/hashed-values');
const asyncHandler = require('../utils/async-handler');

/**
 * 작성자 : 이정은
 * 작성시작일 : 2024.02.22
 * 주문 조회 API
 */
router.get('/',asyncHandler(async (req, res) => {
    const { orderId } = req.query;
    const orders = await Orders.findOne({ orderId: orderId });
    res.json(orders);
}));

/**
 * 작성자: 이정은
 * 작성시작일: 2024.02.22
 * 주문 추가 API
 * 주문이 발생했을 때 해당 주문의 정보를 DB에 저장합니다.
 */
router.post('/', asyncHandler(async (req, res) => {
    const { orderId, orderAddress, orderDetailAddress, orderZipCode, orderName, orderPhoneNum, orderReq } = req.body;
  
    let orderDate;
    hashedDA = hashedValue(orderDetailAddress);
    hashedPN = hashedValue(orderPhoneNum);

    await Orders.create({ orderId, orderDate, orderAddress, orderDetailAddress:hashedDA, orderZipCode, orderName, orderPhoneNum:hashedPN, orderReq});
    const orders = await Orders.findOne({ orderId });
    res.json(orders);
}));

module.exports = router;