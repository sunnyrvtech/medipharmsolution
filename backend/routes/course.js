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
const Enrollment = require("../models/Enrollment");
const Enrolled = require("../models/Enrolled");

const validateEnrollmentInput = require("../validation/enrollment");
const nodemailer = require("../mailer");
const enrollmentNotification = require("../notification/enrollment");
const moment = require('moment');


router.get("/category/:categorySlug", function(req, res) {
  Category.findOne({
    slug: req.params.categorySlug
  }).then(category => {
    if (category) {
      var category_array = {};
      category_array.name = category.name;
      category_array.description = category.description;
      category_array.banner_slides = category.banner_slides;
      category_array.video = category.video;

      Course.find({ category_id: category.id }).then(courses => {
        res.json({
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
router.get("/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.find({ user_id: req.user.id,expired_at: {"$gte": moment().toISOString()}}).populate("course_id", "name")
    .exec(function(err, response) {
      res.json(response);
    });
  }
);
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

router.get("/",function(req, res){
    Course.find().then(courses => {
      res.json(courses);
    });
  });
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
                score: score.toFixed(2)
              }
            res.json(certificate);
          });
      } else {
        res.json(null);
      }
    });

    // console.log(module_count + "   " + quiz_module_count);
  }
);

router.post(
  "/enrollment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateEnrollmentInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    var newEnrollment = new Enrollment();
    newEnrollment.user_id =  req.user.id;
    newEnrollment.course_id = req.body.course_id;
    var noti_data = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      phone_number: req.user.phone_number != undefined ? req.user.phone_number:'',
      course_name: req.body.course_name,
    }

    newEnrollment.save(function(err, enrollment) {
      ///  notification sent to admin
      noti_data.title = "New enrollment request has been received. Please check following enrollment details below:-"
      var { html } = enrollmentNotification.adminEnrollmentNotification(noti_data);
      nodemailer.mailOptions.to = process.env.MAIL_FROM_ADDRESS;
      nodemailer.mailOptions.subject = "New Enrollment Request Received-Medipharm Solutions";
      nodemailer.mailOptions.html = html;
      nodemailer.transporter.sendMail(
      nodemailer.mailOptions,
      function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
      ///  notification sent to user
      noti_data.title = "We have received your enrollment request and we will contact you soon. If you have not heard from us within this time, Please contact us at admin@medipharmsolutions.com. Please check following enrollment details below:-"
      var { html } = enrollmentNotification.adminEnrollmentNotification(noti_data);
      nodemailer.mailOptions.to = req.user.email;
      nodemailer.mailOptions.subject = "Enrollment Request Received-Medipharm Solutions";
      nodemailer.mailOptions.html = html;
      nodemailer.transporter.sendMail(
      nodemailer.mailOptions,
      function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
      res.json(enrollment);
    });
  }
);

module.exports = router;
