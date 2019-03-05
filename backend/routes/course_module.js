// course_module.js

const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const passport = require('passport');

const CourseModule = require('../models/CourseModule');

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CourseModule.find({course_id: req.params.id}).then(modules => {
     res.json(modules);
  }).catch(err=>{
    res.json([]);
  });
});


module.exports = router;
