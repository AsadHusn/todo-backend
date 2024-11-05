const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");

const checkValidation = (req, res, next) => {
  const result = validationResult(req, { strictParams: ["body"] });
  if (!result.isEmpty()) return res.status(404).json(result.array());
// this is to trim any extra fields in the body or params and allow only the matched data
  req.body = matchedData(req, {
    locations: ["body"],
  });
  req.params = matchedData(req, {
    locations: ["params"],
  });
  next();
};

const AddTodo = checkSchema(
  {
    content: {
      exists: {
        bail: true,
        errorMessage: "content field required",
      },
      trim: true,
      notEmpty: true,
      errorMessage: "content value is invalid",
    },
    completed: {
      optional: true,
      isBoolean: {
        errorMessage: "completed field should contain boolean value",
      },
      default: false,
    },
  },
  ["body"]
).concat(checkValidation);

const GetTodo = checkSchema(
  {
    id: {
      isNumeric: true,
      errorMessage: "id should be a numeric value",
    },
  },
  ["params"]
).concat(checkValidation);

const UpdateTodo = checkSchema(
  {
    id: {
      in: "params",
      isInt: true,
      errorMessage: "id should be a numeric value",
    },
    content: {
      optional: true,
      trim: true,
      notEmpty: true,
      escape: true,
      errorMessage: "content value is invalid",
    },
    completed: {
      optional: true,
      isBoolean: {
        errorMessage: "completed field should contain boolean value",
      },
    },
  },
  ["body"]
).concat(checkValidation);

module.exports = {
  AddTodo,
  GetTodo,
  UpdateTodo,
};
