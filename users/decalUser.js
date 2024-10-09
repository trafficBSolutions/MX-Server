const mongoose = require('mongoose');
const decalSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    cut: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const decalUserSchema = new mongoose.Schema({
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
    img: { 
        type: String, // Assuming you store the file path or URL if a structure image is provided
        required: true
     },
    message: {
        type: String,
        required: true
    },
    decal: [decalSchema]
}, { timestamps: true });

const DecalUser = mongoose.model('DecalUser', decalUserSchema);

module.exports = DecalUser;