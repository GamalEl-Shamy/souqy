import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  // loggedIn: boolean = false

  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', data)
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signin', data)
  }

  decodeToken() {
    try {
      const decoded = jwtDecode(this.getToken()!);
    } catch (error) {
      this.logout()
    }
  }

  saveToken(token: string): void {
    if (typeof window != 'undefined') {
      localStorage.setItem('token', token)
      // this.loggedIn = true
    }
  }

  getToken(): string | null {
    if (typeof window != 'undefined') {
      // this.loggedIn = false
      return localStorage.getItem('token')
    }
    // this.loggedIn = false
    return null
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  logout() {
    if (typeof window != 'undefined') {
      this.router.navigate(['/login'])
      localStorage.clear()
    }
  }

  submitVerifyEmail(data: object): Observable<any> {
    return this.http.post(environment.apiUrl + `auth/forgotPasswords`, data)
  }

  submitVerifyCode(data: object): Observable<any> {
    return this.http.post(environment.apiUrl + `auth/verifyResetCode`, data)
  }

  submitResetPassword(data: object): Observable<any> {
    return this.http.put(environment.apiUrl + `auth/resetPassword`, data)
  }
}
