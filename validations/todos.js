const { body, param, validationResult } = require("express-validator");

const checkValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.array());
  }
  next();
};

const addTodo = [
  body("title")
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title should be a string value."),
  body("completed")
    .notEmpty()
    .withMessage("Completed is required.")
    .isBoolean()
    .withMessage("Completed should be a boolean value."),
  checkValidation,
];

const deleteTodo = [
  param("id").isMongoId().withMessage("Id is not a valid mongoId"),
  checkValidation,
];

const updateTodo = [
  param("id").optional().isMongoId().withMessage("Id is not a valid mongoId"),
  body("id").notEmpty().isMongoId().withMessage("Id is not a valid mongoId"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required.")
    .isString()
    .withMessage("Title should be a string value."),
  body("completed")
    .optional()
    .notEmpty()
    .withMessage("Completed is required.")
    .isBoolean()
    .withMessage("Completed should be a boolean value."),
  checkValidation,
];

module.exports = {
  addTodo,
  deleteTodo,
  updateTodo,
};
