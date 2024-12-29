const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Route = require('../models/Route');
const auth = require('../middleware/auth');

// Create a new booking
router.post('/book-seats', auth, async (req, res) => {
    try {
        const { routeId, selectedSeats } = req.body;
        const userId = req.user.id;

        // Check if route exists
        const route = await Route.findById(routeId);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }

        // Check if seats are already booked
        const existingBookings = await Booking.find({
            routeId,
            seatNumbers: { $in: selectedSeats }
        });

        if (existingBookings.length > 0) {
            return res.status(400).json({ message: "Some seats are already booked" });
        }

        // Create new booking
        const newBooking = new Booking({
            userId,
            routeId,
            seatNumbers: selectedSeats,
            status: 'confirmed',
            totalAmount: selectedSeats.length * route.price // Assuming route has a price field
        });

        await newBooking.save();

        // Update route's available seats
        await Route.findByIdAndUpdate(routeId, {
            $push: { bookedSeats: { $each: selectedSeats } }
        });

        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: "Error creating booking" });
    }
});

// Get user's bookings
router.get('/user/:userId', auth, async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId })
            .populate('routeId')
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings" });
    }
});

// Get specific booking details
router.get('/:bookingId', auth, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId)
            .populate('routeId')
            .populate('userId', 'userName email');
        
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error fetching booking details" });
    }
});

module.exports = router;
