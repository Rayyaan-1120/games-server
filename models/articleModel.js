const mongoose = require("mongoose");

const articleschema = new mongoose.Schema({
  article: {
    type: String,
  },
  articleheading: {
    type: String,
  },
});

const Article = mongoose.model("Article", articleschema);

module.exports = Article;
