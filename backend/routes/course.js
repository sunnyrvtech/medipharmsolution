// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validateCourseInput = require("../validation/course");

const Course = require("../models/Course");

router.get(
  "/course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.find({}).then(course => {
      var result = [];
      course.forEach(function(element, i) {
        result.push({ _id: element._id, id: i + 1, name: element.name });
      });
      res.json(result);
    });
  }
);
router.post(
  "/course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCourseInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Course.findOne({
      name: req.body.name
    }).then(course => {
      if (course) {
        return res.status(400).json({
          name: "This Course already exists"
        });
      } else {
        const newCourse = new Course({
          name: req.body.name,
          description: req.body.description
        });
        newCourse.save().then(course => {
          res.json(course);
        });
      }
    });
  }
);

router.put(
  "/course",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.body.courseId }).then(course => {
      const { errors, isValid } = validateCourseInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }

      if (course) {
        Course.updateOne(
          { _id: req.body.courseId },
          { $set: { name: req.body.name, description: req.body.description } }
        )
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            if (err && err.code == 11000) {
              return res.status(400).json({
                name: "This Course already exists"
              });
            }
          });
      } else {
        return res.status(400).json({
          name: "Course not found!"
        });
      }
    });
  }
);

router.delete(
  "/course/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id }).then(course => {
      if (course) {
        course.remove();
        res.json({ success: true });
      }
    });
  }
);
router.get(
  "/course/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id }).then(course => {
      res.json(course);
    });
  }
);

module.exports = router;
