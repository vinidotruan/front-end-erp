import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from '@shared/helpers/error.interceptor';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SalesComponent } from './sales/sales.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { HoverClassDirective } from './hover-class.directive';
import { ReportsObsoleteProductsComponent } from './reports-obsolete-products/reports-obsolete-products.component';
import { ReportsObsoleteListComponent } from './reports-obsolete-list/reports-obsolete-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    CategoriesComponent,
    InventoryComponent,
    SidenavComponent,
    NavbarComponent,
    SalesComponent,
    HomeComponent,
    ClickOutsideDirective,
    UsersComponent,
    UsersFormComponent,
    HoverClassDirective,
    ReportsObsoleteProductsComponent,
    ReportsObsoleteListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
