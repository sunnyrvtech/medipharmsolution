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
        res.json({
          IMAGE_CATEGORY_URL: config.IMAGE_CATEGORY_URL,
          IMAGE_COURSE_URL: config.IMAGE_COURSE_URL,
          category: category_array,
          courses: courses
        });
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
    res.json({ IMAGE_COURSE_URL: config.IMAGE_COURSE_URL, course: course });
  });
});
router.get("/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.find({ }).then(courses => {
      res.json(courses);
    });
  }
);

router.get(
  "/certificate/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var module_count = await CourseModule.find({
      course_id: req.params.courseId
    }).countDocuments({});
    QuizDetail.aggregate([
      { $match: { course_id: mongoose.Types.ObjectId(req.params.courseId),user_id: mongoose.Types.ObjectId(req.user.id) }},
      {
        $group: {
          _id: req.params.courseId,
          totalQuestion: { $sum: "$total_question" },
          totalAnswer: { $sum: "$total_answer" },
          count: {$sum : 1}
        }
      },
    ]).then(quiz_detail => {
      if (quiz_detail.length && module_count == quiz_detail[0].count) {
        const score = quiz_detail[0].totalAnswer*100/quiz_detail[0].totalQuestion;

        QuizDetail.findOne({ course_id: req.params.courseId })
          .populate("user_id course_id", "name first_name last_name")
          .exec(function(err, response) {
              const certificate = {
                first_name: response.user_id.first_name,
                last_name: response.user_id.last_name,
                course_name: response.course_id.name,
                score: score
              }
            res.json(certificate);
          });
      } else {
        res.json(null);
      }
    });

    console.log(module_count + "   " + quiz_module_count);
  }
);

module.exports = router;
