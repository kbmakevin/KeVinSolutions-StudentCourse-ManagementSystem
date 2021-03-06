/**
 * 
 * @file        courses.server.model.js
 * @description this model describes course information (course code, course name, section, semester)
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

const mongoose = require('mongoose');

// create a model class
let coursesSchema = mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
    },
    courseName: String,
    section: Number,
    semester: Number,
    students: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Students'
        }
    ]
});

module.exports = mongoose.model('Courses', coursesSchema);