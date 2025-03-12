import { Component } from '@angular/core';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profile-manager',
  standalone:true,
  imports: [NavbarStudentComponent,CommonModule,FormsModule],
  templateUrl: './student-profile-manager.component.html',
  styleUrl: './student-profile-manager.component.css'
})
export class StudentProfileManagerComponent {
currentUser: any
selectedFile: File | null = null;

constructor(private session : SessionStorageService, private userService: UserDataService,private router : Router){}

ngOnInit(){
  this.currentUser=this.session.getUserData('user')
  this.currentUser.photo = this.userService.URL + this.currentUser.photo
  console.log('currentUser:',this.currentUser);
  
}

onFileSelected(event: any) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    this.selectedFile = file; // Store file in class property
  }
}

updateUser(data : any){
// data.role = this.currentUser.role
// data.password = this.currentUser.password

//   const fileName = data.photo.split('\\' ).pop(); // Extracts 'girp2.png'
//   console.log(fileName); 
//   data.photo = `profilePhoto/${fileName}`
const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('dept', data.dept);
    if (this.selectedFile) {
      console.log('**',this.selectedFile);
      
      formData.append('photo', this.selectedFile); 
  }
console.log('formData',formData);

this.userService.updateUserData(this.currentUser._id,formData, 'user/updateUser').subscribe((res)=> {
  alert(res.msg)
  this.router.navigate(['/studentHome'],{})
  // this.session.storeUserData('user' ,res)

})
}
}
