const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, // Unique identifier
        required: true
      },
      firstName: {
        type: String,
        required: true 
      },
      lastName: {
        type: String,
        required: true
      },
      specialization: {
        type: String,
        required: true
      },
      hospitalAffiliation: {
        type: String 
      },
      experience: {
        type: Number, 
        required: true 
      },
      education: {
        type: [String], 
        required: true 
      },
      insuranceAccepted: {
        type: [String], 
        required: true 
      },
      rating: {
        type: Number, 
        min: 1, 
        max: 5 
      },
      reviews: {
        type: [{
          id: String, 
          rating: Number, 
          feedback: String 
        }],
        default: [] 
      },
      location: {
        type: {
          address: String, 
          city: String, 
          state: String, 
          country: String 
        },
        required: true 
      }
});

module.exports = mongoose.model('Doctor', doctorSchema);