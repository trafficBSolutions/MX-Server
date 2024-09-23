const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database Connected'))
.catch(() => console.log('Database Not Connected', err))
const app = express();

app.use('/', require('./routes/signRoute'))
app.use('/', require('./routes/fleetRoute'))
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`))