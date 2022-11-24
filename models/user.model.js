const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        required: 'Please enter your first name.'
    },
    last_name: {
        type: String,
        required: 'Please enter your last name.'
    },
    email: {
        type: String,
        required: 'Please enter your email address.'
    },
    phone: {
        type: String,
        required: 'Please enter your Phone number.'
    },
    company: {
        type: String
    },
    street_one: {
        type: String,
        required: 'Please enter your street address'
    },
    street_two: {
        type: String
    },
    city: {
        type: String,
        required: 'Please enter your city'
    },
    state: {
        type: String,
        required: 'Please enter your state'
    },
    post_code: {
        type: String,
        required: 'Please enter your post code'
    },
    country: {
        type: String,
        required: 'Please enter your country'
    },
    tax_id: {
        type: String
    },
    password: {
        type: String,
        required: 'Please enter your password'
    }
});

let UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
