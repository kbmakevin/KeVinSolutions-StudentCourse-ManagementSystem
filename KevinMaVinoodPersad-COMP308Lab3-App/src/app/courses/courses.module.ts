import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ListCoursesComponent } from './list/listcourses.component';
import { CreateCourseComponent } from './create/createcourse.component';
import { CourseDetailComponent } from './details/coursedetail.component';
import { CoursesService } from './courses.service';


const coursesRoutes: Routes = [
    {
      path: 'courses',
      component: CoursesComponent,
      children: [
        { path: '', component: ListCoursesComponent },
        { path: 'create', component: CreateCourseComponent },
        { path: 'coursedetails', component: CourseDetailComponent }
      ]
    }
  
  ];

  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(coursesRoutes),
    ],
    declarations: [CoursesComponent, ListCoursesComponent, CreateCourseComponent, CourseDetailComponent],
    providers: [CoursesService]
  })
  export class CoursesModule { }