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
    program: String,
    // 2018.03.21 - 11:32:21 - "Use ref to allow a student document to make references to corresponding course documents"
    // We need to use array of dbref here since student can enroll in many courses
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Courses'
        }
    ]
});

module.exports = mongoose.model('Students', studentsSchema);