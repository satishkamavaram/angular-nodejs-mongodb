import { Component, OnInit,OnDestroy } from '@angular/core';
import {Catalog} from '../catalog.model';
import {CatalogService} from './../catalog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css']
})
export class CatalogDetailComponent implements OnInit,OnDestroy {

  catalogDetail : Catalog;
  index : number;
  message : string;
  catalogStatusMsgSubscription: Subscription;

  constructor(private catalogService:CatalogService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.message = '';
  //  const id = this.route.snapshot.params['id']; -- this is one time, below is dynamic
  this.route.params
  .subscribe(
    (params: Params) => {
    this.catalogDetail =  this.catalogService.getCatalog(+params['id']);
    this.index = +params['id'];
    }
  );


  this.catalogStatusMsgSubscription = this.catalogService.catalogMessage
  .subscribe(
    (message : string) => {
      this.message = message;
      if(this.catalogService.getCatalogSize()>0){
           if(this.index==0) {
             this.router.navigate(["../",1],{relativeTo:this.route});
           }
           else {
             this.router.navigate(["../",0],{relativeTo:this.route});
           }
         }
         else {
           this.router.navigate(["../","new"],{relativeTo:this.route});
         }
    }
  );
  }

 addToCart() {
   this.message = '';
   this.catalogService.addToShoppingCart(this.catalogDetail.shoppingItems);
 }

editCatalog(){
  this.router.navigate(["edit"],{relativeTo:this.route});
}

deleteCatalog(){
  this.catalogService.deleteCatalog(this.index);
/**  if(this.catalogService.getCatalogSize()>=0){
     this.router.navigate(["../",0],{relativeTo:this.route});
   }
   else {
     this.router.navigate(["../","new"],{relativeTo:this.route});
   }*/
}

ngOnDestroy()
{
  this.catalogStatusMsgSubscription.unsubscribe();
}

}
