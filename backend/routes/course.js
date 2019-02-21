// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Course = require("../models/Course");
const Category = require("../models/Category");

router.get("/:slug", (req, res) => {
  Category.findOne({
    name: req.body.slug
  }).then(category => {
    if (category) {
      Course.find({ category_id: category.id })
        .populate("source_id", "name")
        .exec(function(err, course) {
          console.log(course);
          res.json(course);
        });
    }
  });
});

module.exports = router;
