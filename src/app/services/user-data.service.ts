import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  user: any
  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000';
  // private ATTENDANCE_URL = 'http://localhost:3000/attendance';

  fetchUserData(link:string): Observable<any> {
    return this.http.get(`${this.URL}/${link}`);
  }

  addUserData(data: any , link:string): Observable<any> {
    return this.http.post(`${this.URL}/${link}`, data)
  }

  updateUserData(id:string,data:any, link:string): Observable<any> {
    return this.http.put(`${this.URL}/${link}/${id}` ,data );
  }

  // addAttendanceData(data:any): Observable<any> {
  //   return this.http.post(this.URL,data );
  // }
}
