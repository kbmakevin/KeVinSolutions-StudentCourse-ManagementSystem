import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ListCoursesComponent } from './list/listcourses.component';
import { CreateCourseComponent } from './create/createcourse.component';
import { CoursesService } from './courses.service';
import { routing } from '../app.routing';
import { CourseDetailComponent } from './details/coursedetail.component';
import { UpdateCourseComponent } from './update-course/update-course.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        CoursesComponent,
        ListCoursesComponent,
        CreateCourseComponent,
        CourseDetailComponent,
        UpdateCourseComponent,
    ],
    providers: [CoursesService]
})
export class CoursesModule { }
