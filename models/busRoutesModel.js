import mongoose from "mongoose";

const { Schema } = mongoose;

const BusRoutesSchema = new Schema({
  routeName: {
    type: String,
    required: true,
  },
  busName: {
    type: String,
    required: true,
  },
  departureTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  availableSeatsCount: {
    type: Number,
    required: true,
    min: 0,
    max: 33, 
  },
});

export default mongoose.model("BusRoutesModel", BusRoutesSchema);
