// Quiz.js

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuizSchema = new Schema({

  name: {
    type: String,
    required: true
  },
  module_id: {
    type: Schema.Types.ObjectId,
    ref: 'course_modules',
    required: true
  },
  options: {
    option1: { type: String,required: true },
    option2: { type: String,required: true },
    option3: { type: String,required: true },
    option4: { type: String,required: true }
   },
  answer: {
    type: String,
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

const Quiz = mongoose.model("quizes", QuizSchema);

module.exports = Quiz;
