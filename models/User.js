const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    googleId: { type: String } // Add this line for Google OAuth
});

module.exports = mongoose.model('User', UserSchema);
