import express from "express";
import { getOtherUsers, login, logout, register } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Register route
router.route("/register").post(register);

// Login route
router.route("/login").post(login);

// Logout route (change to POST for better consistency with action-based routes)
router.route("/logout").post(logout); 

// Get other users, only accessible if authenticated
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;
