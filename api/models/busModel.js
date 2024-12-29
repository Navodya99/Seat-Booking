import mongoose from "mongoose";

const { Schema } = mongoose;

const BusSchema = new Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    busRegNo: {
      type: String,
      required: true,
      unique: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    seats: {
      type: [Boolean], // Array of booleans for seat availability
      default: Array(33).fill(true), // Initialize with 33 seats, all available (true)
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusModel", BusSchema);
