const express = require('express');
const cashback = require('../controllers/cashback');

const router = express.Router();

router.get('/cashback', cashback.getAllCashbacks);

module.exports = router;
