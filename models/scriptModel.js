const mongoose = require("mongoose");

const scriptschema = new mongoose.Schema({
  src: {
    type: String,
  },
  id: {
    type: String,
  },
});

const Script = mongoose.model("Script", scriptschema);

module.exports = Script;
