import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { StudentsComponent } from './students.component';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { StudentsService } from './students.service';
import { routing } from '../app.routing';
import { UpdateComponent } from './update/update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [CreateComponent, StudentsComponent, ListComponent, DetailsComponent, UpdateComponent],
  providers: [StudentsService]
})
export class StudentsModule { }
