// app.js

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

// Connect to the database (assuming this is in './db.js')
require("./db");
app.use(bodyParser.json()); // Use body-parser for JSON request bodies

//cors
app.use(
  cors({
    origin: "*",
    // methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    // allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Import your router
const generateStoryRouter = require("./routes/generatestory");
const getstoryRouter = require("./routes/getstory");
const upvoteRouter = require("./routes/upvote");

// Middlewares
app.use("/api/generatestory", generateStoryRouter);
app.use("/api/getstory", getstoryRouter);
app.use("/api/upvote", upvoteRouter);

// Define a default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
