// category.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const config = require('../../config');
const fs = require("fs");
const validateCategoryInput = require("../../validation/admin/category");

const Category = require("../../models/Category");


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/category");
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
}).single("banner");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.find({}).then(category => {
      var result = [];
      category.forEach(function(element, i) {
        result.push({
          _id: element._id,
          id: i + 1,
          name: element.name,
          slug: element.slug,
          label: element.name,
          value: element._id
        });
      });
      res.json(result);
    });
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      const { errors, isValid } = validateCategoryInput(req.body);
      if (!isValid) {
        if (req.file != undefined)
          fs.unlinkSync("public/category/" + req.file.filename);
        return res.status(400).json(errors);
      }
      if (err) {
        return res.status(400).json({
          banner: err //////  this will handle image validation error
        });
      } else {
        Category.findOne({
          name: req.body.name
        }).then(category => {
          if (category) {
            if (req.file != undefined)
              fs.unlinkSync("public/category/" + req.file.filename);
            return res.status(400).json({
              name: "This category already exists"
            });
          } else {
            const newCategory = new Category();
            newCategory.name = req.body.name;
            if (req.file != undefined) newCategory.banner = req.file.filename;
            else newCategory.banner = null;
            newCategory.save().then(category => {
              res.json(category);
            });
          }
        });
      }
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      const { errors, isValid } = validateCategoryInput(req.body);
      if (!isValid) {
        if (req.file != undefined)
          fs.unlinkSync("public/category/" + req.file.filename);
        return res.status(400).json(errors);
      }
      if (err) {
        return res.status(400).json({
          banner: err //////  this will handle image validation error
        });
      }
      Category.findOne({ _id: req.body.categoryId }).then(category => {
        if (category) {
          var old_banner = category.banner;
          category.name = req.body.name;
          if (req.file != undefined) {
            category.banner = req.file.filename;
          }
          category
            .save()
            .then(category => {
              if (old_banner && old_banner != category.banner)
                fs.unlinkSync("public/category/" + old_banner);
              res.json(category);
            })
            .catch(error => {
              if ((error.code = 11000)) {
                if (req.file != undefined)
                  fs.unlinkSync("public/category/" + req.file.filename);
                return res.status(400).json({
                  name: "This category already exists"
                });
              }
            });
        } else {
          if (req.file != undefined)
            fs.unlinkSync("public/category/" + req.file.filename);
          return res.status(400).json({
            name: "Category not found!"
          });
        }
      });
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {
      if (category) {
        if (category.banner)
          fs.unlinkSync("public/category/" + category.banner);
        category.remove();
        res.json({ success: true });
      }
    });
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {
      if (category.banner)
        category.banner = config.IMAGE_CATEGORY_URL+ category.banner;
      res.json(category);
    });
  }
);

module.exports = router;
