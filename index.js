const express = require('express');
const mongoose = require('mongoose');
const dotenv=require("dotenv")
const authRoutes = require('./router/user');

dotenv.config()
const app = express();
const PORT =process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});