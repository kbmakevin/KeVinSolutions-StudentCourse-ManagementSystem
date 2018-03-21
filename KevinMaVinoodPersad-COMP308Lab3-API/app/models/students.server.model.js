/**
 * 
 * @file        students.server.model.js
 * @description this model describes student information (student number, password, first name, last name, address, city, phone number, email, program)
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

const mongoose = require('mongoose');

// create a model class
let studentsSchema = mongoose.Schema({
    studentNumber: Number,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    email: String,
    program: String
});

module.exports = mongoose.model('students', studentsSchema);