const express = require('express');
const customer = require('../controllers/customer');

const router = express.Router();

router.get('/customer', customer.getAll);
router.get('/customer/:id', customer.showOne);
router.post('/customer', customer.create);
router.put('/customer/:id', customer.update);
router.delete('/customer/:id', customer.delete);

module.exports = router;
