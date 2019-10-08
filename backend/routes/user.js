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
const validateContactUsInput = require("../validation/contact_us");
const contactUsNotification = require("../notification/contact_us");
const nodemailer = require("../mailer");
const User = require("../models/User");
var request = require('superagent');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/user");
  },
  filename: (req, file, cb) => {
    let fileExtension = file.originalname.substring(
      file.originalname.lastIndexOf("."),
      file.originalname.length
    );
    let random_string = Math.random()
      .toString(36)
      .substring(7);
    cb(null, Date.now() + random_string + fileExtension);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
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
          user_image: err.message //////  this will handle image validation error
        });
      }
      User.findOne({ _id: req.user.id }).then(user => {
        if (user) {
          var old_user_image = user.user_image;
          user.first_name = req.body.first_name;
          user.last_name = req.body.last_name;
          user.phone_number = req.body.phone_number;
          if (req.file != undefined) {
            user.user_image = req.file.filename;
          }
          user.save().then(user => {
            //var user= user.toObject();
            //delete user.role;
            if (old_user_image && old_user_image != user.user_image)
              fs.unlinkSync("public/user/" + old_user_image);

            if (user.user_image) {
              var user_image = config.USER_IMAGE_URL + user.user_image;
            } else {
              var user_image = config.USER_IMAGE_URL + "default.png";
            }
            const payload = {
              id: user.id,
              role: user.role,
              first_name: user.first_name,
              last_name: user.last_name,
              phone_number: user.phone_number,
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
router.post("/contact-us", function(req, res) {
  const { errors, isValid } = validateContactUsInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  var noti_data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    message: req.body.message
  };
  var { html } = contactUsNotification(noti_data);
  nodemailer.mailOptions.to = process.env.MAIL_FROM_ADDRESS;
  nodemailer.mailOptions.subject = "Medipharm Solutions-Contact Us!";
  nodemailer.mailOptions.html = html;
  nodemailer.transporter.sendMail(nodemailer.mailOptions, function(
    error,
    info
  ) {
    if (!error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.json(noti_data);
});
router.post("/subscribe", function(req, res) {
  if(req.body.email == ''){
    return res.status(400).json({
      message: "email is required!"
    });
  }
  request
    .post(
      "https://" +
        process.env.MAIL_CHIMP_INSTANCE +
        ".api.mailchimp.com/3.0/lists/" +
        process.env.MAIL_CHIMP_LIST_UNIQUE_ID +
        "/members/"
    )
    .set("Content-Type", "application/json;charset=utf-8")
    .set(
      "Authorization",
      "Basic " +
        new Buffer("any:" + process.env.MAIL_CHIMP_API_KEY).toString("base64")
    )
    .send({
      email_address: req.body.email,
      status: "subscribed"
    })
    .end(function(err, response) {
      if (
        response.status < 300 ||
        (response.status === 400 && response.body.title === "Member Exists")
      ) {
        res.send({ message: "Successfully subscribed!" });
      } else {
        return res.status(400).json({
          message: response.body.detail
        });
      }
    });
});
module.exports = router;
