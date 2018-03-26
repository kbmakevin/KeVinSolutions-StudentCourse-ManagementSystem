/**
 * 
 * @file        students.server.controller.js
 * @description this controller handles the CRUD operations for a Student Model
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */
const mongoose = require('mongoose');

// student object created from the Schema / model
const Student = require('../models/students.server.model');
const Course = require('../models/courses.server.model');

// STUDENT CRUD FUNCTIONS =======================================================
// add student
module.exports.Create = function (req, res, next) {
    let student = Student(req.body);
    console.log('somebody is trying to add a student now!');
    console.log(student);
    // next();
    student.save(err => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(student);
        }
    })
}

module.exports.GetStudents = function(req, res, next) {

    Student.find((err, students) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(students);
        }
    });
}

module.exports.GetStudentDetails = function(req, res, next) {
    let studentNum = req.params.id;
    console.log("inside controller " + studentNum);
    Student.find({studentNumber:studentNum}, (err, student) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            console.log(student);
            res.status(200).json(student);
        }
    });
}

module.exports.AddCourse = function(req, res, next) {
    // My assumption here is that we will get the student number and course code and
    // add the course to the student by finding both from database. Not sure if this is how its done.

    let courseCode = req.body.code;
    let studentId = req.body.studentId;
    let student = new Student();
    let course = new Course();

    Student.find({studentNumber:studentId}, (err, s) => {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            student = s;
        }
    })

    Course.find({courseCode:courseCode}, (err, c) => {
        if(err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            course = c;
        }
    })
}

// enroll in a course

// HELPER FUNCTIONS ===========================================================
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





// module.exports.CreateNewSurvey = function (req, res, next) {
//     let newSurvey = survey({
//         "surveyId": req.body.surveyId,
//         "gameGenre": req.body.gameGenre,
//         "daysPerYear": req.body.daysPerYear,
//         "age": req.body.age
//     });

//     survey.create(newSurvey, (err, survey) => {
//         if (err) {
//             console.error(err);
//             res.end(err);
//         } else {
//             res.redirect('/surveys');
//         }
//     });
// }


// // list surveys
// module.exports.DisplaySurveysList = function (req, res, next) {
//     survey.find((err, surveys) => {
//         console.log(surveys);
//         if (err) {
//             return console.error(err);
//         } else {
//             res.render('surveys/index', {
//                 title: 'Surveys',
//                 surveys: surveys
//             });
//         }
//     });
// };

// // update surveys
// module.exports.DisplayEditPage = function (req, res, next) {
//     let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

//     survey.findById(id, (err, surveys) => {
//         if (err) {
//             console.error(err);
//             res.end(err);
//         } else {
//             // show the survey details view
//             res.render('surveys/details', {
//                 title: 'Survey Details',
//                 surveys: surveys
//             });
//         }
//     });
// }

// module.exports.UpdateSurvey = function (req, res, next) {
//     let id = req.params.id;

//     let updatedSurvey = survey({
//         "_id": id,
//         "gameGenre": req.body.gameGenre,
//         "daysPerYear": req.body.daysPerYear,
//         "age": req.body.age
//     });

//     survey.update({ _id: id }, updatedSurvey, (err) => {
//         if (err) {
//             console.error(err);
//             res.end(err);
//         } else {
//             // refresh the Surveys List
//             res.redirect('/surveys');
//         }
//     });
// }

// // delete a survey from the list
// module.exports.DeleteSurvey = function (req, res, next) {
//     let id = req.params.id;

//     survey.remove({ _id: id }, (err) => {
//         if (err) {
//             console.error(err);
//             res.end(err);
//         } else {
//             // refresh the surveys list
//             res.redirect('/surveys');
//         }
//     });
// }
