const Todo = require("../models/todo");

exports.get_todos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos); // 204 No Content
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.add_todo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).send(todo.id); // 201 created
  } catch (error) {
    res.status(406).send(error.toString()); //406 Not Acceptable
  }
};

exports.update_todo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  } catch (error) {
    res.status(406).send(error.toString()); //406 Not Acceptable
  }
};

exports.delete_todo = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
