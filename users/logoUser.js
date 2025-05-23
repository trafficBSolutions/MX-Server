const mongoose = require('mongoose');
const logoUserSchema = new mongoose.Schema ({
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
        type: String,
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
const LogoUser = mongoose.model('LogoUser', logoUserSchema);
module.exports = LogoUser;
