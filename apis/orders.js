const express = require('express');
const router = express.Router();
const { Orders } = require('../models');
const asyncHandler = require('../utils/async-handler');
const cryptoJS = require('crypto-js');
const ObjectId = require('mongodb').ObjectId;

/**
 * 작성자 : 이고헌
 * 작성시작일 : 2024.02.23
 * 한 아이디가 갖는 주문 목록을 모두 조회해 오는 API, Base64로 저장된 주문자 상세 주소, 주문자 핸드폰 번호를 Decode해서 json으로 전달
 */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { userId } = req.query;
    const orders = await Orders.find({ orderId: userId });

    //어드민 권한이 없거나 요청 유저와 정보 유저가 동일하지 않은 경우
    if (!req.user.roleId) {
      if (req.user.id !== orders.orderId) {
        throw new Error('권한이 없습니다.');
      }
    }

    for (order of orders) {
      order.orderDetailAddress = cryptoJS.enc.Base64.parse(
        order.orderDetailAddress
      ).toString(cryptoJS.enc.Utf8);
      order.orderPhoneNum = cryptoJS.enc.Base64.parse(
        order.orderPhoneNum
      ).toString(cryptoJS.enc.Utf8);
    }
    res.json(orders);
  })
);

/**
 * 작성자: 이정은
 * 작성시작일: 2024.02.22
 * 주문 추가 API
 * 주문이 발생했을 때 해당 주문의 정보를 DB에 저장합니다.
 */
router.post(
  '/',
  asyncHandler(async (req, res) => {
    let {
      orderId,
      orderProds,
      orderAddress,
      orderDetailAddress,
      orderZipCode,
      orderName,
      orderPhoneNum,
      orderReq
    } = req.body;

    let orderDate;
    let orderState;

    let newOrderProds = [];

    for (let orderProd of orderProds) {
      newOrderProds.push({
        prodNum: new ObjectId(orderProd.prodNum),
        // prodNum: orderProd.prodNum,
        orderProdCount: Number(orderProd.orderProdCount)
      });
    }

    await Orders.create({
      //요청된 토큰의 id로 주문 생성
      orderId: req.user.id,
      orderProds: newOrderProds,
      orderDate,
      orderAddress,
      orderDetailAddress,
      orderZipCode,
      orderName,
      orderPhoneNum,
      orderReq,
      orderState
    });

    const orders = await Orders.findOne({ orderId });
    res.json(orders);
  })
);

/**
 * 작성자: 이정은
 * 작성 시작일: 2024.02.23
 * 주문 정보를 수정하는 사용자 API 입니다.
 */
router.put(
  '/',
  asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const {
      orderAddress,
      orderDetailAddress,
      orderZipCode,
      orderName,
      orderPhoneNum,
      orderReq
    } = req.body;

    const order = await Orders.findOne({ _id: orderNum });

    //요청 유저와 정보 유저가 동일하지 않을 경우
    if (req.user.id !== order.orderId) {
      throw new Error('권한이 없습니다.');
    }

    if (order) {
      if (order.orderState === '처리전') {
        // 처리전의 주문만 수정 허용
        await Orders.updateOne(
          { _id: orderNum },
          {
            orderAddress,
            orderDetailAddress,
            orderZipCode,
            orderName,
            orderPhoneNum,
            orderReq,
            orderUpdateDate: Date.now() + 9 * 60 * 60 * 1000
          }
        );
        const updatedOrder = await Orders.findOne({ _id: orderNum });
        res.json(updatedOrder);
      } else {
        throw new Error('주문이 처리중입니다. 주문을 수정할 수 없습니다.');
      }
    } else {
      throw new Error('주문을 찾을 수 없습니다.');
    }
  })
);

/**
 * 작성자: 이정은
 * 작성 시작일: 2024.02.23
 * 주문 정보를 삭제하는 사용자 API 입니다.
 * 주문 삭제시 orders 스키마의 orderDeleteDate필드는 주문 삭제 시점의 현재 날짜를 가지게 됩니다.
 */
router.delete(
  '/',
  asyncHandler(async (req, res, next) => {
    const { orderNum } = req.query;
    const order = await Orders.findOne({ _id: orderNum });

    //요청 유저와 정보 유저가 동일하지 않을 경우
    if (req.user.id !== order.orderId) {
      throw new Error('권한이 없습니다.');
    }

    if (order) {
      if (order.orderState === '처리전') {
        await Orders.updateOne(
          { _id: orderNum },
          { orderDeleteDate: Date.now() + 9 * 60 * 60 * 1000 }
        );
        const deletedOrder = await Orders.findOne({ _id: orderNum });
        res.json({ deletedOrder });
      } else {
        throw new Error('주문을 처리중입니다. 주문을 삭제할 수 없습니다.');
      }
    } else {
      throw new Error('주문을 찾을 수 없습니다.');
    }
  })
);

module.exports = router;
