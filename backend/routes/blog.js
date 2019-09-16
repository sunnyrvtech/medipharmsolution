// blog.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("../config");

const Blog = require("../models/Blog");


router.get(
  "/",function(req, res) {
     Blog.find({}).then(blogs => {
        res.json({
          BLOG_IMAGE_URL: config.BLOG_IMAGE_URL,
          blogs: blogs
        });
      });
  }
);
router.get("/:slug", function(req, res) {
      Blog.findOne({ slug: req.params.slug }).then(blog => {
        if (blog.banner)
        blog.banner = config.BLOG_IMAGE_URL+ blog.banner;
        else
        blog.banner = config.BLOG_IMAGE_URL+ "default.jpg";
      res.json(blog);
      }).catch(err => {
        res.json(null);
      });
  });


module.exports = router;
