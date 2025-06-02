import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ReggPageComponent } from './regg-page/regg-page.component';
import { ModelPageComponent } from './model-page/model-page.component';

const routes: Routes = [
  {path:"",component:MainPageComponent},
  {path:"orderpage",component:OrderPageComponent},
  {path:"userpage",component:UserPageComponent},
  {path:"searchpage",component:SearchPageComponent},
  {path:"productpage/:id",component:ProductPageComponent},
  {path:"authpage",component:AuthPageComponent},
  {path:"reggpage",component:ReggPageComponent},
  {path:"modelpage",component:ModelPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
