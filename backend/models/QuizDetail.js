// QuizDetail.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizDetailSchema = new Schema({

  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  module_id: {
    type: Schema.Types.ObjectId,
    ref: 'course_modules',
    required: true
  },
  score: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const QuizDetail = mongoose.model("quiz_details", QuizDetailSchema);

module.exports = QuizDetail;
