import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { MyAccountComponent } from './Porfile/my-account/my-account.component';
import { OrdersComponent } from './Porfile/orders/orders.component';
import { WishlistComponent } from './Porfile/wishlist/wishlist.component';
import { ProductDetailComponent } from './Products/product-detail/product-detail.component';
import { ProductListingComponent } from './Products/product-listing/product-listing.component';
import { CartComponent } from './Home/cart/cart.component';
import { AuthFormComponent } from './Auth/auth-form/auth-form.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { UnverifiedComponent } from './Auth/unverified/unverified.component';
import { VerificationComponent } from './Auth/verification/verification.component';
import { CoreComponent } from './Porfile/core/core.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    component: CoreComponent,
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: MyAccountComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'wishlist', component: WishlistComponent }
    ]
  },
  { path: 'test', component: ProductDetailComponent },
  { path: 'test1', component: ProductListingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthFormComponent },
  { path: 'verify', component: VerificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'unverified', component: UnverifiedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
