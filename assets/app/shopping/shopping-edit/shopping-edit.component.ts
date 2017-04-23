import { Component,
   OnInit,
   ViewChild,
   OnDestroy
   } from '@angular/core';
import {ShoppingItem} from '../../shared/shoppingItem.model';
import {ShoppingService} from '../shopping.service';
import {NgForm } from '@angular/forms';
import {Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

  @ViewChild('shoppingForm') shoppingForm : NgForm;
  shoppingEditSubscription : Subscription;
  editMode : boolean  =  false;
  editIndex : number  ;
  editShoppingItem : ShoppingItem;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit() {
   this.shoppingEditSubscription =  this.shoppingService.editShoppingItem.subscribe(
      (index : number) => {
       this.editMode  =  true;
       this.editIndex  = index;
       this.editShoppingItem = this.shoppingService.getShoppingItem(index);
       this.shoppingForm.setValue({
           name : this.editShoppingItem.name,
           amount : this.editShoppingItem.amount
       });
      }
    );
  }

  onSubmit() {
    const amount = this.shoppingForm.value.amount;
    const name =this.shoppingForm.value.name;
    if(this.editMode)  {
        this.shoppingService.updateShoppingItem(this.editIndex,new ShoppingItem(name,amount));
        this.editMode  =  false;
    }
    else  {
      this.shoppingService.addShoppingItem(new ShoppingItem(name,amount));
    }
    this.shoppingForm.reset();
  }

  OnDelete() {
    this.shoppingService.deleteShoppingItem(this.editIndex);
    this.shoppingForm.reset();
    this.editMode  =  false;
  }

  OnClear(){
    this.shoppingForm.reset();
    this.editMode  =  false;
  }

  ngOnDestroy()
  {
    this.shoppingEditSubscription.unsubscribe();
  }

}
