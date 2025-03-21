const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ['API Consumer', 'API Provider'],
        required: true
    },
    termsAccepted: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true,
    collection: 'Users',
});

module.exports = mongoose.model('User', userSchema);