const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const todoRouter = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", todoRouter);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running at 5000");
  });
});
