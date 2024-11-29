const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmailValidationSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    OTP: {
        type: String,
        required: true
    },
    expiry: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('emailValidation', EmailValidationSchema); // Creating Model from schema and exporting it, arguments are (model name , Schema name )

