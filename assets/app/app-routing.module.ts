import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RouterModule,Routes } from  '@angular/router'
import { CatalogDetailComponent } from './catalog/catalog-detail/catalog-detail.component';
import { CatalogEditComponent } from './catalog/catalog-edit/catalog-edit.component';
import { SignInComponent } from './login/signin/signin.component';
import { SignUpComponent } from './login/signup/signup.component';
import {AuthGaurdService} from './login/auth.guard.service';

const appRoutes  : Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: SignInComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'catalog', canActivate:[AuthGaurdService], component: CatalogComponent,
    children : [
    {  path: 'new', component : CatalogEditComponent},
    {  path: ':id', component : CatalogDetailComponent},
    {  path: ':id/edit', component : CatalogEditComponent}
  ]},
  { path: 'shopping', canActivate:[AuthGaurdService],component: ShoppingListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule],
})
export class AppRoutingModule { }
