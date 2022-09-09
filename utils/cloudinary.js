const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "testreact123",
  api_key: "599287933422955",
  api_secret: "QHJTC1YJ-eArG3Kt8tXoudacJO4",
});

module.exports = cloudinary;
