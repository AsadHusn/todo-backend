module.exports = () =>
  require("mongoose").connect(require("#config").MONGO_URI);
