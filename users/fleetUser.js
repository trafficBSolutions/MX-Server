const mongoose = require('mongoose');

const fleetUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
      },
      finishing: {
        type: String,
        required: true
      },
    img: { 
        type: String, // Assuming you store the file path or URL if a structure image is provided
        required: true
     },
    message: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    }
});

const FleetUser = mongoose.model('FleetUser', fleetUserSchema);

module.exports = FleetUser;
