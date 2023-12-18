const Todo = require("../db/todoOperations");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.get_todos();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.addTodo = async (req, res) => {
  try {
    const todo = await Todo.add_todo(req.body);
    res.status(201).send(todo.id);
  } catch (error) {
    res.status(406).send(error.toString()); //406 Not Acceptable
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const todo = await Todo.update_todo(id, req.body, {
      new: true,
    });
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  } catch (error) {
    res.status(406).send(error.toString()); //406 Not Acceptable
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const todo = await Todo.delete_todo(id);
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
