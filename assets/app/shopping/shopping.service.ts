import { EventEmitter} from '@angular/core';
import {ShoppingItem} from '../shared/shoppingItem.model';
import {Subject} from 'rxjs/Subject';
export class ShoppingService {

  private shoppingItems :  ShoppingItem[] = [
    new ShoppingItem('item1','10')
  ];

  newShoppingItem = new EventEmitter<ShoppingItem[]>();
  editShoppingItem  = new Subject<number>();

  getShoppingItems() {
    return this.shoppingItems.slice() ; //to return copy of shoppingItems;
  }

  getShoppingItem(index) {
    return this.shoppingItems[index]; //to return copy of shoppingItems;
  }

  addShoppingItem(item :ShoppingItem) {
    this.shoppingItems.push(item);
    this.newShoppingItem.emit(this.shoppingItems.slice());
  }

  addShoppingItems(items :ShoppingItem[]) {
    this.shoppingItems.push(...items);
    this.newShoppingItem.emit(this.shoppingItems.slice());
  }

  updateShoppingItem(index :number,item :ShoppingItem){
    this.shoppingItems[index] = item;
    this.newShoppingItem.emit(this.shoppingItems.slice());
  }

  deleteShoppingItem(index :number) {
    this.shoppingItems.splice(index,1);
    this.newShoppingItem.emit(this.shoppingItems.slice());
  }

}
