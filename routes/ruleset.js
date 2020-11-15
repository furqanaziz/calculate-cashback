const express = require('express');
const ruleset = require('../controllers/ruleset');

const router = express.Router();

router.get('/ruleset', ruleset.getAll);
router.get('/ruleset/:id', ruleset.showOne);
router.post('/ruleset', ruleset.create);
router.put('/ruleset/:id', ruleset.update);
router.delete('/ruleset/:id', ruleset.delete);

module.exports = router;
