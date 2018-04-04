/**
 * 
 * @file        courses.server.routes.js
 * @description defines the routes for the courses entity
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// student object created from the Schema / model
const Student = require('../models/students.server.model');
const Course = require('../models/courses.server.model');
const coursesController = require("../controllers/courses.server.controller");

router.route('/')
    .get((req, res, next) => coursesController.GetCourses(req, res, next))
    .post((req, res, next) => coursesController.CreateCourse(req, res, next));


// router.post('/', (req, res, next) => {
//     coursesController.CreateCourse(req, res, next);
// });

// router.get('/', (req, res, next) => {
//     coursesController.GetCourses(req, res, next);
// });

router.route('/:id')
    .get((req, res, next) => coursesController.GetOneCourse(req, res, next))
    .put((req, res, next) => coursesController.UpdateCourse(req, res, next))
    .delete((req, res, next) => coursesController.DeleteCourse(req, res, next));

// 2018.04.01 - 16:45:53
router.route('/getAvailable/:studentId')
    .get((req, res, next) => coursesController.GetAvailableCourses(req, res, next));

// 2018.04.01 - 16:13:02
router.route('/getEnrolled/:studentId')
    .get((req, res, next) => coursesController.GetEnrolledCourses(req, res, next));

// 2018.04.03 - 18:10:49
router.route('/getNotEnrolledStudents/:courseId')
    .get((req, res, next) => coursesController.GetNotEnrolledStudents(req, res, next));

// router.get('/delete/:code', (req, res, next) => {
//     coursesController.DeleteCourse(req, res, next);
// });

// router.get('/:id', (req, res, next) => {
//     coursesController.GetOneCourse(req, res, next);
// });

// router.post('/removestudent', (req, res, next) => {
//     coursesController.RemoveStudentFromCourse(req, res, next);
// });

// router.post('/updatecourse', (req, res, next) => {
//     coursesController.UpdateCourse(req, res, next);
// });


module.exports = router;