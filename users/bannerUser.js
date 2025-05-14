const mongoose = require('mongoose');
const bannerUserSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
    bannerSize: {
        type: String,
        required: true
    },
    hang: {
        type: String,
        required: true
    },
    finishing: {
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
})
const BannerUser = mongoose.model('BannerUser', bannerUserSchema);
module.exports = BannerUser;
