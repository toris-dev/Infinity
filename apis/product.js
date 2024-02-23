const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product } = require('../models/index');
const asyncHandler = require('../utils/async-handler');

const router = express.Router();

// 상품 단일 조회 API
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
  })
);

//상품 목록 조회 API
router.get(
  '/list',
  asyncHandler(async (req, res) => {
    const product = await Product.find({});
    if (!product) {
      throw new Error('상품을 찾을 수 없습니다.');
    }
    res.json(product);
  })
);

module.exports = router;
