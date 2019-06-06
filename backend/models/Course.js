// Course.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const CourseModule = require('./CourseModule');
const Enrolled = require('./Enrolled');
const Enrollment = require('./Enrollment');
const Quiz = require('./Quiz');
const QuizDetail = require('./QuizDetail');

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    },
    description: {
        type: String,
        required: true
    },
    banner: {
      type: String
    },
    video: {
      type: String
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

CourseSchema.pre('remove', async function(next){
     // CourseModule.update({ course_id: this._id },{ $set: { course_id: null }},{multi:true}).exec();
    let course_modules = await CourseModule.find({course_id: this._id},{_id:1}).exec();
    let module_ids = course_modules.map(ele => ele._id);
    Quiz.deleteMany({module_id: { $in: module_ids}}).exec();
    CourseModule.deleteMany({course_id: this._id}).exec();
    Enrolled.deleteMany({course_id: this._id}).exec();
    Enrollment.deleteMany({course_id: this._id}).exec();
    QuizDetail.deleteMany({course_id: this._id}).exec();
    next();
});
CourseSchema.plugin(URLSlugs('name', {update: 'slug'}));
const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;
