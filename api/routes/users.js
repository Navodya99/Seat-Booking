import express from "express";
import {
  DeleteBusUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
} from "../controller/userController.js";
import { verifyUser, verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();


// UPDATE USER
router.put("/:id", verifyUser, UpdateUser);

// DELETE USER
router.delete("/:id", verifyUser, DeleteBusUser);

// GET ALL USER
router.get("/", verifyAdmin, GetAllUsers);

// GET USER
router.get("/:id",verifyUser, GetUser);

export default router;
