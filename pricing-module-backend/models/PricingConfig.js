const mongoose = require('mongoose');

const PricingConfigSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  distanceBasePrice: {
    type: new mongoose.Schema({
      amount: Number,
      uptoKM: Number
    }, { _id: false })
  },
  distanceAdditionalPrice: {
    type: new mongoose.Schema({
      perKM: Number
    }, { _id: false })
  },
  timeMultiplierFactor: [
    {
      duration: Number,
      multiplier: Number
    }
  ],
  waitingCharges: {
    type: new mongoose.Schema({
      perMin: Number,
      freeMins: Number
    }, { _id: false })
  },
  active: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('PricingConfig', PricingConfigSchema);
