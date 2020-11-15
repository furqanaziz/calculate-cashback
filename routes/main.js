const express = require('express');

const router = express.Router();

/* GET home page */
router.get('/', (req, res /* , next */) => {
  res.render('index', { title: 'Calculate Cashback' });
});

/* GET base API */
router.get('/api', (req, res /* , next */) => {
  res.send({ status: 'Calculate Cashback is running' });
});

module.exports = router;
