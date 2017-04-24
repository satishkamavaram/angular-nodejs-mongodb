import {Component,Output,EventEmitter} from '@angular/core';
import {Catalog} from '../catalog/catalog.model';
import {CatalogService} from '../catalog/catalog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from "./../login/auth.service";


@Component({
  selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent {

  // @Output('nHeader') navHeaderSelected = new EventEmitter<number>();

  // onClickNavHeader(header : number) {
  //   this.navHeaderSelected.emit(header);
   //}

   catalogs : Catalog[] = [];


   constructor(private catalogService : CatalogService,private route: ActivatedRoute,
     private router: Router,private authService: AuthService) {

   }

   ngOnInit() {
     this.catalogs = this.catalogService.getCatalogs();
  //   this.catalog();
   }

 catalog(){
   this.router.navigate((this.catalogs.length==0)?["catalog"]:["catalog","0"],{relativeTo:this.route});
 }

 logout(){
     this.authService.logout();
     this.router.navigate(["/login"]);
 }

 loggedIn(){
     return this.authService.isLoggedIn()
 }
}
