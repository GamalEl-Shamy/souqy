import { Component, inject, OnInit } from '@angular/core';
import { CategoryItemComponent } from "../../components/category-item/category-item.component";
import { Category } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  imports: [CategoryItemComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {

  categoryList: Category[] = []
  private readonly categoryService = inject(CategoryService)

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data
      }
    })
  }
}
