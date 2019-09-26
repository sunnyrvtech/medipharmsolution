// course.js

const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const passport = require('passport');
const validateCourseModuleInput = require('../../validation/admin/course_module');

const CourseModule = require('../../models/CourseModule');
router.get('/course/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CourseModule.find({course_id: req.params.id}).populate('course_id','name').exec(function(err, course_modules) {
    var result =[];
    if(!err){
      course_modules.forEach(function(element,i) {
        var course_name = element.course_id != null?element.course_id.name:null;
        result.push({ _id: element._id,id: i+1,name: element.name,course_name: course_name,content: element.content });
      });
    }
    res.json(result)
});
});
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCourseModuleInput(req.body);
  if(!isValid) {
      return res.status(400).json(errors);
  }
  console.log(req.body);
  var newCourseModule = new CourseModule();
  newCourseModule.name = req.body.name;
  newCourseModule.course_id = req.body.course_id;
  newCourseModule.video = req.body.video;
  newCourseModule.final_mod = req.body.final_mod;
  newCourseModule.content = req.body.content;
  newCourseModule.save(function (err,module) {
      res.json(module);
  });
});

router.put('/update', passport.authenticate('jwt', { session: false }), (req, res) => {
  CourseModule.findOne({_id: req.body.moduleId}).then(module => {
    const { errors, isValid } = validateCourseModuleInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    if(module){
      module.name = req.body.name;
      module.content = req.body.content;
      module.video = req.body.video;
      module.final_mod = req.body.final_mod;
      module.save().then(module => {
        res.json(module);
      });
    }else{
      return res.status(400).json({
        name: 'Course not found!'
      });
    }
  });
});

router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
 CourseModule.findOne({ _id: req.params.id }).then(module => {
   if (module) {
     module.remove();
     res.json({ success: true });
   }
 });
});
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  CourseModule.findOne({_id: req.params.id}).populate('course_id','name').exec(function(err, module) {
    if(!err)
     res.json(module)
    else
     res.json(null)
  });
});


module.exports = router;
