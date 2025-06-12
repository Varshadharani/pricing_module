
const pricingService = require('../services/pricingServices');
const PricingConfig = require('../models/PricingConfig');


// Create pricing config
exports.createConfig = async (req, res) => {
  try {
    const config = await pricingService.createPricing(req.body);
    res.status(201).json(config);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all configs
exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await pricingService.getAllConfigs();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Calculate pricing
exports.calculatePrice = async (req, res) => {
  try {
    const result = await pricingService.calculatePrice(req.body);
    
    if (isNaN(result)) {
      return res.status(400).json({ error: "Calculation failed" });
    }

    res.status(200).json({ price: Number(result) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};






