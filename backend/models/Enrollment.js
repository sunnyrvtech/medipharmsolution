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
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model("enrollments", EnrollmentSchema);

module.exports = Enrollment;
