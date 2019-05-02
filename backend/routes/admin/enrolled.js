// enrolled.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateEnrolledInput = require("../../validation/admin/enrolled");

const Enrolled = require("../../models/Enrolled");
const Enrollment = require("../../models/Enrollment");
const QuizDetail = require("../../models/QuizDetail");
const nodemailer = require("../../mailer");
const enrollmentNotification = require("../../notification/enrollment");
const moment = require("moment");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.find().sort({created_at:-1})
      .populate("user_id course_id", "email first_name last_name name")
      .exec(function(err, enrolled) {
        var result = [];
        enrolled.forEach(function(element, i) {
          result.push({
            _id: element._id,
            id: i + 1,
            course_name: element.course_id.name,
            first_name: element.user_id.first_name,
            last_name: element.user_id.last_name,
            email: element.user_id.email,
            price: element.price,
            start_at: moment(element.created_at).format("YYYY-MM-DD hh:mm A"),
            expired_at: moment(element.expired_at).format("YYYY-MM-DD hh:mm A")
          });
        });
        res.json(result);
      });
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateEnrolledInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    var checkEnrolledUser = await Enrolled.findOne({ user_id: req.body.user_id,course_id: req.body.course_id }).countDocuments({});
    if(checkEnrolledUser){
      return res.status(400).json({course_name: 'This course is already enrolled to this user.Please delete the old record first!'});
    }
    var newEnrolled = new Enrolled();
    newEnrolled.user_id = req.body.user_id;
    newEnrolled.course_id = req.body.course_id;
    newEnrolled.price = req.body.price;
    newEnrolled.created_at = moment(req.body.start_at).toISOString();
    newEnrolled.expired_at = moment(req.body.expired_at).toISOString();
    // newEnrolled.created_at = moment().toISOString();
    // newEnrolled.expired_at = moment().add(3, 'M').toISOString();
    newEnrolled.save(async function(err, enrolled) {
      //console.log(err);
      await Enrollment.deleteMany({
        user_id: req.body.user_id,
        course_id: req.body.course_id
      });
      var noti_data = {
        user_name: req.body.user_name,
        course_name: req.body.course_name
      };
      var { html } = enrollmentNotification.userEnrolledNotification(noti_data);
      nodemailer.mailOptions.to = req.body.email;
      nodemailer.mailOptions.subject = "Enrolled Course-Medipharm Solutions";
      nodemailer.mailOptions.html = html;
      nodemailer.transporter.sendMail(nodemailer.mailOptions, function(
        error,
        info
      ) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.json(enrolled);
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.findOne({ _id: req.body.enrolledId }).then(enrolled => {
      const { errors, isValid } = validateEnrolledInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (enrolled) {
        Enrolled.updateOne(
          { _id: req.body.enrolledId },
          {
            $set: {
              price: req.body.price,
              created_at: moment(req.body.start_at).toISOString(),
              expired_at: moment(req.body.expired_at).toISOString()
            }
          }
        ).then(result => {
          res.json(result);
        });
      } else {
        return res.status(400).json({
          name: "Not found!"
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      async enrolled => {
        await QuizDetail.deleteMany({
          user_id: enrolled.user_id,
          course_id: enrolled.course_id
        });
        enrolled.remove();
        res.json(enrolled);
      }
    );
  }
);

router.get(
  "/certificate/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    var enrolled = await Enrolled.findOne(
      {
        _id: req.params.id
      },
      { user_id: 1, course_id: 1 }
    ).populate("user_id course_id", "first_name last_name email name");

    QuizDetail.aggregate([
      {
        $match: {
          course_id: mongoose.Types.ObjectId(enrolled.course_id._id),
          user_id: mongoose.Types.ObjectId(enrolled.user_id._id)
        }
      },
      {
        $group: {
          _id: enrolled.course_id._id,
          totalQuestion: { $sum: "$total_question" },
          totalAnswer: { $sum: "$total_answer" },
          count: { $sum: 1 }
        }
      }
    ]).then(quiz_detail => {
      if (quiz_detail.length) {
        var score =
          (quiz_detail[0].totalAnswer * 100) / quiz_detail[0].totalQuestion;
      } else {
        var score = 0;
      }
      //res.json(null);
      const certificate = {
        first_name: enrolled.user_id.first_name,
        last_name: enrolled.user_id.last_name,
        email: enrolled.user_id.email,
        course_name: enrolled.course_id.name,
        score: score.toFixed(2)
      };
      res.json(certificate);
    });
  }
);

router.post(
  "/certificate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var html =
      "<h3>Hello " + req.body.first_name + " " + req.body.last_name + "</h3>";
    html +=
      "<p>Congratulation! You have successfully passed <b>" +
      req.body.course_name +
      "</b> course.Please find the certificate attachment below:-</p>";
    nodemailer.mailOptions.to = req.body.email;
    nodemailer.mailOptions.subject = "Cartificate From Medipharm Solutions";
    nodemailer.mailOptions.html = html;
    nodemailer.mailOptions.attachments = [
      {
        filename: "certificate.pdf",
        content: new Buffer.from(req.body.pdf.split("base64,")[1], "base64"),
        contentType: "application/pdf"
      }
    ];
    nodemailer.transporter.sendMail(nodemailer.mailOptions, function(
      error,
      info
    ) {
      if (error) {
        return res.status(400).json(error);
      } else {
        res.json(info.response);
      }
    });
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.findOne({ _id: req.params.id })
      .populate("user_id course_id", "email first_name last_name name")
      .exec(function(err, enrolled) {
        if (enrolled != undefined || enrolled) res.json(enrolled);
        else res.json(null);
      });
  }
);

module.exports = router;
