// quiz.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateQuizInput = require("../validation/quiz");

const Quiz = require("../models/Quiz");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.find()
      .populate("module_id", "name")
      .exec(function(err, quizes) {
        var result = [];
        quizes.forEach(function(element, i) {
          result.push({
            _id: element._id,
            id: i + 1,
            name: element.name,
            module_name: element.module_id.name
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
    var newQuiz = new Quiz();
    newQuiz.name = req.body.name;
    newQuiz.module_id = req.body.moduleId;
    newQuiz.options = {
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4
    };
    newQuiz.answer = req.body.answer;
    newQuiz.save(function(err, quiz) {
      //console.log(err);
      res.json(quiz);
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
