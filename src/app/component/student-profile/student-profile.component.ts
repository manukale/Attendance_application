import { Component } from '@angular/core';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-student-profile',
  standalone:true,
  imports: [NavbarTeacherComponent, CommonModule, FormsModule, NavbarAdminComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  currentUser : any
  user: any={id:'',studentName:'',email:'',role:'',dept:'',photo:''}
  constructor( private route : ActivatedRoute, private session : SessionStorageService){}

  ngOnInit(){
 this.currentUser = this.session.getUserData('user')
    this.route.params.subscribe((p) => {
      // console.log(p['id']);
      this.user.id = p['id']
    });

    this.route.queryParamMap.subscribe((ele)=>{
      console.log('ele:',ele.get('name'));

      this.user.studentName = ele.get('name')
      this.user.email = ele.get('email')
      this.user.role = ele.get('role')
      this.user.dept = ele.get('dept')
      this.user.photo = ele.get('photo')
    })
    console.log("user:",this.user);
    
    
  }
}
