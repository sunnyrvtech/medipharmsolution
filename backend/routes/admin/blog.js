// blog.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");
const config = require('../../config');
const fs = require("fs");
const validateBlogInput = require("../../validation/admin/blog");

const Blog = require("../../models/Blog");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/blog");
  },
  filename: (req, file, cb) => {
    let fileExtension = file.originalname.split('.')[1];
    let random_string = Math.random().toString(36).substring(7);
    cb(null, Date.now()+random_string+'.'+fileExtension);
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
}).single("banner");


router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
     Blog.find({}).then(blogs => {
        var result = [];
        blogs.forEach(function(element, i) {
          result.push({
            _id: element._id,
            id: i + 1,
            name: element.name,
            description: element.description
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
    upload(req, res, err => {
    const { errors, isValid } = validateBlogInput(req.body);

    if (!isValid) {
      if (req.file != undefined)
        fs.unlinkSync("public/blog/" + req.file.filename);
      return res.status(400).json(errors);
    }
    if (err) {
      return res.status(400).json({
        banner: err //////  this will handle image validation error
      });
    } else {
    Blog.findOne({
      name: req.body.name
    }).then(blog => {
      if (blog) {
        if (req.file != undefined)
          fs.unlinkSync("public/blog/" + req.file.filename);
        return res.status(400).json({
          name: "This Blog already exists"
        });
      } else {
        const newBlog = new Blog();
        newBlog.name = req.body.name;
        newBlog.description = req.body.description;
        if (req.file != undefined) newBlog.banner = req.file.filename;
        else newBlog.banner = null;
        newBlog.save().then(blog => {
          res.json(blog);
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
    upload(req, res, err => {
    Blog.findOne({ _id: req.body.blogId }).then(blog => {
      const { errors, isValid } = validateBlogInput(req.body);

      if (!isValid) {
        if (req.file != undefined)
          fs.unlinkSync("public/blog/" + req.file.filename);
        return res.status(400).json(errors);
      }

      if (err) {
        return res.status(400).json({
          banner: err //////  this will handle image validation error
        });
      }

      if (blog) {
        var old_banner = blog.banner;
        blog.name = req.body.name;
        blog.description = req.body.description;
        if (req.file != undefined) {
          blog.banner = req.file.filename;
        }
        blog
          .save()
          .then(blog => {
            if (old_banner && old_banner != blog.banner)
              fs.unlinkSync("public/blog/" + old_banner);
            res.json(blog);
          })
          .catch(error => {
            if ((error.code = 11000))
            if (req.file != undefined)
              fs.unlinkSync("public/blog/" + req.file.filename);
              return res.status(400).json({
                name: "This Blog already exists"
              });
          });
      } else {
        if (req.file != undefined)
          fs.unlinkSync("public/blog/" + req.file.filename);
        return res.status(400).json({
          name: "Blog not found!"
        });
      }
    });
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findOne({ _id: req.params.id }).then(blog => {
      if (blog) {
        if (blog.banner)
          fs.unlinkSync("public/blog/" + blog.banner);
        blog.remove();
        res.json({ success: true });
      }
    });
  }
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Blog.findOne({ _id: req.params.id }).then(blog => {
      if (blog.banner)
        blog.banner = config.BLOG_IMAGE_URL+ blog.banner;
      res.json(blog);
    });
  }
);

module.exports = router;
