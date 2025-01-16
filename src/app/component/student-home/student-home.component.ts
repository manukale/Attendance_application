import { Component } from '@angular/core';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";

@Component({
  selector: 'app-student-home',
  standalone:true,
  imports: [NavbarStudentComponent],
  templateUrl: './student-home.component.html',
  styleUrl: './student-home.component.css'
})
export class StudentHomeComponent {

}
