const mongoose = require("mongoose");

const gamecategoryschema = new mongoose.Schema({
  gamecategoryname: {
    type: String,
  },
  gamecategoryimage: {
    type: String,
  },
  imagepublicid: {
    type: String,
  },
});

const Gamecategory = mongoose.model("Gamecategory", gamecategoryschema);

module.exports = Gamecategory;
