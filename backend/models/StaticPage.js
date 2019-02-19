// StaticPage.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StaticPageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
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
