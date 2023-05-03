const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match:  [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
          ],
    },
    password: {
        type: String,
        maxLength: 20,
        minLength: 8
    },
    donorTier: {
        type: Number
    },
    // added reference to User in Donation model
    // donations: {

    // },
    // added reference to user in Business model
    // businesses: {

    // },
})

const User = mongoose.model('User', userSchema);

module.exports = User;