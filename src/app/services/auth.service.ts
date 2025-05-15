import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }


  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }


  verifyToken(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify`, data,{responseType:'text'});
  }
  reverify(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reverify`, data);
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
  updatePassword(data: { token: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-password`, data);
  }
}