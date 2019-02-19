// category.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateCategoryInput = require("../validation/category");

const Category = require("../models/Category");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Category.find({}).then(category => {
      var result = [];
      category.forEach(function(element, i) {
        result.push({ _id: element._id, id: i + 1, name: element.name });
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
        const newCategory = new Category({
          name: req.body.name
        });
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
    Category.findOne({ _id: req.body.categoryId }).then(category => {
      const { errors, isValid } = validateCategoryInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (category) {
        Category.updateOne(
          { _id: req.body.categoryId },
          {
            $set: {
              name: req.body.name
            }
          }
        ).then(result => {
          res.json(result);
        }).catch(err => {
          if (err && err.code == 11000) {
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
