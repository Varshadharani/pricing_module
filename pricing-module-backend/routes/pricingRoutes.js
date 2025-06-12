const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

router.post('/config', pricingController.createConfig);
router.get('/configs', pricingController.getAllConfigs);
router.post('/calculate', pricingController.calculatePrice);

module.exports = router;
