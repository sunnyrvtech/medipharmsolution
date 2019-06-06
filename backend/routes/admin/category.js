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
    let fileExtension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    let random_string = Math.random().toString(36).substring(7);
    cb(null, Date.now()+random_string+fileExtension);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
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
    const { errors, isValid } = validateCategoryInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Category.findOne({
      name: req.body.name
    }).then(category => {
      if (category) {
        return res.status(400).json({
          name: "This category already exists"
        });
      } else {
        const newCategory = new Category();
        newCategory.name = req.body.name;
        newCategory.description = req.body.description;
        newCategory.banner_slides = req.body.banner_slides;

        newCategory.save().then(category => {
          res.json(category);
        });
      }
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    const { errors, isValid } = validateCategoryInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Category.findOne({ _id: req.body.categoryId }).then(category => {
      if (category) {
        category.name = req.body.name;
        category.description = req.body.description;
        category.banner_slides = req.body.banner_slides;
        category
          .save()
          .then(category => {
            res.json(category);
          })
          .catch(error => {
            if ((error.code = 11000)) {
              return res.status(400).json({
                name: "This category already exists"
              });
            }
          });
      } else {
        return res.status(400).json({
          name: "Category not found!"
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.findOne({ _id: req.params.id }).then(category => {
      if (category) {
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
      res.json(category);
    });
  }
);

module.exports = router;
