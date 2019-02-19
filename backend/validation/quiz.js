// quiz.js

const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateQuizInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.option1 = !isEmpty(data.option1) ? data.option1 : '';
    data.option2 = !isEmpty(data.option2) ? data.option2 : '';
    data.option3 = !isEmpty(data.option3) ? data.option3 : '';
    data.option4 = !isEmpty(data.option4) ? data.option4 : '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if(Validator.isEmpty(data.option1)) {
        errors.option1 = 'Option1 is required';
    }
    if(Validator.isEmpty(data.option2)) {
        errors.option2 = 'Option2 is required';
    }
    if(Validator.isEmpty(data.option3)) {
        errors.option3 = 'Option3 is required';
    }
    if(Validator.isEmpty(data.option4)) {
        errors.option4 = 'Option4 is required';
    }else if(Validator.isEmpty(data.answer)) {
        errors.option4 = 'Please select answer';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
