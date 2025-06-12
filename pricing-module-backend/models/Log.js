const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  configId: mongoose.Schema.Types.ObjectId,
  actor: String,
  action: String, // 'created', 'updated', 'deleted'
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
