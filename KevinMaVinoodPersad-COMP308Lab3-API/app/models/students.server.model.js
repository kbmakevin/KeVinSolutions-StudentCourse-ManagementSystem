/**
 * 
 * @file        students.server.model.js
 * @description this model describes student information (student number, password, first name, last name, address, city, phone number, email, program)
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

const mongoose = require('mongoose');
// 2018.03.27 - 00:31:56 - adapting student model for passport-local
const crypto = require('crypto');

// create a model class
const studentsSchema = mongoose.Schema({
    studentNumber: {
        type: Number,
        unique: true,
        required: 'Student Number is required'
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ]
    },
    // 2018.03.27 - 01:02:09 - roles for admin/student
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    // 2018.03.27 - 00:37:09 - to hash the password
    salt: String,
    // // 2018.03.27 - 00:38:17 - strategy used to register the student
    provider: {
        type: String,
        required: 'Provider is required',
        default: 'local'
    },
    // // 2018.03.27 - 00:38:41 - student identifier for the authentication strategy
    // providerId: String,
    // // 2018.03.27 - 00:38:59 - to store the student object retrieved from OAuth providers
    // providerData: {},
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
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

// 2018.03.27 - 00:40:30
// pre-save middleware to handle the hashing of your students' passwords
studentsSchema.pre('save', function (next) {
    console.log('inside pre save');
    console.log(`password: ${this.password}`);

    if (this.password) {
        // creates an autogenerated pseudo-random hashing salt
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);//returns hashed password
    }
    next();

    console.log(`hashed password: ${this.password}`);

});

// 2018.03.31 - 17:25:40 - when updating students, pre-save doesnt hash pw
studentsSchema.pre('findOneAndUpdate', function (next) {
    console.log('inside pre findOneAndUpdate');
    console.log(`password: ${password}`);

    if (this.password) {
        // creates an autogenerated pseudo-random hashing salt
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);//returns hashed password
    }

    console.log(`hashed password: ${this.password}`);

    next();
});

// 2018.03.27 - 00:43:32
// replaces the current student password with a hashed password (more secure)
studentsSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
};

// 2018.03.27 - 00:44:44
// authenticates the password
studentsSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
}

module.exports = mongoose.model('Students', studentsSchema);