
import {EventEmitter,Injectable} from  '@angular/core';
import {Subject} from 'rxjs/Subject'
import {Catalog} from './catalog.model';
import {ShoppingItem} from '../shared/shoppingItem.model';
import {ShoppingService} from './../shopping/shopping.service';

@Injectable()
export class CatalogService
{

 catalogSelected = new EventEmitter<Catalog>();
 catalogChanged   = new Subject<Catalog[]>();

private  catalogs2: Catalog[] = [
    new Catalog("catalog1","catalogDesc1",
    "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
    [new ShoppingItem('book1','10'),
    new ShoppingItem('book2','20'),
  new ShoppingItem('book3','30')]),
    new Catalog("catalog2","catalogDesc2",
    "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
    [new ShoppingItem('book3','30'),
    new ShoppingItem('book4','40')])
  ];

  private  catalogs: Catalog[] = [
      new Catalog("NodeJS","ServerSide JavaScript Event Driven Programming",
      "https://firebearstudio.com/blog/wp-content/uploads/2016/01/Best-Node.JS-Books-1024x551.jpg",
      [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("MongoDB","Document Oriented NOSQL DB",
      "https://www.zoomdata.com/sites/default/files/styles/712_width/public/MongoDB_Logo_cropped.png?itok=jai5MXZh",
      [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("Angular 4","Google - JavaScript Frontend Framework",
  "https://cdn-images-1.medium.com/max/796/1*juPyda3wq9uz_SNFRLuANg@2x.png",
  [new ShoppingItem('book1','10'),
      new ShoppingItem('book2','20'),
    new ShoppingItem('book3','30')]),

   new Catalog("FullStack","Angular , NodeJs , MongoDB",
  "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARoAAAAJGFjZTcxNzJlLTI4MTAtNGM4NS04MjZhLTViYjEwZTU3YTA2ZA.png",
  [new ShoppingItem('book3','30'),
      new ShoppingItem('book4','40')])
    ];


  private  catalogs1 : Catalog[] = [

    ];

constructor(private shoppingService:ShoppingService){

}
getCatalogs() {
 return  this.catalogs.slice();  //gives copy of array
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

  addCatalog(catalog: Catalog){
  this.catalogs.push(catalog);
  this.catalogChanged.next(this.catalogs.slice());
  }

  updateCatalog(index : number,catalog: Catalog){
  this.catalogs[index] = catalog;
    this.catalogChanged.next(this.catalogs.slice());
  }

  deleteCatalog(index : number) {
    this.catalogs.splice(index,1);
    this.catalogChanged.next(this.catalogs.slice());
  }
}
