import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";
import { PRODUCTS_ROUTES } from "./products/products.routes";
import { CART_ROUTES } from "./cart/cart.routes";
import { ORDER_ROUTES } from "./orders/orders.routes";
import { HOME_ROUTES } from "./home/home.routes";
import { CATEGORIES_ROUTES } from "./categories/categories.routes";
import { BRANDS_ROUTES } from "./barnds/brands.routes";


export const USER_ROUTES: Routes = [
    {
        path: '', component: UserLayoutComponent,
        children: [
            ...HOME_ROUTES,
            ...PRODUCTS_ROUTES,
            ...CART_ROUTES,
            ...ORDER_ROUTES,
            ...CATEGORIES_ROUTES,
            ...BRANDS_ROUTES
        ]
    }
]