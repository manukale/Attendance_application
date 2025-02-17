import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { StudentComponent } from './component/student/student.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { TeacherProfilemanagerComponent } from './component/teacher-profilemanager/teacher-profilemanager.component';
import { TeacherPasswordresetComponent } from './component/teacher-passwordreset/teacher-passwordreset.component';
import { NavbarTeacherComponent } from './component/navbar-teacher/navbar-teacher.component';
import { StudentHomeComponent } from './component/student-home/student-home.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { MarkAttendanceComponent } from './component/mark-attendance/mark-attendance.component';
import { StudentProfileManagerComponent } from './component/student-profile-manager/student-profile-manager.component';
import { authGuard } from './guards/auth.guard';
import { StudentProfileComponent } from './component/student-profile/student-profile.component';
import { AllAttendanceComponent } from './component/all-attendance/all-attendance.component';
import { AllstudentComponent } from './component/allstudent/allstudent.component';
import { AllteacherComponent } from './component/allteacher/allteacher.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {path:"", component:LoginComponent},
    {path:"login", component:LoginComponent},
    {path:"register", component:RegisterComponent},
    
    {path:"home", component:HomeComponent , canActivate:[authGuard],},
    // {path:"home/:email", component:HomeComponent , canActivate:[authGuard],},
    {path:"studentHome", component:StudentHomeComponent,canActivate:[authGuard] },
    {path:"adminHome", component:AdminHomeComponent,canActivate:[authGuard]},

    // {path:"studentnavbar/:id", component:NavbarTeacherComponent},
    {path:"admin", component:AdminComponent},
    {path:"student", component:StudentComponent, canActivate:[authGuard]},
    {path:"allstudent", component:AllstudentComponent, canActivate:[authGuard]},
    {path:"allteacher", component:AllteacherComponent, canActivate:[authGuard]},

    {path:"teacherprofile", component:TeacherProfilemanagerComponent, canActivate:[authGuard]},
    {path:"studentProfileManager", component:StudentProfileManagerComponent,canActivate:[authGuard]},
    {path:"studentProfile/:id", component:StudentProfileComponent, canActivate:[authGuard]},

    {path:"teacherpassword", component:TeacherPasswordresetComponent, canActivate:[authGuard]},

    {path:"attendance/:id", component:AttendanceComponent, canActivate:[authGuard]},
    // {path:"markAttendance", component:MarkAttendanceComponent, canActivate:[authGuard]},
    {path:"allAttendence", component:AllAttendanceComponent, canActivate:[authGuard]},
    {path:"**", component:PagenotfoundComponent},
];
