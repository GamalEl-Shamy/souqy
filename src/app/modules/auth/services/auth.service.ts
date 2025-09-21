import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  loggedIn: boolean = false

  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', data)
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signin', data)
  }

  saveToken(token: string): void {
    if (typeof window != 'undefined') {
      localStorage.setItem('token', token)
      this.loggedIn = true
    }
  }

  getToken(): string | null {
    if (typeof window != 'undefined' && this.loggedIn) {
      this.loggedIn = false
      return localStorage.getItem('token')
    }
    this.loggedIn = false
    return null
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }
}
