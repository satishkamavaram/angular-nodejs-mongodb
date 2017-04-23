import { NgModule } from '@angular/core';
import { CatalogComponent } from './catalog/catalog.component';
import { ShoppingListComponent } from './shopping/shopping-list/shopping-list.component';
import { RouterModule,Routes } from  '@angular/router'
import { CatalogDetailComponent } from './catalog/catalog-detail/catalog-detail.component';
import { CatalogEditComponent } from './catalog/catalog-edit/catalog-edit.component';
const appRoutes  : Routes = [

  { path: 'catalog', component: CatalogComponent ,
    children : [
    {  path: 'new', component : CatalogEditComponent},
    {  path: ':id', component : CatalogDetailComponent},
    {  path: ':id/edit', component : CatalogEditComponent}
  ]},
  { path: 'shopping', component: ShoppingListComponent },
  { path: '', redirectTo: 'catalog', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports : [RouterModule],
})
export class AppRoutingModule { }
