import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule, HttpClientModule, NavbarTeacherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  student: any[] = [];
  user :any={
    userName:'',
    role:'',
    dept:''
  }
    constructor(private router: Router, private userService: UserDataService, private route : ActivatedRoute , private loginService: LoginService) { }
  
    ngOnInit(){
      // console.log('manasi');
      this.route.params.subscribe((p) => {
        // console.log(p['id']);
      });
      
      this.route.queryParamMap.subscribe((ele) => {
        // console.log(ele.get('name'));
        this.user.userName = ele.get('name')
        this.user.role = ele.get('role')
        this.user.dept = ele.get('dept')
        
      });
      
  
      // console.log(this.student,'***');
  
      this.showStudent()
    }
  
    signOut() {
      this.loginService.userLogOut()
      this.router.navigate(['/'],{})    
    }
  
  
    showStudent() {
      this.student = []
      this.userService.fetchUserData('user').subscribe((res) => {
        // console.log(res);   
        for (let i = 0; i < res.length; i++) {
          if (res[i].role === 'Student' && res[i].dept === this.user.dept) {
            this.student.push(res[i])
          }        
        }
        // console.log('student:',this.student);
      });
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
