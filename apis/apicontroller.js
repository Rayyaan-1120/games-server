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
const Slidertext = require("../models/slidertextModel");

exports.creategame = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(404).send("Please provide the game image");
  }

  const {
    gamename,
    gamecategoryid,
    imagealttag,
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
    imagealttag,
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
    imagealttag,
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
      imagealttag,
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

exports.updatebuttonlinkglobally = catchAsync(async (req, res, next) => {
  const { buttonlinkone, buttonlinktwo } = req.body;

  console.log(req.body);

  const games = await Game.find({
    gamename: { $gte: " " },
    gameimage: { $gte: " " },
  }).count();
  console.log(games, "gbuttonlinkoneames");

  const data = await Game.updateMany(
    {},
    { $set: { buttononelink: buttonlinkone, buttontwolink: buttonlinktwo } }
  );

  console.log(data, "games");

  res.status(200).json({
    message: "Documents updated successfully",
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

exports.gethomepagegames = catchAsync(async (req, res, next) => {
  const gamecategory = await Gamecategory.find({});

  const games = await Game.find({ gamecategoryid: gamecategory[0]?._id });

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

  const { gamecategoryname, imagealttag } = req.body;

  const photo = await cloudinary.uploader.upload(req.file.path);

  const newgamecategory = await Gamecategory.create({
    gamecategoryname,
    imagealttag,
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

  const { gamecategoryname, imagealttag } = req.body;

  const gamecategory = await Gamecategory.findById(id);

  let photo;

  if (req.file) {
    photo = await cloudinary.uploader.upload(req.file.path);
  }

  const newgamecategory = await Gamecategory.findByIdAndUpdate(
    id,
    {
      gamecategoryname,
      imagealttag,
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
  const { article, articleheading, articlecategoryid } = req.body;

  const newarticle = await Article.create({
    article,
    articleheading,
    articlecategoryid,
  });

  res.status(200).json({
    data: newarticle,
  });
});

exports.editarticle = catchAsync(async (req, res, next) => {
  const { articleid } = req.params;

  const { article, articleheading, articlecategoryid } = req.body;

  const newarticle = await Article.findByIdAndUpdate(articleid, {
    article,
    articleheading,
    articlecategoryid,
  });

  res.status(200).json({
    data: newarticle,
  });
});

exports.gethomepagearticle = catchAsync(async (req, res, next) => {
  const gamecategory = await Gamecategory.find({});

  const article = await Article.find({
    articlecategoryid: gamecategory[0]?._id,
  });

  res.status(200).json({
    data: article,
  });
});

exports.getcategoryarticle = catchAsync(async (req, res, next) => {
  const { categoryid } = req.params;

  const articles = await Article.find({ articlecategoryid: categoryid });

  res.status(200).json({
    data: articles,
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

exports.updateadmin = catchAsync(async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;

  const admin = await Admin.find({});

  if (admin) {
    const admintrue = await bcrypt.compare(oldpassword, admin[0].password);

    if (!admintrue) {
      return res.status(401).json({
        message: "Please enter the correct password and try again",
      });
    }

    const hashpassword = await bcrypt.hash(newpassword, 12);

    await Admin.findByIdAndUpdate(admin[0]?._id, {
      password: hashpassword,
    });

    res.status(200).json({
      message: "Password updated successfully",
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

exports.createslidertext = catchAsync(async (req, res, next) => {
  const { text } = req.body;

  const newslidertext = await Slidertext.create({
    text,
  });

  res.status(200).json({
    data: newslidertext,
  });
});

exports.editslidertext = catchAsync(async (req, res, next) => {
  const { slidertextid } = req.params;

  const { text } = req.body;

  const editscript = await Slidertext.findByIdAndUpdate(slidertextid, {
    text,
  });

  res.status(200).json({
    data: editscript,
  });
});

exports.getslidertext = catchAsync(async (req, res, next) => {
  const scripts = await Slidertext.find({});

  res.status(200).json({
    data: scripts,
  });
});
