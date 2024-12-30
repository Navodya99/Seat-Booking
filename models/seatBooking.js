import mongoose from "mongoose";

const { Schema } = mongoose;

const seatBookingSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UsersModel',
        required: true
    },
    seatNumbers: {
        type: [Number],
        required: true
    },
    routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusRoutesModel',
        required: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'pending'
    }
}, { timestamps: true });

export default mongoose.model('SeatBookingModel', seatBookingSchema);