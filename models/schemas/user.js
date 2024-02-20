const { Schema } = require('mongoose');

const UserSchema = new Schema ({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    pwd: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
    },
    address: {
        type: String,
    },
    phoneNum: {
        type: String,
        required: true,
    },
    useYn: {
        type: Number,
        required: true,
        default: 1,
    },
    regDate: {
        type: Date,
        required: true,
        // utc + 9 hours, 한국 현재 시간
        default: () => Date.now() + 9*60*60*1000,
    },
    oauth: {
        type: String,
    }
})

module.exports = UserSchema;