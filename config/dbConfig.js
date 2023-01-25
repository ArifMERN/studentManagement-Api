const mongoose = require("mongoose");
// DB configuration and setup
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("connected DB");
    })
    .catch((e) => {
      console.log(e);
    });
};
module.exports = connectDB;
