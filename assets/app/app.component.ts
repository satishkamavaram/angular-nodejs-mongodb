import { Component } from '@angular/core';

import { AuthService } from "./login/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService){

}
  /*  navHeaderValue = 1;

  onNavHeaderChange(navHeaderValue : number) {
    this.navHeaderValue = navHeaderValue;
  }

  isCatalog(){
    if(this.navHeaderValue==1){
      return true;
    }
    return false;
  }

  isShopping(){
    if(this.navHeaderValue==2){
      return true;
    }
    return false;
  }*/
  loggedIn(){
      return this.authService.isLoggedIn()
  }
}
