const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/cloudinary");
const Game = require("../models/gameModel");
const Gamecategory = require("../models/gamecategoryModel");
const fs = require("fs");
const Article = require("../models/articleModel");
const Column = require("../models/columnModel");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const Script = require("../models/scriptModel");

exports.creategame = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(404).send("Please provide the game image");
  }

  const {
    gamename,
    gamecategoryid,
    topyellowtitle,
    provider,
    stake,
    paragraphtitle,
    paragraph,
    orangetitle,
    note,
    buttonone,
    buttononelink,
    buttontwo,
    buttontwolink,
  } = req.body;

  const photo = await cloudinary.uploader.upload(req.file.path);

  const newgame = await Game.create({
    gamename,
    gamecategoryid: gamecategoryid,
    gameimage: photo.secure_url,
    imagepublicid: photo.public_id,
    topyellowtitle,
    provider,
    stake,
    paragraphtitle,
    paragraph,
    orangetitle,
    note,
    buttonone,
    buttontwo,
    buttononelink,
    buttontwolink,
  });

  fs.unlinkSync(req.file.path);

  res.status(200).json({
    data: newgame,
  });
});

exports.editgame = catchAsync(async (req, res, next) => {
  console.log(req.file);

  const { id } = req.params;

  const {
    gamename,
    gamecategoryid,
    topyellowtitle,
    provider,
    stake,
    paragraphtitle,
    paragraph,
    orangetitle,
    note,
    buttonone,
    buttononelink,
    buttontwo,
    buttontwolink,
  } = req.body;

  const game = await Game.findById(id);

  let photo;

  if (req.file) {
    photo = await cloudinary.uploader.upload(req.file.path);
  }

  const newgame = await Game.findByIdAndUpdate(
    id,
    {
      gamename,
      gamecategoryid: gamecategoryid,
      gameimage: req.file ? photo.secure_url : game.gameimage,
      imagepublicid: req.file ? photo.public_id : game.imagepublicid,
      topyellowtitle,
      provider,
      stake,
      paragraphtitle,
      paragraph,
      orangetitle,
      note,
      buttonone,
      buttontwo,
      buttononelink,
      buttontwolink,
    },
    { new: true }
  );

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res.status(200).json({
    data: newgame,
  });
});

exports.deletegame = catchAsync(async (req, res, next) => {
  const { publicId } = req.params;

  try {
    await cloudinary.uploader.destroy(
      publicId,
      { invalidate: true },
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to delete",
          });
        }

        await Game.findOneAndDelete({ imagepublicid: publicId });

        res.status(204).json({
          message: "Game has been deleted successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.getAllgames = catchAsync(async (req, res, next) => {
  const games = await Game.find({});

  res.status(200).json({
    data: games,
  });
});

exports.getcategorygames = catchAsync(async (req, res, next) => {
  const { categoryid } = req.params;

  const games = await Game.find({ gamecategoryid: categoryid });

  res.status(200).json({
    data: games,
  });
});

exports.creategamecategory = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(404).send("Please provide the game category image");
  }

  const { gamecategoryname } = req.body;

  const photo = await cloudinary.uploader.upload(req.file.path);

  const newgamecategory = await Gamecategory.create({
    gamecategoryname,
    gamecategoryimage: photo.secure_url,
    imagepublicid: photo.public_id,
  });

  fs.unlinkSync(req.file.path);

  res.status(200).json({
    data: newgamecategory,
  });
});

exports.getAllgamecategories = catchAsync(async (req, res, next) => {
  const games = await Gamecategory.find({});

  res.status(200).json({
    data: games,
  });
});

exports.editgamecategory = catchAsync(async (req, res, next) => {
  console.log(req.file);

  const { id } = req.params;

  const { gamecategoryname } = req.body;

  const gamecategory = await Gamecategory.findById(id);

  let photo;

  if (req.file) {
    photo = await cloudinary.uploader.upload(req.file.path);
  }

  const newgamecategory = await Gamecategory.findByIdAndUpdate(
    id,
    {
      gamecategoryname,
      gamecategoryimage: req.file ? photo.secure_url : gamecategory.gameimage,
      imagepublicid: req.file ? photo.public_id : gamecategory.imagepublicid,
    },
    { new: true }
  );

  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  res.status(200).json({
    data: newgamecategory,
  });
});

