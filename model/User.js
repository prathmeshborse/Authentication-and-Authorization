const mongoose = require('mongoose');

exports.UserSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'student', 'visitor'], default: 'visitior'},
}); 