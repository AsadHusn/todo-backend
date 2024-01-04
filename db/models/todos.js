const mongoose = require("mongoose");

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const todos = {
  title: {
    type: "string",
    required: true,
  },
  completed: {
    type: "boolean",
    required: true,
  },
};

const todosSchema = new mongoose.Schema(todos, {
  timestamps: true,
});

module.exports = mongoose.model("todo", todosSchema);
