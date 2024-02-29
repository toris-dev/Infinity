const express = require('express');
const router = express.Router();
const { Orders } = require('../models');

const asyncHandler = require('../utils/async-handler');
const { NotFoundError, AuthError } = require('../middlewares/error-handler');
const ObjectId = require('mongodb').ObjectId;

/**
 * 작성자: 이정은
 * 작성일: 2024.03.01
 * 주문번호를 통해 해당 주문번호의 정보를 조회해오는 API
 */
router.get('/', asyncHandler(async (req,res)=> {
    const { orderNum } = req.query;
    const orderObjectId = new ObjectId(orderNum);
    const orderInfo = await Orders.findOne({ _id: orderObjectId });
    
    // if (!req.user.roleId) {
    //     //로그인한 본인이 아닌 경우
    //     if (req.user.id !== user.id) {
    //       throw new AuthError();
    //     }
    // }
    if(!orderInfo) {
        throw new NotFoundError('주문정보');
    }
    res.json(orderInfo);
}))

module.exports = router;