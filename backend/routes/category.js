// category.js

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");
const Category = require("../models/Category");


router.get("/",function(req, res){
    Category.find().then(categories => {
      res.json(categories);
    });
  }
);

module.exports = router;
