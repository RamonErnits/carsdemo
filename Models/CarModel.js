const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CarSchema = new Schema({
    brand: { 
        type: String, 
        required: "Car brand is required" 
    },
    model: {
        type: String,
        required: "Car model is required"
    },
    year: {
        type: Number,
        required: "Car year is required"
    }
});

module.exports = mongoose.model('cars', CarSchema);
