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
const studentsController = require("../controllers/students.server.controller");

router.post('/', (req, res, next) => {
    studentsController.Create(req, res, next);
});

router.get('/', (req, res, next) => {
    studentsController.GetStudents(req, res, next);
});

router.get('/:id', (req, res, next) => {
    studentsController.GetStudentDetails(req, res, next);
})


module.exports = router;
