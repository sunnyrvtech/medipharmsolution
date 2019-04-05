// enrolled.js

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateEnrolledInput(data) {
    let errors = {};
    data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if(Validator.isEmpty(data.user_id)) {
        errors.user_id = 'Email is required';
    }
    if(Validator.isEmpty(data.course_id)) {
        errors.course_id = 'Course is required';
    }
    if(Validator.isEmpty(data.price)) {
        errors.price = 'Price is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
