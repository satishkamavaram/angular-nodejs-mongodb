import {ShoppingItem} from '../shared/shoppingItem.model';
export class Catalog {
  
  constructor(public id:string,
    public name:string,
    public desc:string,
    public imagePath:string,
    public shoppingItems : ShoppingItem[]){

  }
}
