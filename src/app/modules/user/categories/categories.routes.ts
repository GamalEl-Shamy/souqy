import { Routes } from "@angular/router";

export const CATEGORIES_ROUTES: Routes = [
    {
        path: 'categories',
        loadComponent: () => import('./pages/category/category.component').then((c) => c.CategoryComponent),
        title: 'Categories'
    }
]