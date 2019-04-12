// enrolled.js

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateEnrolledInput(data) {
    let errors = {};
    data.user_id = !isEmpty(data.user_id) ? data.user_id : '';
    data.course_id = !isEmpty(data.course_id) ? data.course_id : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.start_at = !isEmpty(data.start_at) ? data.start_at : '';
    data.expired_at = !isEmpty(data.expired_at) ? data.expired_at : '';

    if(Validator.isEmpty(data.user_id)) {
        errors.user_id = 'Email is required';
    }
    if(Validator.isEmpty(data.course_id)) {
        errors.course_id = 'Course is required';
    }
    if(Validator.isEmpty(data.price)) {
        errors.price = 'Price is required';
    }
    if(Validator.isEmpty(data.start_at)) {
        errors.start_at = 'Start date is required';
    }
    if(Validator.isEmpty(data.expired_at)) {
        errors.expired_at = 'Expired date is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
