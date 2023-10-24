const Todos = require("../modal");

exports.get_todos = async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos); // 204 No Content
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.add_todo = async (req, res) => {
  try {
    const todo = await Todos.create(req.body);
    res.status(201).send(todo.id); // 201 created
  } catch (error) {
    res.status(406).send(error.toString()); //406 Not Acceptable
  }
};

exports.update_todo = async (req, res) => {
  try {
    const todo = await Todos.findByIdAndUpdate(req.body.id, req.body, {
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
    const todo = await Todos.findByIdAndDelete(req.body.id);
    if (!todo) return res.sendStatus(404);
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
