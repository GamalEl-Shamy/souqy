import { Component, inject, OnInit } from '@angular/core';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';


@Component({
  selector: 'app-products',
  imports: [SpinnerComponent, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data
        this.isLoading = true
      }
    })
  }

  addToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
