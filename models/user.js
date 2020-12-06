const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    electricity: Number,
    vehicle_make: String,
    vehicle_model: String,
    vehicle_model_id: String,
    vehicle_emissions: Number,
    footprint: Number,
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);