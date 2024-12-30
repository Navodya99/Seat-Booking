import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import busRoutes from "./routes/busRouts.js";
import usersRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import bus from "./routes/bus.js";
import seatBooking from "./routes/seatBooking.js"
import driver from "./routes/driver.js";
import cors from "cors";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODBURL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// MIDDLEWARE
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/busRoutes", busRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/bus", bus);
app.use("/api/book-seats", seatBooking);
app.use("/api/drivers", driver);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
