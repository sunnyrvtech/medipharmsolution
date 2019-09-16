// static_page.js

const Validator = require('validator');
const isEmpty = require('../is-empty');

module.exports = function validateStaticPageInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.content = !isEmpty(data.content) ? data.content : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if(Validator.isEmpty(data.content)) {
        errors.content = 'Content is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
