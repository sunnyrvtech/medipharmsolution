// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config");

const Course = require("../models/Course");
const Category = require("../models/Category");

router.get("/category/:categorySlug", function(req, res) {
  Category.findOne({
    slug: req.params.categorySlug
  }).then(category => {
    if (category) {
      var category_array = {};
      category_array.name = category.name;
      category_array.banner = category.banner;

      Course.find({ category_id: category.id }).then(courses => {
        res.json({ IMAGE_CATEGORY_URL:config.IMAGE_CATEGORY_URL,IMAGE_COURSE_URL:config.IMAGE_COURSE_URL,category: category_array, courses: courses });
      });
    } else {
      res.json([]);
    }
  });
});
router.get("/:courseSlug", function(req, res) {
  Course.aggregate([
    {
      $lookup: {
        from: "course_modules",
        localField: "_id",
        foreignField: "course_id",
        as: "course_modules"
      }
    },
    { $match: { slug: req.params.courseSlug } }
  ]).then(course => {
    res.json({IMAGE_COURSE_URL:config.IMAGE_COURSE_URL,course:course});
  });
});
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
        Course.find({ _id: '5c70e72a093dbd32c6155519' }).then(courses => {
          res.json(courses);
        });
});

module.exports = router;
