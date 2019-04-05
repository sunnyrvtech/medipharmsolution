// enrolled.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateEnrolledInput = require("../../validation/admin/enrolled");

const Enrolled = require("../../models/Enrolled");
const moment = require('moment');

router.get(
  "/enrolled",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrolled.find()
      .populate("user_id course_id", "email name")
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
            start_at: element.created_at,
            expired_at: element.created_at
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
    const { errors, isValid } = validateQuizInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    var newEnrolled = new Enrolled();
    newEnrolled.user_id = req.body.user_id;
    newEnrolled.course_id = req.body.course_id;
    newEnrolled.user_id = req.body.price;
    newEnrolled.created_at = moment().toISOString();
    newEnrolled.expired_at = moment().add(3, 'M').toISOString();
    

    newEnrolled.save(function(err, enrolled) {
      //console.log(err);
      res.json(enrolled);
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.findOne({ _id: req.body.quizId }).then(quiz => {
      const { errors, isValid } = validateQuizInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (quiz) {
        Quiz.updateOne(
          { _id: req.body.quizId },
          {
            $set: {
              name: req.body.name,
              options: {
                option1: req.body.option1,
                option2: req.body.option2,
                option3: req.body.option3,
                option4: req.body.option4
              },
              answer: req.body.answer
            }
          }
        ).then(result => {
          res.json(result);
        });
      } else {
        return res.status(400).json({
          name: "Quiz not found!"
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
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
    Quiz.findOne({ _id: req.params.id }).then(quiz => {
      res.json(quiz);
    });
  }
);

module.exports = router;
