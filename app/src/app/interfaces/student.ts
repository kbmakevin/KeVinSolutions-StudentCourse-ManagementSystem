import { Course } from './course';

export interface Student {
    _id?: String;
    studentNumber: Number;
    password: String;
    firstName: String;
    lastName: String;
    address: String;
    city: String;
    phoneNumber: String;
    email: String;
    program: String;
    role?: String;
    courses: Course[];
}
