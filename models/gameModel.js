const mongoose = require("mongoose");

const gameschema = new mongoose.Schema({
  gamename: {
    type: String,
  },
  gamecategoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gamecategory",
  },
  gameimage: {
    type: String,
  },
  imagealttag: {
    type: String,
  },
  imagepublicid: {
    type: String,
  },
  topyellowtitle: {
    type: String,
  },
  provider: {
    type: String,
  },
  stake: {
    type: String,
  },
  paragraphtitle: {
    type: String,
  },
  paragraph: {
    type: String,
  },
  orangetitle: {
    type: String,
  },
  note: {
    type: String,
  },
  buttonone: {
    type: String,
    default: "",
  },
  buttononelink: {
    type: String,
    default: "",
  },
  buttontwo: {
    type: String,
    default: "",
  },
  buttontwolink: {
    type: String,
    default: "",
  },
});

const Game = mongoose.model("Game", gameschema);

module.exports = Game;
