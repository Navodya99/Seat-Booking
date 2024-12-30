import BusRoutesModel from "../models/busRoutesModel.js";
import SeatBookingModel from "../models/seatBooking.js"; // Import the SeatBooking model

export const seatBookingController = async (req, res) => {
  const { routeId, selectedSeats, userId, status } = req.body;

  try {
    // Find the route by ID
    const route = await BusRoutesModel.findById(routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Update seat status for the route
    const updatedSeatStatus = route.seatStatus.map((status, index) =>
      selectedSeats.includes(index + 1) ? false : status
    );

    route.seatStatus = updatedSeatStatus;
    route.availableSeatsCount -= selectedSeats.length;

    // Save the updated route
    await route.save();

    // Create a new booking
    const newBooking = new SeatBookingModel({
      userId,
      seatNumbers: selectedSeats,
      routeId,
      status: status || "pending",
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Return both route and booking details
    res.status(200).json({
      message: "Seats booked successfully",
      route,
      booking: savedBooking,
    });
  } catch (error) {
    console.error("Error booking seats:", error);
    res.status(500).json({ message: "Error booking seats", error });
  }
};

export const getAllBookings = async (req, res) => {
    try {
      const bookings = await SeatBookingModel.find().populate('userId routeId');
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Error fetching bookings", error });
    }
  };

  export const getBookingById = async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      const booking = await SeatBookingModel.findById(bookingId).populate('userId routeId');
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(200).json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error);
      res.status(500).json({ message: "Error fetching booking", error });
    }
  };

  export const getBookingsByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch the bookings for the given user ID and populate routeId with route details
      const bookings = await SeatBookingModel.find({ userId })
        .populate('routeId', 'routeName busName departureTime arrivalTime startLocation endLocation ticketPrice'); // Specify the fields you want from routeId
  
      if (!bookings || bookings.length === 0) {
        return res.status(200).json({ message: "No bookings found for this user" });
      }
  
      // Send the bookings with populated route details
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ message: "Error fetching user bookings", error });
    }
  };
  

  export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    const updateData = req.body;
  
    try {
      const updatedBooking = await SeatBookingModel.findByIdAndUpdate(
        bookingId,
        updateData,
        { new: true } // Return the updated document
      ).populate('userId routeId');
  
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({ message: "Booking updated successfully", updatedBooking });
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ message: "Error updating booking", error });
    }
  };

  
  export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
  
    try {
      // Find the booking by ID
      const booking = await SeatBookingModel.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      // Find the associated route
      const route = await BusRoutesModel.findById(booking.routeId);
  
      if (!route) {
        return res.status(404).json({ message: "Associated route not found" });
      }
  
      // Revert the seat status for the booked seats
      booking.seatNumbers.forEach((seatNumber) => {
        route.seatStatus[seatNumber - 1] = true; // Mark the seat as available
      });
  
      // Increment the available seat count
      route.availableSeatsCount += booking.seatNumbers.length;
  
      // Save the updated route
      await route.save();
  
      // Delete the booking using findByIdAndDelete
      await SeatBookingModel.findByIdAndDelete(bookingId); // Correct method to delete
  
      res.status(200).json({ message: "Booking deleted and seat status reverted" });
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ message: "Error deleting booking", error });
    }
  };
  
