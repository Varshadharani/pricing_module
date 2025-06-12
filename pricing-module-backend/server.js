const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const pricingRoutes = require('./routes/pricingRoutes');
const errorHandler = require('./middlewares/errorHandler'); // 🔸 This is fine here
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', pricingRoutes);

// Root
app.get('/', (req, res) => {
  res.send('Pricing Module API');
});

// Error handler (this should be after routes)
app.use(errorHandler); // ✅ now app is already defined

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
