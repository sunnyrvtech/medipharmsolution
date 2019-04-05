// enrollment.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Enrollment = require("../../models/Enrollment");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrollment.find().populate("user_id course_id", "email name")
      .exec(function(err, enrollment) {
      var result = [];
      enrollment.forEach(function(element, i) {
        result.push({
          _id: element._id,
          id: i + 1,
          course_name: element.course_id.name,
          first_name: element.first_name,
          last_name: element.last_name,
          phone_number: element.phone_number,
          email: element.user_id.email,
          message: element.message
        });
      });
      res.json(result);
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Enrollment.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      result => {
        res.json(result);
      }
    );
  }
);

module.exports = router;
