import { NgModule } from '@angular/core';
import { AuthGuard } from '@shared/helpers/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SalesComponent } from './sales/sales.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';
import { ProductsComponent } from './products/products.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UsersFormComponent, canActivate: [AuthGuard] },
  { path: 'users-form', component: UsersFormComponent, canActivate: [AuthGuard] },

  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'products/:id', component: ProductsComponent, canActivate: [AuthGuard] },

  { path: 'inventory-add', component: InventoryComponent, canActivate: [AuthGuard], data:{type:"add"} },
  { path: 'inventory-list', component: InventoryComponent, canActivate: [AuthGuard], data:{type:"list"} },
  { path: 'inventory-edit', component: InventoryComponent, canActivate: [AuthGuard], data:{type:"edit"} },
  { path: 'inventory-sell', component: InventoryComponent, canActivate: [AuthGuard], data:{type:"sell"} },

  { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },

  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  
  { path: 'recovery-password', component: RecoveryPasswordComponent },
  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
