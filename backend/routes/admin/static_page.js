// static_pages.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const validateStaticPageInput = require("../../validation/admin/static_page");

const StaticPage = require("../../models/StaticPage");


router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StaticPage.find().then(pages => {
    var result =[];
      pages.forEach(function(element,i) {
        result.push({ _id: element._id,id: i+1,name: element.name,slug: element.slug,content: element.content});
      });
     res.json(result)
  });
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStaticPageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    var newPage = new StaticPage();
    newPage.name = req.body.name;
    newPage.content = req.body.content;
    newPage.save(function(err, page) {
      res.json(page);
    });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StaticPage.findOne({ _id: req.body.pageId }).then(page => {
      const { errors, isValid } = validateStaticPageInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      if (page) {
      page.name = req.body.name;
      page.content = req.body.content;
      page.save().then(page => {
        res.json(page);
      });
      } else {
        return res.status(400).json({
          name: "Page not found!"
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StaticPage.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id) }).then(
      result => {
        res.json(result);
      }
    );
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StaticPage.findOne({ _id: req.params.id }).then(page => {
      res.json(page);
    });
  }
);
router.get(
  "/content/:slug",
  function(req, res) {
    StaticPage.findOne({ slug: req.params.slug }).then(page => {
      res.json(page);
    });
  }
);

module.exports = router;
