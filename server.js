const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS globally if needed

const app = express();

// Global Middleware
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// Optionally, set up CORS globally if multiple routes need it
app.use(cors({
    credentials: true,
    origin: 'https://www.materialworx.com' // Adjust as needed
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('Database Not Connected', err)); // Fixed error handling

// Routes
app.use('/', require('./routes/contactRoute'));
app.use('/', require('./routes/signRoute'));
app.use('/', require('./routes/fleetRoute'));
app.use('/', require('./routes/dryRoute'));
app.use('/', require('./routes/windowRoute'));

// Start Server
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
