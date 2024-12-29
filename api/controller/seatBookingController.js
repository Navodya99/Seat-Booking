import BusRoutesModel from "../models/busRoutesModel.js"

export const seatBookingController = async (req, res) => {
    const { routeId, selectedSeats } = req.body;
  
    try {
      const route = await BusRoutesModel.findById(routeId);
  
      if (!route) {
        return res.status(404).json({ message: "Route not found" });
      }
  
      const updatedSeatStatus = route.seatStatus.map((status, index) =>
        selectedSeats.includes(index + 1) ? false : status
      );
  
      route.seatStatus = updatedSeatStatus;
      route.availableSeatsCount -= selectedSeats.length;
  
      await route.save();
  
      res.status(200).json({ message: "Seats booked successfully", route });
    } catch (error) {
      res.status(500).json({ message: "Error booking seats", error });
    }
  };