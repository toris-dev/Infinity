const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const { Product } = require('../models/index');

const asyncHandler = require('../utils/async-handler');

const router = express.Router();

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

//상품 삭제 -> 상품 삭제일 등록
router.delete('/products', asyncHandler( async (req, res) => {
  const { prodNum } = req.query;
  const prodObjectId = new ObjectId(prodNum);
  await Product.updateOne({ prodObjectId }, { prodUseYn: Date.now });
  res.json({'messasge': 'success'});
}));

module.exports = router;
