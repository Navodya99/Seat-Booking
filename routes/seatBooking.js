import express from "express";
import {
    deleteBooking,
    getAllBookings,
    getBookingById,
    getBookingsByUserId,
    seatBookingController,
    updateBooking,
} from "../controller/seatBookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", seatBookingController);

// Get all bookings
router.get("/", getAllBookings);

// Get a booking by ID
router.get("/:bookingId", getBookingById);

// Get bookings by User ID
router.get("/user/:userId", getBookingsByUserId);

// Update a booking by ID
router.put("/:bookingId", updateBooking);

// Delete a booking by ID (and revert seat status)
router.delete("/:bookingId", deleteBooking);

export default router;
