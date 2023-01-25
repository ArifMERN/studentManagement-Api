// importing dependencies...
require("dotenv").config({ path: "config/config.env" });
const express = require("express");
const routes = require("./routes/routerIndex");
const connectDB = require("./config/dbConfig");
const cors = require("cors");

// app
const app = express();
const port = process.env.PORT || 3500;

// middlewares
app.use(express.json());
app.use(cors());

// routes..

app.use("/emp", routes.AuthRoutes);
app.use("/student", routes.StudentRoutes);
app.use("/interview", routes.InterviewRoutes);

// connect DB
connectDB();

// app listener
app.listen(port, () => {
  console.log(`app is live on ${port}`);
});
