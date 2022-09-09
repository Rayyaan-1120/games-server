const mongoose = require("mongoose");

const articleschema = new mongoose.Schema({
  article: {
    type: String,
  },
  articleheading: {
    type: String,
  },
  articlecategoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gamecategory",
  },
});

const Article = mongoose.model("Article", articleschema);

module.exports = Article;
