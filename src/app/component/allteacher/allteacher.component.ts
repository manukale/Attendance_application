import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';

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

  constructor(private userService : UserDataService){}
    ngOnInit(){
     this.userService.fetchUserData('user').subscribe((res)=>{
  
        for (let i = 0; i < res.length; i++) {
          
          if(res[i].role === 'Teacher'){
            this.teacher.push(res[i])
          }
          
        }
  // console.log('student:',this.student);
      })
    }
}
