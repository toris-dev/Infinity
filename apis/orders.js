const express = require('express');
const router = express.Router();
const { Orders, Product } = require('../models');

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
    for (orderProd of orderProds) {
        orderProdCount = Number(orderProd.orderProdCount)
    };
    /**
     * orderDetailAddress, orderPhoneNum 필드 관련 특이사항
     * 핸드폰 번호, 상세주소 등의 정보는 개인정보에 해당하므로 암호화된 데이터로 삽입하는것이 권장됩니다.
     * 하지만 아직 어떤 암복호화 체계를 채택할 지 결정하지 못했기 때문에, 상세주소와 핸드폰 번호는 일단 평문으로 저장하겠습니다.
     */
    
    await Orders.create({
      orderId,
      orderProds,
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
  '/orders',
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
  '/orders',
  asyncHandler(async (req, res, next) => {
    const { orderNum } = req.query;
    const order = await Orders.findOne({ _id: orderNum });

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
