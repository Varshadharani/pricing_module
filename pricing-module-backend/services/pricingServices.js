const PricingConfig = require('../models/PricingConfig');

exports.createPricing = async (data) => {
  const newConfig = new PricingConfig(data);
  return await newConfig.save();
};

exports.getAllConfigs = async () => {
  return await PricingConfig.find();
};

// services/pricingService.js
exports.calculatePrice = async ({ day, distanceKM, duration, waitingTime }) => {
  console.log("🟡 Request Received:", { day, distanceKM, duration, waitingTime });

  const distance = parseFloat(distanceKM);
  const time = parseFloat(duration);
  const waiting = parseFloat(waitingTime);

  if (isNaN(distance) || isNaN(time) || isNaN(waiting)) {
    console.log("❌ Invalid inputs. Distance/Duration/Waiting must be numbers.");
    return NaN;
  }

  // Distance Base Price by Day
  let basePrice = 0;
  if (["Tuesday", "Wednesday", "Thursday"].includes(day)) basePrice = 40;
  else if (["Saturday", "Sunday", "Monday"].includes(day)) basePrice = 50;
  else if (day === "Friday") basePrice = 60;

  // Distance Additional Price
  const distanceCharge = distance * 30;

  // Time Multiplier Factor
  let multiplier = 1;
  if (time > 15 && time <= 30) multiplier = 1.2;
  else if (time > 30) multiplier = 1.5;

  // Waiting Charges (first 3 mins free, ₹5 per 3 mins after)
  const waitingCharge = waiting > 3 ? Math.floor((waiting - 3) / 3) * 5 : 0;

  const fare = (basePrice + distanceCharge) * multiplier + waitingCharge;

  console.log("✅ Final Fare:", fare);
  return fare;
};

