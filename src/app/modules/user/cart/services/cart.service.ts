import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addProductToCart(productId: string): Observable<any> {
    return this.http.post(environment.apiUrl + 'cart', {
      productId
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  updateQuantity(productId: string, count: number): Observable<any> {
    return this.http.put(environment.apiUrl + `cart/${productId}`, {
      count
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  getLoggedUserCart(): Observable<any> {
    return this.http.get(environment.apiUrl + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  removeItem(productId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + `cart/${productId}`, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }

  clearCart(): Observable<any> {
    return this.http.delete(environment.apiUrl + 'cart', {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
}
