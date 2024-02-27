const { Router } = require('express');

const asyncHandler = require('../utils/async-handler');
const { ProdCategory } = require('../models');

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const categories = await ProdCategory.find({});
    res.json(categories);
}));

module.exports = router;