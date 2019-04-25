// enrolled.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateEnrolledInput = require("../../validation/admin/enrolled");

const Enrolled = require("../../models/Enrolled");
const Enrollment = require("../../models/Enrollment");
const nodemailer = require("../../mailer");
const enrollmentNotification = require("../../notification/enrollment");
const moment = require('moment');

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.find()
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
            start_at: moment(element.created_at).format('YYYY-MM-DD hh:mm A'),
            expired_at: moment(element.expired_at).format('YYYY-MM-DD hh:mm A')
          });
        });
        res.json(result);
      });
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEnrolledInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
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
     await  Enrollment.deleteMany({ user_id: req.body.user_id,course_id: req.body.course_id });
      var noti_data = {
        user_name: req.body.user_name,
        course_name: req.body.course_name
      }
      var { html } = enrollmentNotification.userEnrolledNotification(noti_data);
      nodemailer.mailOptions.to = process.env.MAIL_FROM_ADDRESS;
      nodemailer.mailOptions.subject = "Enrolled Course-Medipharm Solutions";
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
    Enrolled.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      result => {
        res.json(result);
      }
    );
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.findOne({ _id: req.params.id }).populate("user_id course_id", "email first_name last_name name")
    .exec(function(err, enrolled) {
      if(enrolled != undefined || enrolled)
      res.json(enrolled);
      else
        res.json(null);
    });
  }
);

module.exports = router;
