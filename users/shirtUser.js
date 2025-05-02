const mongoose = require('mongoose');
const apparelSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
const apparelUserSchema = new mongoose.Schema({
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
      },      
    apparel: [apparelSchema]
}, { timestamps: true });

const ApparelUser = mongoose.model('ApparelUser', apparelUserSchema);

module.exports = ApparelUser;
