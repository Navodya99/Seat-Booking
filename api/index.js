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
import http from "http";
import { Server } from "socket.io";
import bookingRoutes from './routes/bookingRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
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
app.use('/api/bookings', bookingRoutes);

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

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('seatBooked', (data) => {
    socket.broadcast.emit('seatUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
