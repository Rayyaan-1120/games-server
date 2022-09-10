const mongoose = require("mongoose");

const columnschema = new mongoose.Schema({
  columnoneheading: {
    type: String,
  },
  columnonetextone: {
    type: String,
  },
  columnonetexttwo: {
    type: String,
  },
  columntwoheading: {
    type: String,
  },
  columntwotextone: {
    type: String,
  },
  columntwotexttwo: {
    type: String,
  },
  columnthreeheading: {
    type: String,
  },
  columnthreebuttonone: {
    type: String,
  },
  columnthreebuttononelink: {
    type: String,
  },
  columnthreebuttontwo: {
    type: String,
  },
  columnthreebuttontwolink: {
    type: String,
  },
});

const Column = mongoose.model("Column", columnschema);

module.exports = Column;
