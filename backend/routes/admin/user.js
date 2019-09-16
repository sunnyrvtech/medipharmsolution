// user.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const validateUserInput = require("../../validation/admin/user");
const User = require("../../models/User");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ role: { $ne: 1 } }).then(user => {
      var result = [];
      user.forEach(function(element, i) {
        var account_status = element.status == true ? "Active" : "Not Active";
        // console.log(account_status);
        result.push({
          _id: element._id,
          id: i + 1,
          email: element.email,
          first_name: element.first_name,
          last_name: element.last_name,
          status: element.status,
          account_status: account_status
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
    const { errors, isValid } = validateUserInput(req.body, "create");

    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(400).json({
          email: "Email already exists"
        });
      } else {
        const newUser = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone_number: req.body.phone_number,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                newUser.password = hash;
                newUser.status = true;
                newUser.save().then(user => {
                  res.json(user);
                });
              }
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
    User.findOne({ _id: req.body.userId }).then(user => {
      const { errors, isValid } = validateUserInput(req.body, "update");
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (user) {
        User.updateOne(
          { _id: req.body.userId },
          {
            $set: {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              phone_number: req.body.phone_number,
              status: req.body.status
            }
          }
        ).then(result => {
          res.json(result);
        });
      } else {
        return res.status(400).json({
          first_name: "User not found!"
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // User.deleteOne({_id:mongoose.Types.ObjectId(req.params.id)})
    //  .then(result => {
    //         res.json(result);
    //  });
    User.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(user => {
      user.status = user.status ? false : true;
      user.save().then(user => {
        res.json(user);
      });
    });
  }
);

router.get(
  "/courses/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.json(user);
    });
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.json(user);
    });
  }
);

module.exports = router;
