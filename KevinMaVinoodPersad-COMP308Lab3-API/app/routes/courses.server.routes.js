/**
 * 
 * @file        students.server.routes.js
 * @description defines the routes for the students entity
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

router.post('/', (req, res, next) => {
    coursesController.CreateCourse(req, res, next);
});

router.get('/', (req, res, next) => {
    coursesController.GetCourses(req, res, next);
});

router.get('/delete/:code', (req, res, next) => {
    coursesController.DeleteCourse(req, res, next);
});

router.get('/:id', (req, res, next) => {
    coursesController.GetOneCourse(req, res, next);
});


module.exports = router;