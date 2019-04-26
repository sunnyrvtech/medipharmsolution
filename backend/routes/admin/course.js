// course.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const config = require('../../config');
const fs = require("fs");
const validateCourseInput = require("../../validation/admin/course");

const Course = require("../../models/Course");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/course");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  }
}).single("banner");


router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.find()
      .populate("category_id", "name")
      .exec(function(err, course) {
        var result = [];
        course.forEach(function(element, i) {
          var category_name =
            element.category_id != null ? element.category_id.name : null;
          result.push({
            _id: element._id,
            id: i + 1,
            name: element.name,
            category_name: category_name
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
    upload(req, res, err => {
    const { errors, isValid } = validateCourseInput(req.body);

    if (!isValid) {
      if (req.file != undefined)
        fs.unlinkSync("public/course/" + req.file.filename);
      return res.status(400).json(errors);
    }
    if (err) {
      return res.status(400).json({
        banner: err //////  this will handle image validation error
      });
    } else {
    Course.findOne({
      name: req.body.name
    }).then(course => {
      if (course) {
        if (req.file != undefined)
          fs.unlinkSync("public/course/" + req.file.filename);
        return res.status(400).json({
          name: "This Course already exists"
        });
      } else {
        const newCourse = new Course();
        newCourse.name = req.body.name;
        newCourse.category_id = req.body.category;
        newCourse.description = req.body.description;
        if (req.file != undefined) newCourse.banner = req.file.filename;
        else newCourse.banner = null;
        newCourse.save().then(course => {
          res.json(course);
        });
      }
    });
  }
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
    Course.findOne({ _id: req.body.courseId }).then(course => {
      const { errors, isValid } = validateCourseInput(req.body);

      if (!isValid) {
        if (req.file != undefined)
          fs.unlinkSync("public/course/" + req.file.filename);
        return res.status(400).json(errors);
      }

      if (err) {
        return res.status(400).json({
          banner: err //////  this will handle image validation error
        });
      }

      if (course) {
        var old_banner = course.banner;
        course.name = req.body.name;
        course.category_id = req.body.category;
        course.description = req.body.description;
        if (req.file != undefined) {
          course.banner = req.file.filename;
        }
        course
          .save()
          .then(course => {
            if (old_banner && old_banner != course.banner)
              fs.unlinkSync("public/course/" + old_banner);
            res.json(course);
          })
          .catch(error => {
            if ((error.code = 11000))
            if (req.file != undefined)
              fs.unlinkSync("public/course/" + req.file.filename);
              return res.status(400).json({
                name: "This Course already exists"
              });
          });
      } else {
        if (req.file != undefined)
          fs.unlinkSync("public/course/" + req.file.filename);
        return res.status(400).json({
          name: "Course not found!"
        });
      }
    });
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id }).then(course => {
      if (course) {
        if (course.banner)
          fs.unlinkSync("public/course/" + course.banner);
        course.remove();
        res.json({ success: true });
      }
    });
  }
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Course.findOne({ _id: req.params.id }).populate("category_id", "name")
    .exec(function(err, course) {
      if (course && course.banner)
        course.banner = config.IMAGE_COURSE_URL+ course.banner;
      res.json(course);
    });
  }
);

module.exports = router;
