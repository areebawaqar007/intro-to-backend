import { Router } from "express";
// Import controller function
import { loginUser, registerUser,logoutUser } from "../controllers/user.controller.js";
// Creates a mini version of Express app
// Used only for handling routes
const router = Router();
// Define route for registering user
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;

// A route is a path + method that defines how your server responds to a request.

// This file defines a user registration API route using Express Router.

// Router() creates a modular router instance.
// registerUser is imported from the controller and contains the logic for user registration.
// router.route('/register').post(registerUser);

// This means:

// When a POST request is sent to /register
// The registerUser function runs
// Summary:
// Route (/register) → URL endpoint
// POST → sends data (user signup)
// Controller (registerUser) → handles logic (validation, saving user, response)

// The router is exported to be used in the main server file.