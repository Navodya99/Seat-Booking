import express from "express";
import { seatBookingController } from "../controller/seatBookingController.js";

const router = express.Router();

//SEAT BOOKIN ROUTE
router.post("/", seatBookingController);

export default router;
