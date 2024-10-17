const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database Connected');
        // Call removeDuplicates function after database connection
        
    })
    .catch((err) => console.log('Database Not Connected', err));

// Middleware
app.use(express.json());


// Routes
app.use('/', require('./routes/contactRoute'));
app.use('/', require('./routes/signRoute'));
app.use('/', require('./routes/fleetRoute'));
app.use('/', require('./routes/dryRoute'));
app.use('/', require('./routes/windowRoute'));
app.use('/', require('./routes/bannerRoute'));
app.use('/', require('./routes/logoRoute'));
app.use('/', require('./routes/decalRoute'));
app.use('/', require('./routes/shirtRoute'));
app.use('/', require('./routes/webRoute'));



// Define port
const port = process.env.PORT || 8000;

// Start server
app.listen(port, '0.0.0.0', () => console.log(`Server is running on port ${port}`));
