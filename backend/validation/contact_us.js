// contact_us.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateContactUsInput(data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.last_name) ? data.email : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
    data.message = !isEmpty(data.message) ? data.message : '';

    if(Validator.isEmpty(data.first_name)) {
        errors.first_name = 'First name is required';
    }else if(!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
        errors.first_name = 'First name must be between 2 to 30 chars';
    }
    if(Validator.isEmpty(data.last_name)) {
        errors.last_name = 'Last name is required';
    }else if(!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
        errors.last_name = 'Last name must be between 2 to 30 chars';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }else if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Phone number is required';
    }
    if(Validator.isEmpty(data.message)) {
        errors.message = 'Message is required';
    }else if(!Validator.isLength(data.message, { min: 2, max: 500 })) {
        errors.message = 'Message must be between 2 to 500 chars';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
