const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product, Orders, ProdCat } = require('../models/index');

const asyncHandler = require('../utils/async-handler');

const router = express.Router();

/* ----------------------상품 API----------------------------- */
//상품 추가 API
router.post(
  '/products',
  asyncHandler(async (req, res) => {
    const {
      prodName,
      prodSubCat,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    } = req.body;
    const product = await Product.create({
      prodName,
      prodSubCat,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    });
    res.send(product);
  })
);

//상품 수정
router.put(
  '/products',
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const {
      prodName,
      prodSubCat,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: prodObjectId },
      {
        prodName,
        prodSubCat,
        prodCost,
        prodContent,
        prodImgs,
        prodUseYn,
        prodRemains,
        prodSize,
        prodColor,
        prodCount
      }
    );

    res.json({ product });
  })
);

//상품 삭제 -> 상품 삭제일 등록
router.delete(
  '/products',
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const product = await Product.findOneAndUpdate(
      { _id: prodObjectId },
      { prodUseYn: Date.now() + 9 * 60 * 60 * 1000 }
    );
    const { prodUseYn } = product;
    res.json({ prodUseYn });
  })
);
/* ----------------------주문 API----------------------------- */

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 생성된 모든 주문 정보를 조회해오는 API입니다.
 */
router.get(
  '/orders',
  asyncHandler(async (req, res) => {
    const orders = await Orders.find({});
    if (!orders) {
      throw new Error('주문이 없습니다.');
    }
    res.json(orders);
  })
);
router.get('/orders', asyncHandler(async (req, res) => {
  const orders = await Orders.find({});
  if (!orders) {
    throw new Error('주문이 없습니다.');
  }
  res.json(orders);
}));

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 추가된 상품의 주문 상태를 변경합니다.
 * flag :: (처리전: 상품준비/배송준비 등이 아직 완료가 안된 상태 & 처리중: 상품준비 || 배송 준비중 상태)
 */
router.put('/orders', asyncHandler(async (req, res) => {
  const { orderNum } = req.query;
  const { orderState } = req.body;

  const order = await Orders.findOne({ _id: orderNum });
  if (order) {
    if(!order.orderDeleteDate) {
      await Orders.updateOne({ _id: orderNum }, { orderState: orderState });
      const updatedOrder = await Orders.findOne({ _id: orderNum });
      res.json(updatedOrder);
    } else {
      throw new Error('사용자가 주문을 취소했습니다. 주문상태를 수정할 수 없습니다.');
    }
  } else {
    // 주문을 찾을 수 없는 경우 에러 처리
    throw new Error('주문을 찾을 수 없습니다.');
  }
}));

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 생성된 주문 정보를 관리자가 삭제합니다. 
 * flag :: orderDeleteDate에는 관리자가 주문을 삭제하는 현재 시점의 시간값이 들어갑니다.
 */
router.delete('/orders', asyncHandler(async (req,res) => {
  const { orderNum } = req.query;
    const order = await Orders.findOne({ _id: orderNum });

    if(order) {
        if(!order.orderDeleteDate) {
            await Orders.updateOne({ _id: orderNum }, { orderDeleteDate: Date.now()+ 9*60*60*1000 });
            const deletedOrder = await Orders.findOne({ _id : orderNum });
            res.json({ deletedOrder });
        } else {
            throw new Error('이미 사용자가 취소한 주문입니다.');
        }
    } else {
        throw new Error('주문을 찾을 수 없습니다.');
    }
}));

/* ----------------------카테고리 API----------------------------- */
// 카테고리 추가 API
router.post(
  '/category',
  asyncHandler(async (req, res) => {
    const { prodMajorCat, prodSubCat } = req.body;
    let prodCat = await ProdCat.find({ prodMajorCat });
    // 대분류가 없는 경우 카테고리 추가
    if (prodCat.length === 0) {
      prodCat = await ProdCat.create({
        prodMajorCat,
        prodSubCats: [{ prodSubCat }]
      });
      res.json({ prodCat });
    } else {
      //대분류가 있는 경우 서브카테고리 추가
      let prodSubCat2 = {
        prodSubCat: `${prodSubCat}`
      };

      prodCat = await ProdCat.updateOne(
        { prodMajorCat },
        { $push: { prodSubCats: prodSubCat2 } }
      );
      prodCat = await ProdCat.find({ prodMajorCat });
      res.json({ prodCat });
    }
  })
);

// 카테고리 수정 API
router.put('/category/:prodMajorCat/:prodSubCat?', asyncHandler(async (req, res) => {
  const prodMajorCat = Number(req.params.prodMajorCat);
  const {prodSubCat} = req.params;
  const { updateProdMajorCat, updateProdSubCat } = req.body;
  let prodCat = await ProdCat.find({ prodMajorCat });
  if (prodCat.length === 0) {
    throw new Error('카테고리가 없습니다.')
  }
  if (!updateProdMajorCat && !updateProdSubCat) {
    throw new Error('수정할 카테고리를 입력해주세요.')
  } else if (prodSubCat && !updateProdMajorCat && updateProdSubCat ) {
     //소분류만 변경
    await ProdCat.updateOne(
      { prodMajorCat, "prodSubCats.prodSubCat": prodSubCat},
      { $set: { "prodSubCats.$.prodSubCat": updateProdSubCat } }
    );
    
  } else if (updateProdMajorCat && !updateProdSubCat) {
    //대분류만 변경
    await ProdCat.updateOne({prodMajorCat}, {prodMajorCat: updateProdMajorCat});


  } else {
    //모두 변경
    await ProdCat.updateOne(
      { prodMajorCat, "prodSubCats.prodSubCat": prodSubCat},
      { prodMajorCat: updateProdMajorCat, $set: { "prodSubCats.$.prodSubCat": updateProdSubCat } }
    );


  }
  /**
   * 수정이 완료 된 후 수정된 카테고리 응답
   * !!파라미터에 소분류가 없을 경우!! 비동기가 안맞아 빈 배열이 리턴됨
   * 기능상으로는 동작
   * 수정 필요
   */
  await res.json(await ProdCat.find({prodMajorCat}));
}))
module.exports = router;
