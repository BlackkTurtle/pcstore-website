import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TypesService } from './services/types.service';
import { BrandService } from './services/brand.service';
import { ProductService } from './services/product.service';
import { OrderByPipe } from './pipes/orderby.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    OrderPageComponent,
    UserPageComponent,
    SearchPageComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TypesService,
    BrandService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
