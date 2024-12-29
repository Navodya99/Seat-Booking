import express from "express";
import {
  CreateBusRouteController,
  DeleteBusRouteController,
  GetAllBusRouteController,
  GetBusRouteController,
  UpdateBusRouteController,
} from "../controller/busRoutesController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE BUS ROUTE
router.post("/", verifyAdmin, CreateBusRouteController);

// UPDATE BUS ROUTE
router.put("/:id", verifyAdmin, UpdateBusRouteController);

// DELETE BUS ROUTE
router.delete("/:id", verifyAdmin, DeleteBusRouteController);

// GET ALL BUS ROUTE
router.get("/", GetAllBusRouteController);

// GET BUS ROUTE
router.get("/:id", GetBusRouteController);

export default router;
