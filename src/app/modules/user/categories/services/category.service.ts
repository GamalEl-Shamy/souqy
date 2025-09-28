import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.apiUrl + 'categories')
  }

  getSpecificCategory(categoryID: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'categories/' + categoryID)
  }
}
