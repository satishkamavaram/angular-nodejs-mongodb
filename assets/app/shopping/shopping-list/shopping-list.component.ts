import { Component, OnInit } from '@angular/core';
import {ShoppingItem} from '../../shared/shoppingItem.model';
import {ShoppingService} from '../shopping.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  shoppingItems :  ShoppingItem[] = []

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
    this.shoppingService.getShoppingItems();
    this.shoppingService.newShoppingItem.subscribe(
       (items :  ShoppingItem[]) => {
         this.shoppingItems = items;
       }
    );
  }

  OnEdit(index:number){
    this.shoppingService.editShoppingItem.next(index);
  }

}
