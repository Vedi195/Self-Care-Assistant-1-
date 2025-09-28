// Load environment variables from .env
require('dotenv').config();
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing from .env file");
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// Routes
app.use('/api/contact', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
