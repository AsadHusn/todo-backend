const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const todoRouter = require("./routes/todos");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo Apis",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

const app = express();

// const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(cors());
app.use(express.json());

app.use("/todo", todoRouter);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running at 5000");
  });
});
