const router = require("express").Router();
const {
  get_todos,
  add_todo,
  update_todo,
  delete_todo,
} = require("../controllers/todos");

router.get("/todos", get_todos);
router.post("/todo", add_todo);
router.put("/todo", update_todo);
router.delete("/todo", delete_todo);

module.exports = router;