exports.deletegamecategory = catchAsync(async (req, res, next) => {
  const { publicId } = req.params;

  try {
    await cloudinary.uploader.destroy(
      publicId,
      { invalidate: true },
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Failed to delete",
          });
        }

        await Gamecategory.findOneAndDelete({ imagepublicid: publicId });

        res.status(204).json({
          message: "Game category has been deleted successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

exports.createarticle = catchAsync(async (req, res, next) => {
  const { article, articleheading } = req.body;

  const newarticle = await Article.create({
    article,
    articleheading,
  });

  res.status(200).json({
    data: newarticle,
  });
});

exports.editarticle = catchAsync(async (req, res, next) => {
  const { articleid } = req.params;

  const { article, articleheading } = req.body;

  const newarticle = await Article.findByIdAndUpdate(articleid, {
    article,
    articleheading,
  });

  res.status(200).json({
    data: newarticle,
  });
});

exports.deletearticle = catchAsync(async (req, res, next) => {
  const { articleid } = req.params;

  await Article.findByIdAndDelete(articleid);

  res.status(204).json({
    message: "Article deleted successfully",
  });
});

exports.getAllarticles = catchAsync(async (req, res, next) => {
  const articles = await Article.find({});

  res.status(200).json({
    data: articles,
  });
});

exports.createcolumn = catchAsync(async (req, res, next) => {
  const {
    columnoneheading,
    columnonetextone,
    columnonetexttwo,
    columntwoheading,
    columntwotextone,
    columntwotexttwo,
    columnthreeheading,
    columnthreebuttonone,
    columnthreebuttononelink,
    columnthreebuttontwo,
    columnthreebuttontwolink,
  } = req.body;

  const newcolumn = await Column.create({
    columnoneheading,
    columnonetextone,
    columnonetexttwo,
    columntwoheading,
    columntwotextone,
    columntwotexttwo,
    columnthreeheading,
    columnthreebuttonone,
    columnthreebuttononelink,
    columnthreebuttontwo,
    columnthreebuttontwolink,
  });

  res.status(200).json({
    data: newcolumn,
  });
});

exports.editcolumn = catchAsync(async (req, res, next) => {
  const { columnid } = req.params;

  const {
    columnoneheading,
    columnonetextone,
    columnonetexttwo,
    columntwoheading,
    columntwotextone,
    columntwotexttwo,
    columnthreeheading,
    columnthreebuttonone,
    columnthreebuttononelink,
    columnthreebuttontwo,
    columnthreebuttontwolink,
  } = req.body;

  const editcolumn = await Column.findByIdAndUpdate(columnid, {
    columnoneheading,
    columnonetextone,
    columnonetexttwo,
    columntwoheading,
    columntwotextone,
    columntwotexttwo,
    columnthreeheading,
    columnthreebuttonone,
    columnthreebuttononelink,
    columnthreebuttontwo,
    columnthreebuttontwolink,
  });

  res.status(200).json({
    data: editcolumn,
  });
});

exports.deletecolumn = catchAsync(async (req, res, next) => {
  const { columnid } = req.params;

  await Column.findByIdAndDelete(columnid);

  res.status(204).json({
    message: "Column deleted successfully",
  });
});

exports.getcolumn = catchAsync(async (req, res, next) => {
  const column = await Column.find({});

  res.status(200).json({
    data: column,
  });
});

exports.createadmin = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  const newadmin = await Admin.create({
    password,
  });

  res.status(200).json({
    data: newadmin,
  });
});

exports.loginadmin = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  const admin = await Admin.find({});

  if (admin) {
    const admintrue = await bcrypt.compare(password, admin[0].password);

    if (!admintrue) {
      return res.status(401).json({
        message: "Please enter the correct password and try again",
      });
    }

    res.status(200).json({
      data: admin[0],
    });
  }
});

exports.createscript = catchAsync(async (req, res, next) => {
  const { src, id } = req.body;

  const newscript = await Script.create({
    src,
    id,
  });

  res.status(200).json({
    data: newscript,
  });
});

exports.editscript = catchAsync(async (req, res, next) => {
  const { scriptid } = req.params;

  const { src, id } = req.body;

  const editscript = await Script.findByIdAndUpdate(scriptid, {
    src,
    id,
  });

  res.status(200).json({
    data: editscript,
  });
});

exports.deletescript = catchAsync(async (req, res, next) => {
  const { scriptid } = req.params;

  await Script.findByIdAndDelete(scriptid);

  res.status(204).json({
    message: "Script deleted successfully",
  });
});

exports.getscripts = catchAsync(async (req, res, next) => {
  const scripts = await Script.find({});

  res.status(200).json({
    data: scripts,
  });
});
