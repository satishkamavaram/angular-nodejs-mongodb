import { Component, OnInit } from '@angular/core';
import  {FormGroup,FormControl,Validators} from  '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserModel } from "./../user.model";
import { AuthService } from "./../auth.service";

@Component({
  selector : 'sign-in',
  templateUrl : './signin.component.html',
  styleUrls : ['./signin.component.css']
})
export class SignInComponent implements OnInit{

 signinForm : FormGroup

 constructor(private route: ActivatedRoute,
   private router: Router,
 private authService: AuthService) {
   this.loggedIn();
 }

  ngOnInit() {

      this.signinForm =  new FormGroup(
        {
          'email' : new FormControl(null,[Validators.required,Validators.email]),
          'pwd' : new FormControl(null,[Validators.required])
        }
      );
        console.log(this.signinForm);
    }

    OnSubmit(){
      if(this.signinForm.valid) {
        console.log(this.signinForm);
      const user = new UserModel(
            this.signinForm.value.email,
            this.signinForm.value.pwd
      );
  console.log(user);
        this.authService.signIn(user)
            .subscribe(
                data => {
                  console.log(data);
                  localStorage.setItem('token',data.token);
                  localStorage.setItem('userId',data.userId);
                  this.router.navigate(["/catalog"]);
                },
                error =>  {
                  console.log(error);

                }
            );
        this.signinForm.reset();

      }
    }

    SignUp() {
      console.log(this.signinForm);
      this.router.navigate(["../signup"]);
    }

    loggedIn(){
        if( this.authService.isLoggedIn()) {
          this.router.navigate(["/catalog"]);
        }
    }

}
