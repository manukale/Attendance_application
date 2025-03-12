import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-allteacher',
  standalone:true,
  imports: [NavbarAdminComponent,CommonModule,FormsModule,SearchFilterPipe],
  templateUrl: './allteacher.component.html',
  styleUrl: './allteacher.component.css'
})
export class AllteacherComponent {
  teacher :any[]=[]
  searchText:string=''

  constructor(public dialog: MatDialog,private userService : UserDataService){}
    ngOnInit(){
    this.fetchData()
    }
    fetchData(){
      this.teacher = []
      this.userService.fetchUserData('user/getUser').subscribe((res)=>{
  
        for (let i = 0; i < res.length; i++) {
          
          if(res[i].role === 'Teacher'){
            res[i].photo = this.userService.URL + res[i].photo
            this.teacher.push(res[i])
          }
          
        }
      })
     }
     showTeacherProfile(student : any) {
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
}
