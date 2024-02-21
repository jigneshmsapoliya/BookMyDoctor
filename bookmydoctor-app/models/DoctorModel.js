const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Schema.Types.ObjectId, // Unique identifier
        required: true
      },
      firstName: {
        type: String,
        required: true // Both first and last name required
      },
      lastName: {
        type: String,
        required: true
      },
      specialization: {
        type: String,
        required: true // Specialization is required
      },
      hospitalAffiliation: {
        type: String // Optional, string for hospital name
      },
      experience: {
        type: Number, // Number of years of experience
        required: true // Experience is required
      },
      education: {
        type: [String], // Array of strings for degrees and certifications
        required: true // At least one education entry is required
      },
      insuranceAccepted: {
        type: [String], // Array of strings for accepted insurance companies
        required: true // At least one insurance accepted is required
      },
      rating: {
        type: Number, // Average rating on a scale (e.g., 1-5)
        min: 1, // Minimum rating allowed
        max: 5 // Maximum rating allowed
      },
      reviews: {
        type: [{
          id: String, // Optional, unique identifier for each review
          rating: Number, // Rating for the review (1-5)
          feedback: String // Textual feedback for the review
        }],
        default: [] // Initialize with an empty array
      },
      location: {
        type: {
          address: String, // String for address
          city: String, // String for city
          state: String, // String for state
          country: String // String for country
        },
        required: true // Location information is required
      }
});

module.exports = mongoose.model('Doctor', doctorSchema);

