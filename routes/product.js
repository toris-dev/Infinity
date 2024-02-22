const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product } = require('../models/index');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

// 상품 단일 검색 API
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { prodNum } = req.query;
    const prodObjectId = new ObjectId(prodNum);
    const product = await Product.findOne({ _id: prodObjectId });
    if (!product) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    res.json(product);
  }),
);

//admin router 이동 필요, 상품 생성 API
router.post(
  '/',
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
      prodCount,
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
      prodCount,
    });
    res.send(product);
  }),
);

module.exports = router;
