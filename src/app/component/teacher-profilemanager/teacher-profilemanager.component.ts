import { Component } from '@angular/core';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";


@Component({
  selector: 'app-teacher-profilemanager',
  standalone:true,
  imports: [NavbarTeacherComponent],
  templateUrl: './teacher-profilemanager.component.html',
  styleUrl: './teacher-profilemanager.component.css'
})
export class TeacherProfilemanagerComponent {

}
