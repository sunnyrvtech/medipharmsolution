// register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCourseInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Course is required';
    }
    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description is required';
    }
    if(Validator.isEmpty(data.category)) {
        errors.category = 'Category is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
