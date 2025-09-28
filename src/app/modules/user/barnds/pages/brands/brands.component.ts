import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { Brands } from '../../models/brands.interface';
import { BrandItemComponent } from "../../components/brand-item/brand-item.component";

@Component({
  selector: 'app-brands',
  imports: [BrandItemComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brandList: Brands[] = []
  private readonly brandsService = inject(BrandsService)

  ngOnInit(): void {
    this.gatAllBrands()
  }

  gatAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandList = res.data

      }
    })
  }
}
