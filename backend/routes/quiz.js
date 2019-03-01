// quiz.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const Quiz = require("../models/Quiz");


router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Quiz.find({ module_id: req.params.id }).then(quizs => {
      res.json(quizs);
    });
  });

module.exports = router;
