const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  creategame,
  creategamecategory,
  getAllgames,
  getAllgamecategories,
  editgame,
  deletegame,
  editgamecategory,
  deletegamecategory,
  getcategorygames,
  createarticle,
  editarticle,
  deletearticle,
  getAllarticles,
  createcolumn,
  editcolumn,
  getcolumn,
  deletecolumn,
  createadmin,
  loginadmin,
  createscript,
  getscripts,
  deletescript,
  editscript,
} = require("./apis/apicontroller");
const multer = require("./utils/multer");

const app = express();

const router = express.Router();

router.post(
  "/creategame",
  multer.imageuploadmiddleware.single("photo"),
  creategame
);

router.put(
  "/editgame/:id",
  multer.imageuploadmiddleware.single("photo"),
  editgame
);

router.get("/games", getAllgames);

router.get("/categorygames/:categoryid", getcategorygames);

router.delete("/deletegame/:publicId", deletegame);

router.post(
  "/creategamecategory",
  multer.imageuploadmiddleware.single("photo"),
  creategamecategory
);
router.put(
  "/editgamecategory/:id",
  multer.imageuploadmiddleware.single("photo"),
  editgamecategory
);

router.get("/gamecategories", getAllgamecategories);

router.delete("/deletegamecategory/:publicId", deletegamecategory);

router.post("/createarticle", createarticle);

router.put("/editarticle/:articleid", editarticle);

router.get("/getarticles", getAllarticles);

router.delete("/deletearticle/:articleid", deletearticle);

router.post("/createcolumn", createcolumn);

router.put("/editcolumn/:columnid", editcolumn);

router.get("/getcolumn", getcolumn);

router.delete("/deletecolumn/:columnid", deletecolumn);

router.post("/createadmin", createadmin);

router.post("/loginadmin", loginadmin);

router.post("/createscript", createscript);

router.put("/editscript/:scriptid", editscript);

router.get("/getscripts", getscripts);

router.delete("/deletescript/:scriptid", deletescript);

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Application is working");
});

app.all("*", (req, res, next) => {
  res.status(500).json({
    message: `Could Not Find ${req.originalUrl} on the server`,
  });
});

module.exports = app;
