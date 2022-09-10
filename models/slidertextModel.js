const mongoose = require("mongoose");

const slidertextschema = new mongoose.Schema({
  text: {
    type: String,
  },
});

const Slidertext = mongoose.model("SliderText", slidertextschema);

module.exports = Slidertext;
