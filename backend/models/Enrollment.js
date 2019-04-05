// Enrollment.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({

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
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model("enrollments", EnrollmentSchema);

module.exports = Enrollment;
