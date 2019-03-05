// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config");

const Course = require("../models/Course");
const CourseModule = require("../models/CourseModule");
const QuizDetail = require("../models/QuizDetail");
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

router.get('/certificate/:courseId', passport.authenticate('jwt', { session: false }), async(req, res) => {
      var module_count = await CourseModule.find({ course_id: req.params.courseId }).countDocuments({});
      var quiz_module_count = await QuizDetail.find({ course_id: req.params.courseId,score: { $gt: 80 } }).countDocuments({});
      if(module_count == quiz_module_count){

      }else{
            res.json([]);
      }

      console.log(module_count+"   "+quiz_module_count);
});

module.exports = router;
