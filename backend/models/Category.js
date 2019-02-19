// Category.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Course = require('./Course');

const CategorySchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: true
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

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;