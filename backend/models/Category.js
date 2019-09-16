// Category.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const Course = require('./Course');

const CategorySchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String
  },
  banner_slides: {
    type: Schema.Types.Mixed
  },
  video: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date
  }
});

CategorySchema.pre('remove', function(next){
  Course.update({ category_id: this._id },{ $set: { category_id: null }},{multi:true}).exec();
    next();
});
CategorySchema.plugin(URLSlugs('name', {update: 'slug'}));
const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;
