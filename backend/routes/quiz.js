// quiz.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const Quiz = require("../models/Quiz");
const QuizDetail = require("../models/QuizDetail");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.find({ module_id: req.params.id }).populate('module_id','course_id')
    .exec(function(err, quizs) {
      res.json(quizs);
    });
  }
);

router.post(
  "/history",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    QuizDetail.findOne({
      user_id: req.body.user_id,
      module_id: req.body.module_id
    }).then(quiz_detail => {
      if (quiz_detail) {
        quiz_detail.score = req.body.score;
        quiz_detail.total_question = req.body.total_question;
        quiz_detail.total_answer = req.body.total_answer;
        quiz_detail.save().then(detail => {
          res.json(detail);
        });
      } else {
        var newQuizDetail = new QuizDetail();
        newQuizDetail.user_id = req.body.user_id;
        newQuizDetail.course_id = req.body.course_id;
        newQuizDetail.module_id = req.body.module_id;
        newQuizDetail.total_question = req.body.total_question;
        newQuizDetail.total_answer = req.body.total_answer;
        newQuizDetail.module_id = req.body.module_id;
        newQuizDetail.score = req.body.score;
        newQuizDetail.save(function(err, quiz_detail) {
          res.json(quiz_detail);
        });
      }
    });
  }
);

module.exports = router;
