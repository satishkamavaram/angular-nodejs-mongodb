import { Component, OnInit } from '@angular/core';
import  {FormGroup,FormControl,Validators} from  '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserModel } from "./../user.model";
import { AuthService } from "./../auth.service";

@Component({
  selector : 'sign-up',
  templateUrl : './signup.component.html',
  styleUrls : ['./signup.component.css']
})
export class SignUpComponent implements OnInit{

 signupForm : FormGroup
 statusMessage : String;
 signUpSuccess : boolean;

 constructor(private route: ActivatedRoute,
   private router: Router,private authService: AuthService) {
}

  ngOnInit() {
      this.signupForm =  new FormGroup(
        {
          'fname' : new FormControl(null,[Validators.required]),
          'lname' : new FormControl(null,[Validators.required]),
          'email' : new FormControl(null,[Validators.required,Validators.email]),
          'pwd' : new FormControl(null,[Validators.required])
        }
      );
      console.log(this.signupForm);
    }

    OnSubmit(){
      if(this.signupForm.valid) {
      const user = new UserModel(
            this.signupForm.value.email,
            this.signupForm.value.pwd,
            this.signupForm.value.fname,
            this.signupForm.value.lname
      );
        this.authService.signUp(user)
            .subscribe(
                data => {
                  console.log(data);
                  this.signUpSuccess= true;
                  this.statusMessage =
                  "Hi "+ data.userId.lastName
                  + ", "+data.msg+ " ";
                },
                error =>  {
                  console.log(error);
                  this.signUpSuccess= false;
                  this.statusMessage =  error.title ;
                }
            );
        this.signupForm.reset();
      console.log(this.signupForm);
      }
    }

    clearForm(){
      this.signupForm.reset();
      this.statusMessage='';
      this.signUpSuccess= false;
      console.log(this.signupForm);
    }

     SignIn() {
       console.log(this.signupForm);
       this.router.navigate(["../login"]);
     }
}
