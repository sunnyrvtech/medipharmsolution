// course_module.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const CourseModule = require("../models/CourseModule");
const QuizDetail = require("../models/QuizDetail");
const Enrolled = require("../models/Enrolled");
const moment = require("moment");

router.get(
  "/:courseId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.courseId)) {
      var isCourseEnrolled = await Enrolled.findOne({
        user_id: req.user.id,
        course_id: req.params.courseId,
        expired_at: { $gte: moment().toISOString() }
      }).countDocuments({});
      if (isCourseEnrolled) {
        // CourseModule.aggregate([
        //   { $match: { course_id: mongoose.Types.ObjectId(req.params.courseId) } },
        //   {
        //     $lookup: {
        //       from: "quiz_details",
        //       localField: "_id",
        //       foreignField: "module_id",
        //       as: "quiz_detail"
        //     }
        //   },
        //   {
        //     $unwind: {
        //       path: "$quiz_detail",
        //       preserveNullAndEmptyArrays: true
        //     }
        //   },
        //   {
        //     $lookup: {
        //       from: "courses",
        //       localField: "course_id",
        //       foreignField: "_id",
        //       as: "courses"
        //     }
        //   },
        //   { $unwind: "$courses" },
        //   {
        //     $project: {
        //       _id: 1,
        //       name: 1,
        //       "courses._id": 1,
        //       "courses.name": 1,
        //       "quiz_detail.score": 1,
        //       "quiz_detail.total_question": 1,
        //       "quiz_detail.total_answer": 1
        //     }
        //   }
        // ]).then(modules => {
        //   res.json(modules);
        // });

        CourseModule.find(
          { course_id: req.params.courseId },
          { _id: 1, name: 1 }
        )
          .populate("course_id", "name")
          .exec(async function(err, modules) {
            const quiz_details = await QuizDetail.find(
              { course_id: req.params.courseId,user_id: req.user.id },
              { module_id: 1, total_question: 1, total_answer: 1, score: 1 }
            );
            res.json({ modules: modules, quiz_details: quiz_details });
          });
      } else {
        res.json({ modules: [], quiz_details: [] });
      }
    } else {
      res.json({ modules: [], quiz_details: [] });
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
