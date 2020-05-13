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
import { ReportsComponent } from './reports/reports.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';
import { LoadingInterceptorService } from '@shared/helpers/loading.interceptor';

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
    ReportsComponent,
    PaginationComponent,
    LoadingComponent,
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
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
