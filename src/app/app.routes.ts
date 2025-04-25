import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { MyAccountComponent } from './Porfile/my-account/my-account.component';
import { OrdersComponent } from './Porfile/orders/orders.component';
import { WishlistComponent } from './Porfile/wishlist/wishlist.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path: 'account',component:MyAccountComponent
  },
  {
    path: 'orders',component:OrdersComponent
  },
  {
    path: 'wishlist',component:WishlistComponent
  },
];

