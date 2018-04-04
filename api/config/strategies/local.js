// 2018.03.27 - 00:18:13 - add passport-local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('../../app/models/students.server.model');

// register the strategy
passport.use(new LocalStrategy(
    // 2018.03.27 - 10:26:52 - added local strategy options
    // this is what passport is looking for when doing passport.authenticate method
    {
        usernameField: 'studentNumber',
        passwordField: 'password'
    },
    function (studentNumber, password, done) {
        // find a student with that studentNumber and authenticate it
        Student.findOne({ studentNumber: studentNumber }, (err, student) => {
            if (err) {
                return done(err); //done is a Passport function
            }
            if (!student) {
                return done(null, false, { message: 'Unknown student' });
            }
            if (!student.authenticate(password)) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, student);//student is authenticated
        })
    }))

module.exports = passport;