require("dotenv").config(); // to use process something
// dependencies
const express = require("express");
const mongoose = require("mongoose");

// Routes folder
const questionRoutes = require("./routes/questions");
const surveyRoutes = require("./routes/surveys");
const userRoutes = require("./routes/users");

const app = express();
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Connect with database
const DB = process.env.DB_URI || "mongodb://127.0.0.1:27017/isi-survey";
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log("----------------------------------");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/surveys", surveyRoutes);
app.use("/user", userRoutes);

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connectiom Error :(")
);
mongoose.connection.once("open", function () {
  console.log("----------------------------------");
  console.log("Database Connected Successfully ✔");
  console.log("----------------------------------");
});

app.listen(process.env.PORT, () => {
  console.log("----------------------------------");
  console.log(`Server Listeing on PORT ${process.env.PORT}`);
});
