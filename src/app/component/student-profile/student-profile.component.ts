import { Component } from '@angular/core';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone:true,
  imports: [NavbarTeacherComponent],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent {
  user: any={id:'',studentName:'',email:'',role:'',dept:'',photo:''}
  constructor( private route : ActivatedRoute){}

  ngOnInit(){

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
    // console.log("user:",this.user);
    
    
  }
}
