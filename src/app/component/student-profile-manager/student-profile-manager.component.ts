import { Component } from '@angular/core';
import { NavbarStudentComponent } from "../navbar-student/navbar-student.component";
import { CommonModule } from '@angular/common';
import { SessionStorageService } from '../../services/session-storage.service';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-student-profile-manager',
  standalone:true,
  imports: [NavbarStudentComponent,CommonModule,FormsModule],
  templateUrl: './student-profile-manager.component.html',
  styleUrl: './student-profile-manager.component.css'
})
export class StudentProfileManagerComponent {
currentUser: any

constructor(private session : SessionStorageService, private userService: UserDataService){}

ngOnInit(){
  this.currentUser=this.session.getUserData('user')
  // console.log('currentUser:',this.currentUser);
  
}

updateUser(data : any){
console.log('data student profile:',data);
data.role = this.currentUser.role
data.password = this.currentUser.password

  const fileName = data.photo.split('\\' ).pop(); // Extracts 'girp2.png'
  console.log(fileName); 
  data.photo = `profilePhoto/${fileName}`

this.userService.updateUserData(this.currentUser.id,data, 'user/updateUser').subscribe((res)=> {
  alert("User Updated Successfully")
  // this.router.navigate(['/'],{})

})
}
}
