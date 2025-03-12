import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user: any
  constructor(private http: HttpClient) { }

  //  URL = 'http://localhost:3000';   //for local
   URL = 'https://attendance-application-api.onrender.com/';  //for development
  // private ATTENDANCE_URL = 'http://localhost:3000/photos/photo1740381853756.jpg';

  fetchUserData(link:string): Observable<any> {
    return this.http.get(`${this.URL}/${link}`);
  }

  fetchUserDataByEmail(link: string, email: any): Observable<any> {
   return this.http.get(`${this.URL}/${link}/${email}`);
  }

  loginUser(link:string, data: any ): Observable<any> {
    return this.http.post(`${this.URL}/${link}`, data)
  }
  addUserData(data: any , link:string): Observable<any> {
    console.log(data);
    
    return this.http.post(`${this.URL}/${link}`, data)
  }

  updateUserData(id:string,data:any, link:string): Observable<any> {
    console.log('update User::',data);
    console.log('update User id::',id);
    
    return this.http.put(`${this.URL}/${link}/${id}` ,data );
  }
  deleteUserData(link:string,id:string,data: any ): Observable<any> {
    return this.http.delete(`${this.URL}/${link}/${id}` ,data );
  }

  addAttendanceData(data:any, link:string): Observable<any> {
    return this.http.post(`${this.URL}/${link}`, data)
  }  
 
}
