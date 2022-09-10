const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminschema = new mongoose.Schema({
  password: {
    type: String,
  },
});

adminschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const Admin = mongoose.model("Admin", adminschema);

module.exports = Admin;
