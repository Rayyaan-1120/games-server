const multer = require("multer");

const imagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      (file.mimetype === "image/png") | (file.mimetype === "image/webp")
    ) {
      cb(null, "public/photos");
    } else {
      cb({ message: "Only jpeg png and webp images are supported" }, false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

exports.imageuploadmiddleware = multer({ storage: imagestorage });
