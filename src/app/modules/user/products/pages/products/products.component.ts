import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../cart/services/cart.service';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly toastr = inject(ToastrService)

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
      }
    })
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status == 'success') {
          this.toastr.success(res.message);
        }
      }
    })
  }
}
