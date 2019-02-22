// Course.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');
const CourseModule = require('./CourseModule');

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
     CourseModule.update({ course_id: this._id },{ $set: { course_id: null }},{multi:true}).exec();
    // CourseModule.deleteMany({course_id: this._id}).exec();
    next();
});
CourseSchema.plugin(URLSlugs('name', {update: 'slug'}));
const Course = mongoose.model('courses', CourseSchema);

module.exports = Course;
