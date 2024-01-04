const express = require("express");
const connectDB = require("#db");
const cors = require("cors");
const todoRouter = require("#routes/todos.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT } = require("#config");

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

app.get("/", (req, res) => res.send("Hello World"));

connectDB().then((db) => {
  const { host, port, name } = db.connection;
  // console.log("DB is connected -", host, port, name);
  console.log(name, "DB is connected -", db.connection._connectionString);
  app.listen(PORT, () => console.log("Server is running on port", PORT));
});
