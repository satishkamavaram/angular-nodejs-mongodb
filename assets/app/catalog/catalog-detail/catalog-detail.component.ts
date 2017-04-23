import { Component, OnInit } from '@angular/core';
import {Catalog} from '../catalog.model';
import {CatalogService} from './../catalog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-catalog-detail',
  templateUrl: './catalog-detail.component.html',
  styleUrls: ['./catalog-detail.component.css']
})
export class CatalogDetailComponent implements OnInit {

  catalogDetail : Catalog;
  index : number;

  constructor(private catalogService:CatalogService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  //  const id = this.route.snapshot.params['id']; -- this is one time, below is dynamic
  this.route.params
  .subscribe(
    (params: Params) => {
    this.catalogDetail =  this.catalogService.getCatalog(+params['id']);
    this.index = +params['id'];
    }
  );
  }

 addToCart() {
   this.catalogService.addToShoppingCart(this.catalogDetail.shoppingItems);
 }

editCatalog(){
  this.router.navigate(["edit"],{relativeTo:this.route});
}

deleteCatalog(){
  this.catalogService.deleteCatalog(this.index);
  this.router.navigate(["../"],{relativeTo:this.route});
}

}
