import { Injectable } from "@angular/core";
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from "@angular/router";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from "./user.model";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGaurdService implements CanActivate {

    constructor( private authService: AuthService,private router: Router) {}

    canActivate(route:ActivatedRouteSnapshot,
                state : RouterStateSnapshot):
                Observable<boolean> |Promise<boolean>|boolean {
       if(this.authService.isLoggedIn())
       {
         return true;
       }else {
         this.router.navigate(["/login"]);
       }
    }
}
