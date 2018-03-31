/**
 * 
 * @file        courses.server.controller.js
 * @description this controller handles the CRUD operations for a Course Entity
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */
const mongoose = require('mongoose');

// student object created from the Schema / model
const Student = require('../models/students.server.model');
const Course = require('../models/courses.server.model');

// Course CRUD FUNCTIONS =======================================================

// Get list of courses
module.exports.GetCourses = function (req, res, next) {
    Course.find((err, courses) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(courses);
        }
    });
}

// add course
module.exports.CreateCourse = function (req, res, next) {
    let course = Course(req.body);
    console.log('somebody is trying to add a course now!');
    console.log(course);
    // next();
    course.save(err => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    })
}

module.exports.DeleteCourse = function (req, res, next) {
    let code = req.params.code;

    Course.remove({ courseCode: code }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            res.status(200).json(code);
        }
    });
}

module.exports.GetOneCourse = function (req, res, next) {
    let id = req.params.id;
    console.log("inside course controller " + id);

    Course.findOne({ _id: id })
        .populate('students')
        .exec((err, course) => {
            res.json(course);
        })
}

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

module.exports.RemoveStudentFromCourse = function (req, res, next) {
    let c_Id = req.body.cId;
    let s_Id = req.body.stdId;

    console.log(c_Id + ", " + s_Id);
    Course.findOneAndUpdate({ _id: c_Id },
        { $pull: { students: s_Id } },
        { safe: true, upsert: true },
        (err, c) => {
            if (err) {
                console.log(err);
            } else {
                Student.findOneAndUpdate({ _id: s_Id },
                    { $pull: { courses: c_Id } },
                    { safe: true, upsert: true },
                    (err, s) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(s);
                        }
                    }
                );
            }
        }
    );
};

module.exports.UpdateCourse = function (req, res, next) {

    Course.findByIdAndUpdate(req.body._id, req.body, (err, c) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            })
        } else {
            res.json(c);
        }
    })
}