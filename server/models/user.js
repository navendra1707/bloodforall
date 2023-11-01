import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"], // Specifies the type as "Point"
      required: true,
    },
    coordinates: {
      type: [Number], // Array of [longitude, latitude]
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hasAids: {
    type: Boolean,
    required: true,
  },
  hasChildBirth: {
    type: Boolean,
    required: true,
  },
  hasTattoo: {
    type: Boolean,
    required: true,
  },
  infection: {
    type: String,
  },
  lastDonated: {
    type: String
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});
UserSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", UserSchema);

export default User;