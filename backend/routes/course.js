// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Course = require("../models/Course");
const Category = require("../models/Category");

router.get("/:slug", function(req, res) {
  Category.findOne({
    slug: req.params.slug
  }).then(category => {
    if (category) {
      Course.find({ category_id: category.id })
        .populate("category_id", "name")
        .exec(function(err, course) {
          res.json(course);
        });
    }else{
      res.json([]);
    }
  });
});

module.exports = router;
