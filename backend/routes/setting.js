// setting.js

const express = require("express");
const router = express.Router();

const Setting = require("../models/Setting");

router.get(
  "/:slug",function(req, res){
    Setting.findOne({ slug: req.params.slug }).then(setting => {
      res.json(setting);
    });
  }
);

module.exports = router;
