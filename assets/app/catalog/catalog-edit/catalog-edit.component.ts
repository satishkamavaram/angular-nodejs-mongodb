import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import  {FormGroup,FormControl,Validators,FormArray} from  '@angular/forms';

import {CatalogService} from './../catalog.service';
import {Catalog} from '../catalog.model';
import {Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-catalog-edit',
  templateUrl: './catalog-edit.component.html',
  styleUrls: ['./catalog-edit.component.css']
})
export class CatalogEditComponent implements OnInit ,OnDestroy{
  id: number
  editMode : boolean = false;
  catalogForm : FormGroup;
  imagePath ;
  message : string;
  catalogStatusMsgSubscription: Subscription;

  constructor(private route: ActivatedRoute,private catalogService:CatalogService,
      private router: Router) { }

  ngOnInit() {
    this.message = '';
    this.route.params
    .subscribe(
      (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id']!=null;
      this.initForm();
      }
    );

    this.catalogStatusMsgSubscription = this.catalogService.catalogMessage
    .subscribe(
      (message : string) => {
        this.message = message;
      }
    );

  }

  private initForm()  {
    let catalogName = '';
    let catalogDesc = '';
    let catalogImgPath = '';
    let catalogShoppingItem  = new FormArray([]);
    if(this.editMode){
      const catalog = this.catalogService.getCatalog(this.id);
      catalogName = catalog.name;
      catalogDesc = catalog.desc;
      catalogImgPath = catalog.imagePath;
      this.imagePath   = catalog.imagePath;
      if(catalog['shoppingItems']){
          for(let shoppingItem of catalog.shoppingItems){
            catalogShoppingItem.push(
              new FormGroup({
                'name': new FormControl(shoppingItem.name,Validators.required),
                'amount': new FormControl(shoppingItem.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
      }
    }
    this.catalogForm = new FormGroup({
      'name': new FormControl(catalogName,Validators.required),
      'desc': new FormControl(catalogDesc,Validators.required),
      'imagePath': new FormControl(catalogImgPath,Validators.required),
      'shoppingItems': catalogShoppingItem
    });
    console.log(this.catalogForm);
  }

  addShoppingItem() {
    (<FormArray>this.catalogForm.get('shoppingItems')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null,[Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  deleteShoppingItem(index : number){
      (<FormArray>this.catalogForm.get('shoppingItems')).removeAt(index);
  }

  onSubmit() {
    this.message = '';
    if(this.editMode) {
      this.catalogService.updateCatalog(this.id,this.catalogForm.value);
    }else {
      this.catalogService.addCatalog(this.catalogForm.value);
      this.catalogForm.reset();
      }
    //  this.router.navigate(["../"],{relativeTo:this.route});
    console.log(this.catalogForm);
  }

  onCancel(){
    this.router.navigate(["../"],{relativeTo:this.route});
  }

  ngOnDestroy()
  {
    this.catalogStatusMsgSubscription.unsubscribe();
  }

}
