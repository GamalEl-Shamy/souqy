import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private authService: AuthService) { }



  createOrder(cartId: string, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    const cancelUrl = "?url=http://localhost:4200"

    return this.http.post(environment.apiUrl + 'orders/checkout-session/' + cartId + cancelUrl, {
      shippingAddress
    }, {
      headers: {
        token: this.authService.getToken()!
      }
    })
  }
}
