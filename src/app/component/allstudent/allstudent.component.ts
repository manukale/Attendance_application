import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage.service';
import { NavbarTeacherComponent } from "../navbar-teacher/navbar-teacher.component";
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { ModalComponent } from "../modal/modal.component";
import { MatDialog } from '@angular/material/dialog';
// import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-allstudent',
  standalone:true,
  imports: [NavbarAdminComponent, CommonModule, NavbarTeacherComponent, FormsModule, SearchFilterPipe, ModalComponent],
  templateUrl: './allstudent.component.html',
  styleUrl: './allstudent.component.css'
})
export class AllstudentComponent {
currentUser:any
student :any[]=[]
searchText :string =  '';

isModalOpen = false

constructor(public dialog: MatDialog,private userService : UserDataService, private router : Router, private session : SessionStorageService){}
  ngOnInit(){
    this.currentUser=this.session.getUserData('user') 
   this.fetchData()
   console.log('all student current user:',this.currentUser);
  }
 fetchData(){
  this.student = []
  this.userService.fetchUserData('user/getUser').subscribe((res)=>{

    for (let i = 0; i < res.length; i++) {
      if(res[i].role === 'Student'){
        this.student.push(res[i])
      }
    }
  })
 }
  showAttendance(data : any){
    this.router.navigate(['/attendance', data._id],{
      queryParams:{
        name : data.name
      }
    }
    )
  }

  // showStudentProfile(stud : any){
  //   // console.log('showStudentProfile:',student);
  //   this.router.navigate(['/studentProfile',stud._id],{
  //     queryParams:{
  //       name : stud.name,
  //       dept:stud.dept,
  //       role:stud.role,
  //       photo:stud.photo,
  //       email:stud.email

  //     }
  //   })
  // }
  showStudentProfile(student : any) {
    console.log('modal Student::',student);
    
    this.dialog.open(ModalComponent, {
      // width: "400px",
      // height:"200px",
      data: { student },
      // disableClose: true,
    });
  }
  deleteUser(user : any){
    // console.log('for delete user:',id);
    this.userService.deleteUserData('user/deleteUser',user._id,user).subscribe((res)=>{
      alert(res.msg)
     this.fetchData()
    })

  }

  closeModal(){
    console.log('closing modal');
    this.isModalOpen =false
  }
}
