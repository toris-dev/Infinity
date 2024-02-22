const express = require('express');
const asyncHandler = require('../utils/async-handler');
const router = express.Router();

//상품 추가 API
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
