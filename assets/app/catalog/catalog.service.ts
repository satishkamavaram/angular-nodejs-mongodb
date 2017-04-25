
import {EventEmitter,Injectable} from  '@angular/core';
import {Subject} from 'rxjs/Subject'
import {Catalog} from './catalog.model';
import {ShoppingItem} from '../shared/shoppingItem.model';
import {ShoppingService} from './../shopping/shopping.service';

import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class CatalogService
{

 catalogSelected = new EventEmitter<Catalog>();
 catalogChanged   = new Subject<Catalog[]>();
 catalogMessage = new Subject<string>();

private  catalogs2: Catalog[] = [
    new Catalog("1","catalog1","catalogDesc1",
    "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
    [new ShoppingItem('book1','10'),
    new ShoppingItem('book2','20'),
  new ShoppingItem('book3','30')]),
    new Catalog("2","catalog2","catalogDesc2",
    "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
    [new ShoppingItem('book3','30'),
    new ShoppingItem('book4','40')])
  ];

  private  catalogs: Catalog[] = [
      new Catalog("1","NodeJS","ServerSide JavaScript Event Driven Programming",
      "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
      [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("2","MongoDB","Document Oriented NOSQL DB",
      "https://www.zoomdata.com/sites/default/files/styles/712_width/public/MongoDB_Logo_cropped.png?itok=jai5MXZh",
      [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("3","Angular 4","Google - JavaScript Frontend Framework",
  "https://cdn-images-1.medium.com/max/796/1*juPyda3wq9uz_SNFRLuANg@2x.png",
  [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("4","FullStack","Angular , NodeJs , MongoDB",
  "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARoAAAAJGFjZTcxNzJlLTI4MTAtNGM4NS04MjZhLTViYjEwZTU3YTA2ZA.png",
  [new ShoppingItem('book3','30'),
      new ShoppingItem('book4','40')])
    ];


  private  catalogs1 : Catalog[] = [

    ];


constructor(private shoppingService:ShoppingService,private http: Http){

}

clearCatalog() {
  this.catalogs=[];
}

getCatalogs() {
// return  this.catalogs.slice();  //gives copy of array
 this.getCatalogsInServer().subscribe(
   (data) => {
     console.log(data);
     this.clearCatalog();
     let catalog : Catalog ;

     for(let catalog of data){
       let catalogItems = catalog.shoppingItems;
       let shoppingItems : ShoppingItem[] =[];
       if(catalogItems){
          for(let item of catalogItems){
            shoppingItems.push(new ShoppingItem(item.name,item.amount));
          }
        }
        catalog = new Catalog(
         catalog._id,
         catalog.name,
         catalog.desc,
         catalog.imagePath,
         shoppingItems);

         this.catalogs.push(catalog);
     }
     this.catalogChanged.next(this.catalogs.slice());
   },
   (error) =>  {
     console.log(error);
     this.catalogChanged.next(this.catalogs.slice());
   }
 );
}

setCatalogSelected(catalog: Catalog){
  this.catalogSelected.emit(catalog);
}

addToShoppingCart(items :ShoppingItem[]) {
  this.shoppingService.addShoppingItems(items);
}

 getCatalog(id : number) {
   return this.catalogs[id];
 }

getCatalogSize()
{
 return this.catalogs.length;
}
  addCatalog(catalog: Catalog){
//  this.catalogs.push(catalog);
//  this.catalogChanged.next(this.catalogs.slice());

  this.addCatalogInServer(catalog)
  .subscribe(
    (data) => {
      console.log(data);
      catalog.id = data.id;
      this.catalogs.push(catalog);
      this.catalogChanged.next(this.catalogs.slice());
      this.catalogMessage.next(data.msg);
    },
    (error) =>  {
      console.log(error);
      this.catalogMessage.next(error.title);
    }
  );

  }

  updateCatalog(index : number,catalog: Catalog){
    let catalogIncache: Catalog  =  this.catalogs[index];
    catalog.id =  catalogIncache.id;
  //  this.catalogChanged.next(this.catalogs.slice());
    this.updateCatalogInServer(catalog)
    .subscribe(
      (data) => {
        console.log(data);
        this.catalogs[index] = catalog;
        this.catalogChanged.next(this.catalogs.slice());
        this.catalogMessage.next(data.msg);
      },
      (error) =>  {
        console.log(error);
        this.catalogMessage.next(error.title);
      }
    );
  }

  deleteCatalog(index : number) {
//    this.catalogs.splice(index,1);
//    this.catalogChanged.next(this.catalogs.slice());
    let catalogIncache: Catalog  =  this.catalogs[index];
    this.deletCatalogInServer(catalogIncache.id)
    .subscribe(
      (data) => {
        console.log(data);
        this.catalogs.splice(index,1);
        this.catalogChanged.next(this.catalogs.slice());
        this.catalogMessage.next(data.msg);
      },
      (error) =>  {
        console.log(error);
        this.catalogMessage.next(error.title);
      }
    );
  }


  addCatalogInServer(item :Catalog) {
       console.log(item);
       const body = JSON.stringify(item);
        console.log(body);
       const headers = new Headers({'Content-Type': 'application/json'});
       const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
       return this.http.post('http://localhost:3000/catalog'+ token, body, {headers: headers})
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

   updateCatalogInServer(item :Catalog) {
        console.log(item);
        const body = JSON.stringify(item);
         console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
           ? '?token=' + localStorage.getItem('token')
           : '';
        return this.http.put('http://localhost:3000/catalog'+ token, body, {headers: headers})
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

    getCatalogsInServer() {
         const headers = new Headers({'Content-Type': 'application/json'});
         const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
         return this.http.get('http://localhost:3000/catalog'+ token,  {headers: headers})
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


     deletCatalogInServer(id : String) {
          console.log(id);
          //  console.log(shoppingList);
         // const body1 = JSON.stringify(shoppingList);
          const headers = new Headers({'Content-Type': 'application/json'});
          const token = localStorage.getItem('token')
             ? '?token=' + localStorage.getItem('token')
             : '';
          return this.http.delete('http://localhost:3000/catalog/'+id +token,{headers: headers})
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
