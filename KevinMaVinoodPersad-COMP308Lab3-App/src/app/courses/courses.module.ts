import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { ListCoursesComponent } from './list/listcourses.component';
import { CoursesService } from './courses.service';


const studentRoutes: Routes = [
    {
      path: 'courses',
      component: CoursesComponent,
      children: [
        { path: '', component: ListCoursesComponent },
      ]
    }
  
  ];

  @NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(studentRoutes),
    ],
    declarations: [CoursesComponent, ListCoursesComponent],
    providers: [CoursesService]
  })
  export class CoursesModule { }