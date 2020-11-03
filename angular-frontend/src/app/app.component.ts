import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { LoginService } from '../app/login.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Spring Boot JPA APP';

  constructor(private loginService: LoginService,
    private router: Router, private formBuilder: FormBuilder) { }

 
  ngOnInit(): void {

    if (this.loginService.loggedIn) {
      this.router.navigate(['/']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
