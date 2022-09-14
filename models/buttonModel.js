const mongoose = require("mongoose");

const ButtonModel = new mongoose.Schema({
  buttonone: {
    type: String,
  },
  buttontwo: {
    type: String,
  },
  buttononelink: {
    type: String,
  },
  buttontwolink: {
    type: String,
  },
});

const Button = mongoose.model("Button", ButtonModel);

module.exports = Button;
