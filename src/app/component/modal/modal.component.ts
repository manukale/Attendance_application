import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { UserDataService } from '../../services/user-data.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ MatDialogModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  selectedFile: File | null = null;

 constructor(public dialogRef: MatDialogRef<ModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
private userService : UserDataService,
private router : Router){}

onFileSelected(event: any) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    this.selectedFile = file; // Store file in class property
  }
}
updateUser(data : any){

    console.log('modal form data::',data); 
  
  const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('dept', data.dept);
      if (this.selectedFile) {
        console.log('**',this.selectedFile);
        
        formData.append('photo', this.selectedFile); 
    }
  // console.log('formData',formData);
  
  this.userService.updateUserData(this.data.student._id,formData, 'user/updateUser').subscribe((res)=> {
    alert(res.msg)
    this.dialogRef.close();
    this.router.navigate(['/adminHome'], {})   
  })
  }
  
  close() {
    this.dialogRef.close();
  }
}
