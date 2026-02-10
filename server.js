const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');

const app = express();

// ✅ Security Middleware

// Sets secure HTTP headers
app.use(helmet());

// Prevents XSS attacks
app.use(xss());

// Rate limiting to avoid abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, 
  legacyHeaders: false,
});
app.use(limiter);

// Compress responses (performance)
app.use(compression());

// ✅ Global Middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(cors({
  credentials: true,
  origin: ['https://www.material-worx.com'] // Replace with production frontend
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Failed:', err));

// ✅ Routes
app.use('/', require('./routes/contactRoute'));
app.use('/', require('./routes/jobApplicationRoute'));
app.use('/', require('./routes/signRoute'));
app.use('/', require('./routes/fleetRoute'));
app.use('/', require('./routes/dryRoute'));
app.use('/', require('./routes/windowRoute'));
app.use('/', require('./routes/bannerRoute'));
app.use('/', require('./routes/logoRoute'));
app.use('/', require('./routes/decalRoute'));
app.use('/', require('./routes/shirtRoute'));
app.use('/', require('./routes/webRoute'));

// E-commerce Routes
app.use('/', require('./routes/productRoute'));
app.use('/', require('./routes/orderRoute'));
app.use('/', require('./routes/paymentRoute'));

// ✅ Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
