const { Schema } = require('mongoose');
// const moment = require('moment');
// let now = new Date();

const UserSchema = new Schema ({
    id: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    zip_code: {
        type: String,
    },
    address: {
        type: String,
    },
    phone_num: {
        type: String,
        required: true,
    },
    use_yn: {
        type: Number,
        required: true,
        default: 1,
    },
    reg_date: {
        type: Date,
        required: true,
        // default: Date.now().addHours(9),
    },
    oauth: {
        type: String,
    }
})

module.exports = UserSchema;