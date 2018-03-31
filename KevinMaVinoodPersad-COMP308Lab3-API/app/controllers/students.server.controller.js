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
const passport = require('passport');

// STUDENT CRUD FUNCTIONS =======================================================
module.exports.Create = function (req, res, next) {
    let student = Student(req.body);
    student.provider = 'local';
    console.log('CREATED new student:');
    console.log(student);

    student.save(err => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(student);
        }
    })
}

module.exports.GetStudents = function (req, res, next) {

    Student.find(
        {
            // don't show the existence of admin user to public!
            studentNumber: { $ne: 1 }
        },
        // 2018.03.27 - 09:56:39 - dont show password or salt!
        '-password -salt',
        (err, students) => {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(students);
            }
        });
}

// module.exports.GetStudentDetails = function (req, res, next) {
//     let studentNum = req.params.id;
//     console.log("inside controller " + studentNum);
//     Student.find(
//         { studentNumber: studentNum },
//         // 2018.03.27 - 09:56:39 - dont show password or salt!
//         '-password -salt',
//         (err, student) => {
//             if (err) {
//                 // console.log(err);
//                 return res.status(400).send({
//                     message: getErrorMessage(err)
//                 });
//             } else {
//                 console.log(student);
//                 res.status(200).json(student);
//             }
//         });
// }

module.exports.GetStudentDetails = function (req, res, next) {
    let id = req.params.id;
    // console.log("inside controller " + id);

    Student.findOne(
        { _id: id },
        '-password -salt',
    )
        .populate('courses')
        .exec((err, student) => {
            res.json(student);
        })
}

// Update student
module.exports.UpdateStudent = function (req, res, next) {

    // 2018.03.31 - 18:46:18 - middleware doesnt work for updates, and can't use middlware for presave since server thinks we are creating duplicate student with same studentNumber
    let id = req.params.id;

    let updatedStudent = new Student(req.body);
    updatedStudent.provider = 'local';
    updatedStudent._id = id;
    updatedStudent.salt = updatedStudent.generateSalt();
    updatedStudent.password = updatedStudent.hashPassword(updatedStudent.password);


    Student.update({ _id: id }, updatedStudent, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            res.status(200).json(updatedStudent);
        }
    });
}

// Delete student
module.exports.DeleteStudent = function (req, res, next) {
    let studentNumber = req.body.studentNumber;

    Student.remove({ studentNumber: studentNumber }, (err) => {
        if (err) {
            console.error(err);
            res.end(err);
        } else {
            res.status(200).json(studentNumber);
        }
    });
}

module.exports.EnrollInCourse = function (req, res, next) {
    // My assumption here is that we will get the student number and course code and
    // add the course to the student by finding both from database. Not sure if this is how its done.

    // let courseCode = req.body.code;
    // let course_id = req.body.id;

    // let studentId = req.body.studentId;
    // let student = new Student();
    // let course = new Course();

    // Student.find({ studentNumber: studentId }, (err, s) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: getErrorMessage(err)
    //         });
    //     } else {
    //         student = s;
    //     }
    // })

    // Course.find({ courseCode: courseCode }, (err, c) => {
    //     if (err) {
    //         return res.status(400).send({
    //             message: getErrorMessage(err)
    //         });
    //     } else {
    //         course = c;
    //     }
    // })
    let course_Id = req.body.id;
    let studentId = req.body.stdId;

    Student.findOneAndUpdate({ _id: studentId },
        { $push: { courses: course_Id } },
        { safe: true, upsert: true },
        (err, s) => {
            if (err) {
                console.log(err);
            } else {
                Course.findOneAndUpdate({ _id: course_Id },
                    { $push: { students: s._id } },
                    { safe: true, upsert: true },
                    (err, c) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(c);
                        }
                    }
                );
            }
        }
    );
}

module.exports.DropCourse = function (req, res, next) {
    let c_id = req.body.id;
    let studentId = req.body.stdNum;

    Student.findOneAndUpdate({ _id: studentId },
        { $pull: { courses: c_id } },
        { safe: true, upsert: true },
        (err, s) => {
            if (err) {
                console.log(err);
            } else {
                Course.findOneAndUpdate({ _id: c_id },
                    { $pull: { students: s._id } },
                    { safe: true, upsert: true },
                    (err, c) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(c);
                        }
                    })
            }
        }
    );
};

// enroll in a course

// AUTHENTICATION ===========================================================
// create will take care of registration/signup
// 2018.03.28 - 22:07:07 - don't need this...logout taken care of in ng app
// module.exports.Logout = function (req, res, next) {
//     // invalidate the authenticated session using a Passport method
//     req.logout();
// }

module.exports.Login = function (req, res, next) {
    // 2018.03.27 - 10:18:56
    passport.authenticate('local', (err, student, info) => {
        // res.send(JSON.stringify(info)).status(200)

        if (err || !student) {
            res.status(400).send(info);
        } else {
            // Use the Passport 'login' method to login
            req.login(student, (err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    console.log(`${student.firstName} ${student.lastName} (#${student.studentNumber}) has logged into the system...`);
                    res.json(student);
                }
            });
        }
    })(req, res, next);
}

// // 2018.03.28 - 16:41:37 - used for authentication middleware
// module.exports.RequiresLogin = function (req, res, next) {
//     // uses Passport initiated authentication method
//     if (!req.isAuthenticated()) {
//         return res.status(401).send({
//             message: 'User is not logged in'
//         });
//     }
//     // if user is signed in calls the next middleware in the chain
//     next();
// }

// // 2018.03.28 - 16:43:51 - used for authorization middleware
// module.exports.HasAuthorization = function (req, res, next) {

// }

// HELPER FUNCTIONS ===========================================================
function getErrorMessage(err) {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Student number already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        // mongoose validation error
        if (err.errors) {
            for (let errName in err.errors) {
                if (err.errors[errName].message)
                    message = err.errors[errName].message;
            }
        } else {
            message = 'Unknown server error';
        }
    }
    return message;
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
