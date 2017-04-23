import { Component, OnInit,Output, EventEmitter,OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Catalog} from '../catalog.model';
import {CatalogService} from '../catalog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit ,OnDestroy{

  catalogs : Catalog[] = [];
  catalogChangedSubscription : Subscription;

  constructor(private catalogService : CatalogService,private route: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.catalogs = this.catalogService.getCatalogs();
    this.catalogChangedSubscription = this.catalogService.catalogChanged.subscribe(
      (catalogs : Catalog[]) =>{
        this.catalogs = catalogs;
    }
    );
  }

addNewCatalog(){
  this.router.navigate(["new"],{relativeTo:this.route});
}

ngOnDestroy() {
  this.catalogChangedSubscription.unsubscribe();
}

}
