// course_module.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const CourseModule = require("../models/CourseModule");
const Enrolled = require("../models/Enrolled");
const moment = require("moment");

router.get(
  "/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var isCourseEnrolled = await Enrolled.findOne({
      user_id: req.user.id,
      course_id: req.params.courseId,
      expired_at: { $gte: moment().toISOString() }
    }).countDocuments({});
    if (isCourseEnrolled) {
      CourseModule.aggregate([
        { $match: { course_id: mongoose.Types.ObjectId(req.params.courseId) } },
        {
          $lookup: {
            from: "quiz_details",
            localField: "_id",
            foreignField: "module_id",
            as: "quiz_detail"
          }
        },
        {
          $unwind: {
            path: "$quiz_detail",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: "courses",
            localField: "course_id",
            foreignField: "_id",
            as: "courses"
          }
        },
        { $unwind: "$courses" },
        {
          $project: {
            _id: 1,
            name: 1,
            "courses._id": 1,
            "courses.name": 1,
            "quiz_detail.score": 1,
            "quiz_detail.total_question": 1,
            "quiz_detail.total_answer": 1
          }
        }
      ]).then(modules => {
        res.json(modules);
      });
    } else {
      res.json([]);
    }
  }
);
router.get(
  "/module/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    CourseModule.findOne({ _id: req.params.id })
      .then(async modules => {
        var isCourseEnrolled = await Enrolled.findOne({
          user_id: req.user.id,
          course_id: modules.course_id,
          expired_at: { $gte: moment().toISOString() }
        }).countDocuments({});
        if (isCourseEnrolled) res.json(modules);
        else res.json(null);
      })
      .catch(err => {
        res.json(null);
      });
  }
);

module.exports = router;
