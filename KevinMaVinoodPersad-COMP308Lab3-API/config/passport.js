// 2018.03.27 - 00:31:09
const passport = require('passport');
const mongoost = require('mongoose');
// handling student serialization
const Student = require('../app/models/students.server.model');
// authenticated student must be serialized to the session
passport.serializeUser(function (student, done) {
    done(null, student.studentNumber);
});
// deserialize when requests are made
passport.deserializeUser(function (studentNumber, done) {
    Student.findOne({ studentNumber: studentNumber }, '-passport -salt', function (err, user) {
        done(err, user);
    });
});

// include the local strategy config file
require('./strategies/local');