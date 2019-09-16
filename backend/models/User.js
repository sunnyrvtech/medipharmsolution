// User.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: Number,
    default: 2
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  verify_token: {
    type: String
  },
  reset_token: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  user_image: {
    type: String,
    default: null
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

const User = mongoose.model("users", UserSchema);

module.exports = User;
