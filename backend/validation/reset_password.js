// reset_password.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetPasswordInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }else if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }else if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 to 30 chars';
    }
    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }else if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
