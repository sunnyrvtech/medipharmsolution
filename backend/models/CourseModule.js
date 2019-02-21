// CourseModule.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const Quiz = require('./Quiz');

const CourseModuleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
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

CourseModuleSchema.pre('remove', function(next){
    Quiz.deleteMany({module_id: this._id}).exec();
    next();
});
CourseModuleSchema.plugin(URLSlugs('name', {update: 'slug'}));
const CourseModule = mongoose.model('course_modules', CourseModuleSchema);

module.exports = CourseModule;
