// register.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.first_name = !isEmpty(data.first_name) ? data.first_name : '';
    data.last_name = !isEmpty(data.last_name) ? data.last_name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

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
