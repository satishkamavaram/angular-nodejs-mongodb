import { Injectable,EventEmitter} from '@angular/core';
import {ShoppingItem} from '../shared/shoppingItem.model';
import {Subject} from 'rxjs/Subject';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class ShoppingService {

constructor(private http: Http) {}

  private shoppingItems :  ShoppingItem[] = [
    new ShoppingItem('item1','10')
  ];

  newShoppingItem = new EventEmitter<ShoppingItem[]>();
  editShoppingItem  = new Subject<number>();
  shoppingItemMessage = new Subject<string>();

  clearItems() {
    this.shoppingItems=[];
  }

  getShoppingItems() {
    //return this.shoppingItems.slice() ; //to return copy of shoppingItems;
    this.getItemsInServer()
    .subscribe(
      (data) => {
        if(data){
            const items = data.shoppingList;
            console.log('this.shoppingItems');
            console.log(this.shoppingItems);
            this.clearItems();
            for(let item of items){
              this.shoppingItems.push(new ShoppingItem(item.name,item.amount));
            }
            this.newShoppingItem.emit(this.shoppingItems.slice());
        }
      },
      (error) =>  {
        console.log(error);
        this.newShoppingItem.emit(this.shoppingItems.slice());
      }
    );
  }

  getShoppingItem(index) {
    return this.shoppingItems[index]; //to return copy of shoppingItems;
  }

  addShoppingItem(item :ShoppingItem) {
    //this.shoppingItems.push(item);
    //this.newShoppingItem.emit(this.shoppingItems.slice());
    console.log('sdfsd');
    let shoppingItem : ShoppingItem[] =[];
    shoppingItem.push(item);
    this.addItemsInServer(shoppingItem)
    .subscribe(
      (data) => {
        console.log(data);
        this.shoppingItems.push(item);
        this.newShoppingItem.emit(this.shoppingItems.slice());
        this.shoppingItemMessage.next(data.msg);
      },
      (error) =>  {
        console.log(error);
        this.shoppingItemMessage.next(error.title);
      }
    );
  }

  addShoppingItems(items :ShoppingItem[]) {
//    this.shoppingItems.push(...items);
//    this.newShoppingItem.emit(this.shoppingItems.slice());

    this.addItemsInServer(items)
    .subscribe(
      (data) => {
        console.log(data);
        this.shoppingItems.push(...items);
        this.newShoppingItem.emit(this.shoppingItems.slice());
        this.shoppingItemMessage.next(data.msg);
      },
      (error) =>  {
        console.log(error);
        this.shoppingItemMessage.next(error.title);
      }
    );
  }

  updateShoppingItem(index :number,item :ShoppingItem){
    this.shoppingItems[index] = item;
    this.newShoppingItem.emit(this.shoppingItems.slice());
  }

  deleteShoppingItem(index :number) {
    //this.shoppingItems.splice(index,1);
    //this.newShoppingItem.emit(this.shoppingItems.slice());
    let shoppingItem : ShoppingItem[] =[];
     shoppingItem.push(this.shoppingItems[index]);
     this.deletItemsInServer(shoppingItem)
     .subscribe(
       (data) => {
         console.log(data);
         this.shoppingItems.splice(index,1);
         this.newShoppingItem.emit(this.shoppingItems.slice());
         this.shoppingItemMessage.next(data.msg);
       },
       (error) =>  {
         console.log(error);
         this.shoppingItemMessage.next(error.title);
       }
     );
  }

  addItemsInServer(items :ShoppingItem[]) {
       console.log(items);
       const itemss = JSON.stringify(items);
       const body  = '{"shoppingList" : '+ itemss+"}";
    //   console.log(shoppingList);
      // const body1 = JSON.stringify(shoppingList);
        console.log(body);
       const headers = new Headers({'Content-Type': 'application/json'});
       const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
       return this.http.post('http://localhost:3000/shopping/item'+ token, body, {headers: headers})
           .map((response: Response) => {
             console.log('response');
             console.log(response.json());
             return response.json()
           })
           .catch((error: Response) => {
              console.log('error');
              console.log(error.json());
             return Observable.throw(error.json())
           });
   }

   deletItemsInServer(items :ShoppingItem[]) {
        console.log(items);
        const itemss = JSON.stringify(items);
        const body  = '{"shoppingList" : '+ itemss+"}";
     //   console.log(shoppingList);
       // const body1 = JSON.stringify(shoppingList);
         console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
           ? '?token=' + localStorage.getItem('token')
           : '';
        return this.http.delete('http://localhost:3000/shopping/item'+ token,
        {headers: headers,
        body : body})
            .map((response: Response) => {
              console.log('response');
              console.log(response.json());
              return response.json()
            })
            .catch((error: Response) => {
               console.log('error');
               console.log(error.json());
              return Observable.throw(error.json())
            });
    }

   getItemsInServer() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
           ? '?token=' + localStorage.getItem('token')
           : '';
        return this.http.get('http://localhost:3000/shopping'+ token,  {headers: headers})
            .map((response: Response) => {
              console.log('response');
              console.log(response.json());
              return response.json()
            })
            .catch((error: Response) => {
               console.log('error');
               console.log(error.json());
              return Observable.throw(error.json())
            });
    }

}
