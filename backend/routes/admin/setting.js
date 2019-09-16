// setting.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Setting = require("../../models/Setting");
const moment = require('moment');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Setting.find().then(settings => {
    var result =[];
      settings.forEach(function(element,i) {
        result.push({ _id: element._id,id: i+1,name: element.slug,updated_at: moment(element.updated_at).format('YYYY-MM-DD hh:mm A') });
      });
     res.json(result)
});
});
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var newSetting = new Setting();
    newSetting.slug = req.body.slug;
    newSetting.content = req.body.content;
    newSetting.save(function(err, setting) {
      console.log(err);
      res.json(setting);
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Setting.findOne({ slug: req.body.slug }).then(setting => {
      if (setting) {
      setting.content = req.body.content;
      setting.save().then(setting => {
        res.json(setting);
      });
      } else {
        return res.status(400).json({
          name: "Setting not found!"
        });
      }
    });
  }
);

router.get(
  "/:slug",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Setting.findOne({ slug: req.params.slug }).then(setting => {
      res.json(setting);
    });
  }
);

module.exports = router;
