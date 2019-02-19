// CourseModule.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseModuleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    content: {
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
    }
});

const CourseModule = mongoose.model('course_modules', CourseModuleSchema);

module.exports = CourseModule;