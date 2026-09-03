const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tests: [{
        test: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    bookingType: {
        type: String,
        enum: ["labVisit", "homeVisit"], required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeslot: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        pinCode: String,
        landmark: String,
    },
    totalAmount: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    finalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });
module.exports = mongoose.model("Bookings", bookingSchema);