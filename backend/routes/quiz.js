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
    Quiz.find({ module_id: req.params.id }).then(quizs => {
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
      console.log(quiz_detail);
      if (quiz_detail) {
        console.log('update');
        quiz_detail.score = req.body.score;
        quiz_detail.save().then(detail => {
          res.json(detail);
        });
      } else {
        console.log('add');
        var newQuizDetail = new QuizDetail();
        newQuizDetail.user_id = req.body.user_id;
        newQuizDetail.module_id = req.body.module_id;
        newQuizDetail.score = req.body.score;
        newQuizDetail.save(function(err, quiz_detail) {
          res.json(quiz_detail);
        });
      }
    });
  }
);

router.get('/history/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
        QuizDetail.find({ user_id: req.params.userId })
          .populate({path : 'module_id',select: 'name', populate : {path : 'course_id',select: 'name'}})
          .exec(function(err, quiz_detail) {
            console.log(quiz_detail);
            res.json(quiz_detail);
          });
});


module.exports = router;
