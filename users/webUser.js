const mongoose = require('mongoose');
const webUserSchema = new mongoose.Schema({
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
    domain: {
        type: String,
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
const WebUser = mongoose.model('WebUser', webUserSchema);
module.exports = WebUser;
