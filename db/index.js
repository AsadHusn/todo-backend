const mongoose = require("mongoose");

module.exports = async function connectDB() {
  // throw new Error("new Error");
  return await mongoose.connect("mongodb://localhost:27017");
};
