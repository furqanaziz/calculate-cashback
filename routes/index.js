const express = require('express');

const router = express.Router();

/* GET home page/API */
router.use(require('./main'));

/* Customer Router */
router.use('/api', require('./customer'));

/* Ruleset Router */
router.use('/api', require('./ruleset'));

/* Transaction Router */
router.use('/api', require('./transaction'));

/* Cashback Router */
router.use('/api', require('./cashback'));

module.exports = router;
