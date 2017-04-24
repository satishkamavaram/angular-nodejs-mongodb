import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { UserModel } from "./user.model";
import {ShoppingService} from '../shopping/shopping.service';

@Injectable()
export class AuthService {

    constructor(private http: Http,
                private ShoppingService : ShoppingService) {}

    signUp(user:UserModel) {
         const body = JSON.stringify(user);
         const headers = new Headers({'Content-Type': 'application/json'});
         return this.http.post('http://localhost:3000/user', body, {headers: headers})
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

     signIn(user:UserModel) {
          const body = JSON.stringify(user);
          const headers = new Headers({'Content-Type': 'application/json'});
          return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
              .map((response: Response) => {
                console.log('response');
                console.log(response.json());
                return response.json()
                })
              .catch((error: Response) =>{
                console.log('error');
                console.log(error.json());
                return Observable.throw(error.json())
               });
      }

      logout(){
          localStorage.clear();
          this.ShoppingService.clearItems();
      }

      isLoggedIn(){
          return localStorage.getItem('token')!== null;
      }
}
