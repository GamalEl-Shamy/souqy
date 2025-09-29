import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistCounter: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) { }

  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'wishlist', {
      productId
    })
  }

  getLoggedUserWishList(): Observable<any> {
    return this.http.get(environment.apiUrl + 'wishlist')
  }

  removeProductFromWishList(productId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + 'wishlist/' + productId)
  }
}
