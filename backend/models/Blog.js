// Blog.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const BlogSchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
  	type: String,
    required: true
  },
  banner: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

BlogSchema.plugin(URLSlugs('name', {update: 'slug'}));
const Blog = mongoose.model("blogs", BlogSchema);

module.exports = Blog;
