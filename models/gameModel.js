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
  },
  buttononelink: {
    type: String,
  },
  buttontwo: {
    type: String,
  },
  buttontwolink: {
    type: String,
  },
});

const Game = mongoose.model("Game", gameschema);

module.exports = Game;
