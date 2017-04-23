import { Component, OnInit } from '@angular/core';
import {Catalog} from './catalog.model';
import {CatalogService} from './catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],

})
export class CatalogComponent implements OnInit {

   catalogItem :Catalog;

  constructor(private catalogService : CatalogService) { }

  ngOnInit() {
    this.catalogService.catalogSelected.subscribe(
      (selectedCatalogItem : Catalog) => {
        this.catalogItem = selectedCatalogItem;
      }
    );
  }

  onSelectedCatalogItem(catalog:Catalog){
    this.catalogItem = catalog;
  }

}
