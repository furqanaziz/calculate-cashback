const express = require('express');
const transaction = require('../controllers/transaction');

const router = express.Router();

router.get('/transaction', transaction.getAll);
router.get('/transaction/:id', transaction.showOne);
router.post('/transaction', transaction.create);
router.put('/transaction/:id', transaction.update);
router.delete('/transaction/:id', transaction.delete);

module.exports = router;
