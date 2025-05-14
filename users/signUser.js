const mongoose = require('mongoose');

// Subschema for individual sign details
const signSchema = new mongoose.Schema({
    signType: { type: String, required: true }, // E.g., ACM, Corrugated Plastic, etc.
    signSize: { type: String }, // E.g., 12"x18", or custom sizes for ACM, Acrylic, etc.
    signSides: { type: String }, // E.g., Single-Sided, Double-Sided
    finishing: { type: String, required: true }, // E.g., Matte, Gloss, Reflective, etc.
    thickness: { type: String }, // E.g., 1/8", 1/4", applicable to ACM, Acrylic, etc.
    acmColor: { type: String }, // E.g., White, Black (applicable to ACM)
    acrylicColor: { type: String }, // E.g., Red, Blue (applicable to Colored Acrylic)
    quantity: { type: Number, required: true }, // Quantity of this specific sign
}, { _id: false });

// Main schema for user's submission
const signUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    img: { type: String, required: true }, // Logo image path or URL
    terms: { type: Boolean, required: true }, // Terms and conditions acceptance
    message: { type: String, required: true }, // Additional message from the user
    sign: [signSchema], // Array of sign objects
}, { timestamps: true });

const SignUser = mongoose.model('SignUser', signUserSchema);

module.exports = SignUser;
