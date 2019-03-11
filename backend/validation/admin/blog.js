// blog.js

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateBlogInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Blog is required';
    }
    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
