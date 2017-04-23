import {ShoppingItem} from '../shared/shoppingItem.model';
export class Catalog {
  public name : string;
  public  desc;
  public imagePath;
  public shoppingItems : ShoppingItem[];

  constructor(name:string,desc:string,imagePath:string,shoppingItems : ShoppingItem[]){
    this.name = name;
    this.desc = desc;
    this.imagePath = imagePath;
    this.shoppingItems = shoppingItems;
  }
}
