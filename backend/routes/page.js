// page.js

const express = require("express");
const router = express.Router();

const StaticPage = require("../models/StaticPage");

router.get(
  "/content/:slug",
  function(req, res) {
    StaticPage.findOne({ slug: req.params.slug }).then(page => {
      res.json(page);
    });
  }
);

module.exports = router;
