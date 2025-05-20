import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content/content.component';
import { BiDashboardComponent } from './content/pages/bi-dashboard/bi-dashboard.component';
import { CategoriesComponent } from './content/pages/categories/categories.component';
import { ProductsComponent } from './content/pages/products/products.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'bi-dashboard', component: BiDashboardComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: '', component:ContentComponent, pathMatch: 'full' }, // Default route
    ],
  },
];
