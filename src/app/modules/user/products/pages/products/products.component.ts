import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { SpinnerComponent } from "../../../../../shared/components/spinner/spinner.component";


@Component({
  selector: 'app-products',
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = []
  private readonly productsService = inject(ProductsService)
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


}
