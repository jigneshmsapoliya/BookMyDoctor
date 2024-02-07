const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { type: String, required: true, minlength: 6 },
  name: { type: String, required: true },
  phone: { type: Number },
  role: {
    type: String,
    enum: ["patient", "admin"],
    default: "patient",
  },
  gender: { type: String, enum: ["male", "female", "other"] },
  bloodType: { type: String },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password") || user.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }

  next();
});

module.exports = mongoose.model("User", UserSchema);
