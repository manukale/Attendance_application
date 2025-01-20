import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";

@Component({
  selector: 'app-allstudent',
  standalone:true,
  imports: [NavbarAdminComponent, CommonModule, NavbarTeacherComponent],
  templateUrl: './allstudent.component.html',
  styleUrl: './allstudent.component.css'
})
export class AllstudentComponent {
  currentUser:any
student :any[]=[]

constructor(private userService : UserDataService, private router : Router, private session : SessionStorageService){}
  ngOnInit(){
    this.currentUser=this.session.getUserData('user') 
   this.userService.fetchUserData('user').subscribe((res)=>{

      for (let i = 0; i < res.length; i++) {
        
        if(res[i].role === 'Student'){
          this.student.push(res[i])
        }
        
      }
// console.log('student:',this.student);
    })
  }

  showAttendance(data : any){
    this.router.navigate(['/attendance', data.id],{
      queryParams:{
        name : data.name
      }
    }
    )
  }

  showStudentProfile(stud : any){
    // console.log('showStudentProfile:',student);
    this.router.navigate(['/studentProfile',stud.id],{
      queryParams:{
        name : stud.name,
        dept:stud.dept,
        role:stud.role,
        // photo:stud.photo,
        email:stud.email

      }
    })
  }
}
