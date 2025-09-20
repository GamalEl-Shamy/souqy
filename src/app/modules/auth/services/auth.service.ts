import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signup', data)
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'auth/signin', data)
  }

  saveToken(token: string): void {
    if (typeof window != 'undefined') {
      localStorage.setItem('token', token)
    }
  }

  getToken(): string | null {
    if (typeof window != 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }
}
