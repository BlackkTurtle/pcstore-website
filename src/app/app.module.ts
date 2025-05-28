import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TypesService } from './services/types.service';
import { BrandService } from './services/brand.service';
import { ProductService } from './services/product.service';
import { OrderByPipe } from './pipes/orderby.pipe';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ReggPageComponent } from './regg-page/regg-page.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { OrderService } from './services/order.service';
import { CommentService } from './services/comment.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModelPageComponent } from './model-page/model-page.component';
import { ModelService } from './services/model.service';
import { AdvertisementService } from './services/advertisement.service';
import { NavbarService } from './services/navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    OrderPageComponent,
    UserPageComponent,
    SearchPageComponent,
    OrderByPipe,
    ProductPageComponent,
    AuthPageComponent,
    ReggPageComponent,
    ModelPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule
  ],
  providers: [
    AdvertisementService,
    TypesService,
    BrandService,
    ProductService,
    AuthService,
    OrderService,
    CommentService,
    ModelService,
    NavbarService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
