const swaggerAutogen = require("swagger-autogen")();
const doc = {
  openapi: "3.0.0",
  info: {
    version: "", // by default: '1.0.0'
    title: "", // by default: 'REST API'
    description: "", // by default: ''
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/todos.js", "./controllers/todos.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
