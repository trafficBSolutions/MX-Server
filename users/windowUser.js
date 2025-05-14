const mongoose = require('mongoose');

const windowUserSchema = new mongoose.Schema({
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
    windowSize: {
        type: String,
        required: true
    },
    tint: {
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
    const WindowUser = mongoose.model('WindowUser', windowUserSchema);
    module.exports = WindowUser;
