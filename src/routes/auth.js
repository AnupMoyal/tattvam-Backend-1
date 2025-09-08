import express from "express";
import {
  registerUser,
  loginUser,
  allUsers,
  updateUser,
  deleteUser
} from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get all users (without passwords)
router.get("/users", allUsers);

// Update user by ID
router.put("/update/:id", updateUser);

// Delete user by ID
router.delete("/delete/:id", deleteUser);

export default router;
