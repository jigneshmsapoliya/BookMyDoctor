const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    date: {
        type: String, // Changed to String type
        required: true
    },
    startTime: {
        type: String, 
        required: true
    },
    duration: {
        type: Number, 
        default: 30 
    },
    isBooked: {
        type: Boolean,
        default: false
    }
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
