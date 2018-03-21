import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { StudentsComponent } from './students.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { StudentsService } from './students.service';

const studentRoutes: Routes = [
  {
    path: 'students',
    component: StudentsComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'create', component: CreateComponent },
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(studentRoutes),
  ],
  declarations: [CreateComponent, StudentsComponent, ListComponent],
  providers: [StudentsService]
})
export class StudentsModule { }
