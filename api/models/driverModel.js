import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  licenseNo: {
    type: String,
    required: true,
    unique: true
  },
  mobileNo: {
    type: String,
    required: true
    
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

export default mongoose.model("Driver", DriverSchema);
