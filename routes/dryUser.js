const mongoose = require('mongoose');

const dryUserSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true
    },
    last: {
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

    address: {
        type: String,
        required: true
    },

    city: { 
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },
    zip: { 
        type: String,
        required: true
     },
    vinylSize: {
        type: String,
        required: true
      },
    placement: {
        required: true,
        type: String
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
    }
});

const DryUser = mongoose.model('DryUser', dryUserSchema);

module.exports = DryUser;