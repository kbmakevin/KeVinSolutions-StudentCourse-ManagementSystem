import { Student } from './student';

export interface Course {
    _id?: String;
    courseCode: String;
    courseName: String;
    section: Number;
    semester: Number;
    students?: Student[];
}
