const Todo = require("../models/todo");

exports.get_todos = async () => await Todo.find();

exports.add_todo = async (todo) => await Todo.create(todo);

exports.delete_todo = async (id) => await Todo.findByIdAndDelete(id);

exports.update_todo = async (id, todo) =>
  await Todo.findByIdAndUpdate(id, todo);
