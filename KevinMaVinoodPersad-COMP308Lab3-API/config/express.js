/**
 * 
 * @file        express.js
 * @description this file initializes and configures the express application
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

// load the module dependencies----------------------------------------------------------------------------------------------

// built-in node modules

// installed node modules
const express = require('express');
const bodyParser = require('body-parser');

// custom modules
// const config = require('./config');

// define the routes
const studentRoutes = require('../app/routes/students.server.routes');
const courseRoutes = require('../app/routes/courses.server.routes');

// create a new express app
const app = express();

// configure the session middleware ------------------------------------------------------------------------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// load the routing files
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

// export the express application instance
module.exports = app;