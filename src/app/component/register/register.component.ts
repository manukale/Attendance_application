import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userData:any[] =[]
  myForm : FormGroup;
  selectedFile: File | null = null;

  constructor(private builderObj: FormBuilder, private userService : UserDataService, private router : Router){
    this.myForm = this.builderObj.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]],
      dept: ['', [Validators.required]],
      password: ['', [Validators.minLength(8),Validators.required]],
      role: ['', [Validators.required]],
      photo: [null,[Validators.required]],
     
    })
  }
 

// registerUser(){
//   console.log(this.myForm.value, 'value of reactive form ');
//   if (this.myForm.valid) {
  
//     this.userService.addUserData(this.myForm.value , 'user/registerUser').subscribe((res)=> {
//       alert(res.msg)
//       this.router.navigate(['/login'],{})

//     })
//   } else {
//     console.log(this.myForm, 'error from forms');
//   }
// }
onFileSelected(event: any) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    this.selectedFile = file; // Store file in class property
  }
}

registerUser() {
  if (this.myForm.valid ) {
    const formData = new FormData();
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('dept', this.myForm.get('dept')?.value);
    formData.append('password', this.myForm.get('password')?.value);
    formData.append('role', this.myForm.get('role')?.value);
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile); // Append only if file exists
  }

    this.userService.addUserData(formData, 'user/registerUser').subscribe((res) => {
        alert(res.msg);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during registration:', error);
      }
    );
  } else {
    console.log('Form is invalid or file is missing', this.myForm);
  }
}
}


