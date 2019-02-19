// Course.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CourseModule = require('./CourseModule');

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
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

CourseSchema.pre('remove', function(next){
    CourseModule.deleteMany({course_id: this._id}).exec();
    next();
});

const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;