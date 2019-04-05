// Enrolled.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnrolledSchema = new Schema({

  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'courses',
    required: true
  },
  price: {
    type: String,
    required: true
  }
  created_at: {
    type: Date,
    required: true
  }
  expired_at: {
    type: Date,
    required: true
  }
});

const Enrolled = mongoose.model("enrolled_users", EnrolledSchema);

module.exports = Enrolled;
