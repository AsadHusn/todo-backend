const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const {
  get_todos,
  add_todo,
  update_todo,
  delete_todo,
} = require("./controllers/todos");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/todos", get_todos);
app.post("/todo", add_todo);
app.put("/todo", update_todo);
app.delete("/todo", delete_todo);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log("Server is running at 5000");
  });
});
