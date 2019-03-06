// user.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const config = require("../config");
const fs = require("fs");
const Validation = require("../validation/user");
const User = require("../models/User");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/user");
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
}).single("user_image");

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    upload(req, res, err => {
      const { errors, isValid } = Validation.validateUserInput(req.body);
      if (!isValid) {
        if (req.file != undefined)
          fs.unlinkSync("public/user/" + req.file.filename);
        return res.status(400).json(errors);
      }

      if (err) {
        return res.status(400).json({
          user_image: err //////  this will handle image validation error
        });
      }
      User.findOne({ _id: req.user.id }).then(user => {
        if (user) {
          var old_user_image = user.user_image;
          user.first_name = req.body.first_name;
          user.last_name = req.body.last_name;
          if (req.file != undefined) {
            user.user_image = req.file.filename;
          }
          user.save().then(user => {
            //var user= user.toObject();
            //delete user.role;
            if (old_user_image && old_user_image != user.user_image)
              fs.unlinkSync("public/user/" + old_user_image);

            if (user.user_image) {
              var user_image = config.USET_IMAGE_URL + user.user_image;
            } else {
              var user_image = config.USET_IMAGE_URL + "default.png";
            }
            const payload = {
              id: user.id,
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name,
              user_image: user_image
            };
            jwt.sign(
              payload,
              "secret",
              {
                expiresIn: 3600
              },
              (err, token) => {
                if (err) console.error("There is some error in token", err);
                else {
                  res.json({
                    success: true,
                    token: `Bearer ${token}`
                  });
                }
              }
            );
          });
        } else {
          if (req.file != undefined)
            fs.unlinkSync("public/user/" + req.file.filename);
          return res.status(400).json({
            first_name: "User not found!"
          });
        }
      });
    });
  }
);

router.post(
  "/password/change",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = Validation.validatePasswordChangeInput(
      req.body
    );
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ _id: req.user.id }).then(user => {
      if (user) {
        bcrypt
          .compare(req.body.current_password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              errors.current_password = "Incorrect current password";
              return res.status(400).json(errors);
            }
          });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                user.password = hash;
                user.save().then(user => {
                  res.json({ success: true });
                });
              }
            });
          }
        });
      } else {
        return res.status(400).json({
          current_password: "User not found!"
        });
      }
    });
  }
);
module.exports = router;
