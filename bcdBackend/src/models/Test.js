const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    preparation: {
        type: String
    },
    reportTime: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    timestamps: true
});
module.exports = mongoose.model("Test", testSchema);