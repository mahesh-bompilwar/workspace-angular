import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {  AuthenticationService } from '../_services/authentication.service';
import {  DashboardService } from '../_services/dashboard.service';
import { AlertService } from '../_services/alert.service';
import {LoginModel} from '../_models/login';

import {User} from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  loginModel = new LoginModel;

  user : User =new User();

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private dashboardService: DashboardService,
      private alertService: AlertService
      
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

      //for service to component
      this.authenticationService.dashboard(this.getUser.bind(this));
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;

      console.log(this.f.username.value);
      console.log(this.f.password.value);
      

      //this.loginModel.username = String(this.f.username.value);
      //this.loginModel.password = String(this.f.password.value);

      this.loginModel.username = this.f.username.value;
      this.loginModel.password = this.f.password.value;
      
      this.authenticationService.login(this.loginModel)
          .pipe(first())
          .subscribe(
              data => {
                  //
                //   this.dashboardService.getUser(data)
                //     .pipe(first())
                //     .subscribe(
                //         userDdata=>{
                //             this.user = userDdata;
                //         },
                //        error => {
                //           this.alertService.error(error);
                //           this.loading = false;
                //        });

                //        if(this.user.role==="ADMIN"){
                //            console.log("----------------ADMIN---");
                //         this.router.navigate([this.returnUrl]);
                //        }else if(this.user.role==="USER"){
                //         console.log("----------------USER---");
                //         this.router.navigate([this.returnUrl]);
                //        }
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });


              // getUser();
             
  }

  getUser(){
    let currentUser = this.authenticationService.currentUserValue;
    console.log("----------currentUser----1------"+currentUser);
    
  if (currentUser && currentUser.token) {

    console.log("----------currentUser----2------"+currentUser);

    this.dashboardService.getUser(currentUser)
    .pipe(first())
    .subscribe(
        userDdata=>{
            this.user = userDdata;
            console.log("--------userDdata-------"+userDdata);
            this.redirectToDashboard();
        },
       error => {
          this.alertService.error(error);
          this.loading = false;
       });

       
      }
  }

  redirectToDashboard(){
    console.log("---------this.user.role---------"+this.user.role);

    if(this.user.role=="ADMIN"){
        console.log("----------------ADMIN---");
     this.router.navigate(['/admin']);
    }else if(this.user.role=="USER"){
     console.log("----------------USER---");
     this.router.navigate(['/user']);
    }
  }
}