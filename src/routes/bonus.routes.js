
const express = require('express');
const router = express.Router();
const bonusController = require('../controllers/bonus.controller');

router.post('/create-bonus', bonusController.createBonus);
router.post('/add-bonus', bonusController.addBonus);

module.exports = router;