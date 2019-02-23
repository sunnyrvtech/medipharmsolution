// auth.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateResetPasswordInput = require("../validation/reset_password");
const config = require("../config");
var nodemailer = require("../mailer");
const User = require("../models/User");

router.post("/register", function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);
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
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              var verify_token = Array(20)
                .fill(0)
                .map(x =>
                  Math.random()
                    .toString(36)
                    .charAt(2)
                )
                .join("");
              newUser.verify_token = verify_token;
              newUser.password = hash;
              newUser.save().then(user => {
                nodemailer.mailOptions.to = user.email;
                nodemailer.mailOptions.subject = "Email Verification !";
                var link = config.APP_FRONT_URL + "/account/activate/" + verify_token;
                var html = "Hello " + user.first_name + "<br><br>";
                html +=
                  "Please activate your account using the following link.<br><br>";
                html += "<a href=" + link + ">" + link + "</a><br>";
                nodemailer.mailOptions.html = html;
                nodemailer.transporter.sendMail(
                  nodemailer.mailOptions,
                  function(error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log("Email sent: " + info.response);
                    }
                  }
                );
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    } else if (!user.status && user.verify_token != null) {
      errors.email =
        "Your account is not activated yet,please check activation email in your inbox and activate your account!";
      return res.status(404).json(errors);
    } else if (!user.status && user.verify_token == null) {
      errors.email =
        "Your account is deactivated by admin,please contact with administrator!";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          role: user.role,
          first_name: user.first_name,
          last_name: user.last_name
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
      } else {
        errors.password = "Incorrect Password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.post("/password/forgot", function(req, res) {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      var reset_token = Array(20)
        .fill(0)
        .map(x =>
          Math.random()
            .toString(36)
            .charAt(2)
        )
        .join("");
      User.updateOne(
        { email: req.body.email },
        { $set: { reset_token: reset_token } }
      ).then(result => {
        nodemailer.mailOptions.to = user.email;
        nodemailer.mailOptions.subject = "Password Reset From Sollers!";
        var link = config.APP_FRONT_URL + "/password/reset/" + reset_token;
        var html = "Hello " + user.first_name + "<br><br>";
        html +=
          "You have recently requested for a password reset on your account.<br>";
        html +=
          "You will need to confirm this request by clicking on the following link to reset your password:<br>";
        html += "<a href=" + link + ">Reset Password Here</a><br>";
        nodemailer.mailOptions.html = html;
        nodemailer.transporter.sendMail(nodemailer.mailOptions, function(
          error,
          info
        ) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json({
          message: "A password link has been sent to your email address!"
        });
      });
    } else {
      return res.status(400).json({
        email: "User not found!"
      });
    }
  });
});

router.post("/password/reset", function(req, res) {
  const { errors, isValid } = validateResetPasswordInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    email: req.body.email,
    reset_token: req.body.reset_token
  }).then(user => {
    if (user) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              user.password = hash;
              user.reset_token = null;
              user.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    } else {
      return res.status(400).json({
        email: "User not found!"
      });
    }
  });
});

router.get("/account/activate/:verify_link", function(req, res) {
  User.findOne({ verify_token: req.params.verify_link }).then(user => {
    if (user) {
      User.updateOne(
        { verify_token: req.params.verify_link },
        { $set: { status: true, verify_token: null } }
      ).then(result => {
        res.json(user);
      });
    } else {
      return res.status(400).json({
        message: "Your account is already activated. You may now sign in!"
      });
    }
  });
});

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
