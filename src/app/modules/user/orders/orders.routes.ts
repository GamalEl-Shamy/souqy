import { Routes } from "@angular/router";

export const ORDER_ROUTES: Routes = [
    {
        path: 'address/:id',
        loadComponent: () => import('./pages/shopping-address/shopping-address.component').then((c) => c.ShoppingAddressComponent),
        title: 'address'
    },
    {
        path: 'allorders',
        loadComponent: () => import('./pages/all-orders/all-orders.component').then((c) => c.AllOrdersComponent),
        title: 'All Orders'
    }
]