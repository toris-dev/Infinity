const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product, Orders, ProdCategory } = require('../models/index');

const asyncHandler = require('../utils/async-handler');

const router = express.Router();

/* ----------------------상품 API----------------------------- */
//상품 추가 API
router.post(
  '/products',
  asyncHandler(async (req, res) => {
    const {
      prodName,
      prodSubCategory,
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
      prodSubCategory,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    });
    // 상품 추가 후 응답??
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
      prodSubCategory,
      prodCost,
      prodContent,
      prodImgs,
      prodUseYn,
      prodRemains,
      prodSize,
      prodColor,
      prodCount
    } = req.body;

    await Product.findOneAndUpdate(
      { _id: prodObjectId },
      {
        prodName,
        prodSubCategory,
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

    const product = await Product.find({_id: prodObjectId});
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

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 추가된 상품의 주문 상태를 변경합니다.
 * flag :: (처리전: 상품준비/배송준비 등이 아직 완료가 안된 상태 & 처리중: 상품준비 || 배송 준비중 상태)
 */
router.put(
  '/orders',
  asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const { orderState } = req.body;

    const order = await Orders.findOne({ _id: orderNum });
    if (order) {
      if (!order.orderDeleteDate) {
        await Orders.updateOne({ _id: orderNum }, { orderState: orderState });
        const updatedOrder = await Orders.findOne({ _id: orderNum });
        res.json(updatedOrder);
      } else {
        throw new Error(
          '사용자가 주문을 취소했습니다. 주문상태를 수정할 수 없습니다.'
        );
      }
    } else {
      // 주문을 찾을 수 없는 경우 에러 처리
      throw new Error('주문을 찾을 수 없습니다.');
    }
  })
);

/**
 * 작성자 : 이정은
 * 작성 시작일: 2024.02.23
 * 생성된 주문 정보를 관리자가 삭제합니다.
 * flag :: orderDeleteDate에는 관리자가 주문을 삭제하는 현재 시점의 시간값이 들어갑니다.
 */
router.delete(
  '/orders',
  asyncHandler(async (req, res) => {
    const { orderNum } = req.query;
    const order = await Orders.findOne({ _id: orderNum });

    if (order) {
      if (!order.orderDeleteDate) {
        await Orders.updateOne(
          { _id: orderNum },
          { orderDeleteDate: Date.now() + 9 * 60 * 60 * 1000 }
        );
        const deletedOrder = await Orders.findOne({ _id: orderNum });
        res.json({ deletedOrder });
      } else {
        throw new Error('이미 사용자가 취소한 주문입니다.');
      }
    } else {
      throw new Error('주문을 찾을 수 없습니다.');
    }
  })
);

/* ----------------------카테고리 API----------------------------- */
// 카테고리 추가 API
router.post(
  '/category',
  asyncHandler(async (req, res) => {
    const { prodMajorCategory, prodSubCategory } = req.body;
    let prodCategory = await ProdCategory.find({ prodMajorCategory });
    // 대분류가 없는 경우 카테고리 추가
    if (prodCategory.length === 0) {
      prodCategory = await ProdCategory.create({
        prodMajorCategory,
        prodSubCategorys: [{ prodSubCategory }]
      });
      res.json({ prodCategory });
    } else {
      //대분류가 있는 경우 서브카테고리 추가
      let tempProdSubCategory = {
        prodSubCategory: `${prodSubCategory}`
      };

      prodCategory = await ProdCategory.updateOne(
        { prodMajorCategory },
        { $push: { prodSubCategorys: tempProdSubCategory } }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory });
      res.json({ prodCategory });
    }
  })
);

// 카테고리 수정 API
router.put(
  '/category/:prodMajorCategory/:prodSubCategory?',
  asyncHandler(async (req, res) => {
    const prodMajorCategory = Number(req.params.prodMajorCategory);
    const { prodSubCategory } = req.params;
    const { updateProdMajorCategory, updateProdSubCategory } = req.body;
    let prodCategory = await ProdCategory.find({ prodMajorCategory });
    if (prodCategory.length === 0) {
      //지정한 대분류 카테고리가 없는 경우
      throw new Error('카테고리가 없습니다.');
    }
    if (!updateProdMajorCategory && !updateProdSubCategory) {
      throw new Error('수정할 카테고리를 입력해주세요.');
    } else if (prodMajorCategory && !prodSubCategory && updateProdSubCategory) {
      //소분류 업데이트 정보가 있으나 업데이트할 소분류를 지정하지 않은 경우
      throw new Error('업데이트할 소분류가 지정되지 않았습니다.');
    } else if (prodSubCategory && !updateProdMajorCategory && updateProdSubCategory) {
      //소분류만 변경
      await ProdCategory.updateOne(
        { prodMajorCategory, 'prodSubCategorys.prodSubCategory': prodSubCategory },
        { $set: { 'prodSubCategorys.$.prodSubCategory': updateProdSubCategory } }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory });
    } else if (updateProdMajorCategory && !updateProdSubCategory) {
      //대분류만 변경
      await ProdCategory.updateOne(
        { prodMajorCategory },
        { prodMajorCategory: updateProdMajorCategory }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory: updateProdMajorCategory });
    } else {
      //모두 변경
      await ProdCategory.updateOne(
        { prodMajorCategory, 'prodSubCategorys.prodSubCategory': prodSubCategory },
        {
          prodMajorCategory: updateProdMajorCategory,
          $set: { 'prodSubCategorys.$.prodSubCategory': updateProdSubCategory }
        }
      );
      prodCategory = await ProdCategory.find({ prodMajorCategory: updateProdMajorCategory });
    }
    res.json(prodCategory);
  })
);

//카테고리 삭제
router.delete(
  '/category/:prodMajorCategory/:prodSubCategory?',
  asyncHandler(async (req, res) => {
    const prodMajorCategory = Number(req.params.prodMajorCategory);
    const { prodSubCategory } = req.params;
    if (!prodSubCategory) {
      //대분류 삭제
      await ProdCategory.deleteOne({ prodMajorCategory });
    } else {
      //소분류 삭제
      await ProdCategory.updateOne(
        { prodMajorCategory: prodMajorCategory },
        { $pull: { prodSubCategorys: { prodSubCategory: prodSubCategory } } }
      );
    }
    const prodCategory = await ProdCategory.find({});
    res.json(prodCategory);
  })
);

module.exports = router;
