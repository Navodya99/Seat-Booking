
import express from "express";
import Driver from "../models/driverModel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, async (req, res, next) => {
  try {
    const newDriver = new Driver(req.body);
    const savedDriver = await newDriver.save();
    res.status(201).json(savedDriver);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", verifyAdmin, async (req, res, next) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDriver);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", verifyAdmin, async (req, res, next) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.status(200).json("Driver has been deleted.");
  } catch (err) {
    next(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (err) {
    next(err);
  }
});

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (err) {
    next(err);
  }
});

export default router;
