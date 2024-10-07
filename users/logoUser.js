const mongoose = require('mongoose');
const logoUserSchema = new mongoose.Schema ({
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
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
const LogoUser = mongoose.model('LogoUser', logoUserSchema);
module.exports = LogoUser;