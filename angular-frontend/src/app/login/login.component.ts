import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LoginService } from '../login.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    if (this.loginService.loggedIn) {
      this.router.navigate(['/']);
    }
  }
}
