import { Component } from '@angular/core';
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CtaBannerComponent } from '../cta-banner/cta-banner.component';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';
import { TopVendorsComponent } from '../top-vendors/top-vendors.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    CategoryMenuComponent,
    HeroBannerComponent,
    FeaturedProductsComponent,
    TopVendorsComponent,
    CtaBannerComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
