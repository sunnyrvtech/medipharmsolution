// register.js

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateCourseModuleInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    data.content = !isEmpty(data.content) ? data.content : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if(Validator.isEmpty(data.course_id)) {
        errors.course_id = 'Course is required';
    }
    if(Validator.isEmpty(data.content)) {
        errors.content = 'Content field is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
