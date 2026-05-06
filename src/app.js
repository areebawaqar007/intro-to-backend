// It creates the server and tells it how to handle requests.

import express from "express";

// Create server instance
const app = express();


// EXpress.json is Middleware to convert incoming JSON to JS object
// app.use(...) Tells Express: “Use this middleware for all requests”

app.use(express.json());

// Import user routes
import userRouter from "./routes/user.route.js";

import postRouter from "./routes/post.route.js";
// Connect user routes to base URL
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);



export default app;



// Middleware is a function that runs between request and response
// Middleware can:

// read request
// modify request
// stop request
// pass it forward
// app.use(...)
// Tells Express:

// “Use this middleware for all requests”
// express.json()

// This is a built-in middleware

// What it does:

// Converts incoming JSON data → JavaScript object
// Because:

// Data comes as JSON string
// JS needs object
// .json() converts it

// Connecting routes to your app
// app.use("/api/v1/users", userRouter);
// “Whenever a request starts with /api/v1/users, send it to userRouter”

