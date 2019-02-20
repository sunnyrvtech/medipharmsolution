// media.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const passport = require("passport");

var IMAGE_GALLERY_URL =
  process.env.APP_ENV == "developement"
    ? "http://localhost:5000/gallery/"
    : "http://157.230.186.77:5000/gallery/";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/gallery");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  }
}).single("myImage");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    fs.readdir("public/gallery", (err, filenames) => {
      var result = [];
      filenames.forEach(function(element, i) {
        result.unshift({
          imageUrl: `${IMAGE_GALLERY_URL + element}`,
          imageName: element
        });
      });
      res.json(result);
    });
  }
);
router.post(
  "/upload",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      if (err)
        return res.status(400).json({
          message: err
        });
      else
        res.json({
          imageUrl: `${IMAGE_GALLERY_URL + req.file.filename}`
        });
    });
  }
);
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // delete file named 'sample.txt'
    fs.unlink("public/gallery/" + req.body.imageName, function(err) {
      if (!err) {
        res.json({
          success: true
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong . please try again later!"
        });
      }
    });
  }
);

module.exports = router;