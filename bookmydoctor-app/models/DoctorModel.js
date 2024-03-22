const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
      location: {
        type: {
          address: String, 
          city: String, 
          state: String, 
          country: String 
        },
        required: true 
      },
      imgUrl : {
        type : String,
      },
      
      servicesOffered: [String],
    officeHours: {
        hours: String,
        parking: String
    },
    aboutMe: {
      type :String 
    }


});

module.exports = mongoose.model('Doctor', doctorSchema);