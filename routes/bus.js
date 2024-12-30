import express from "express";
import { verifyUser } from "../utils/verifyToken.js";
import {
  DeleteBus,
  GetAllUBus,
  GetBus,
  UpdateBus,
} from "../controller/busController.js";

const router = express.Router();

// UPDATE BUS
router.put("/:id", verifyUser, UpdateBus);

// DELETE BUS
router.delete("/:id", verifyUser, DeleteBus);

// GET ALL BUS
router.get("/", GetAllUBus);

// GET BUS
router.get("/:id", GetBus);

export default router;
