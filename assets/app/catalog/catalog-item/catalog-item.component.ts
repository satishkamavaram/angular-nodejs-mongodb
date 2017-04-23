import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {Catalog} from '../catalog.model';
import {CatalogService} from '../catalog.service';
@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {

 @Input('citem') catalogItem :Catalog;
 @Input('cindex') index : number;

  constructor() { }

  ngOnInit() {
  }




}
