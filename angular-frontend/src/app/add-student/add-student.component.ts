import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../validators/password.validator';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  //submitted = false;
  confirmedPasswordError: string = "";
  userNameExistError: string = "";

  student: Student = new Student();
  constructor(private studentService: StudentService,
    private router: Router, private formBuilder: FormBuilder) { }

  registerForm = new FormGroup({

    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    mobileNo: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });


  ngOnInit(): void {

  }

  addStudent() {
    this.studentService.addStudent(this.student).subscribe(data => {

      console.log(data);
      if (data.flag) {
        this.goToStudentList();
      }else{
        this.userNameExistError = "UserName Already Exist.";
        return;
      }
    },
      error => console.log(error));
  }

  goToStudentList() {

    this.router.navigate(['/getStudents']);
  }
  onSubmit() {
    //this.submitted = true;

    MustMatch('password', 'confirmPassword')

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if (this.password.value != this.confirmPassword.value) {
      this.confirmedPasswordError = "Confirmed password must be matched with password";
      return;
    } else {
      this.confirmedPasswordError = "";
    }


    console.log(this.student);
    this.addStudent();
  }
  onReset() {
    //this.submitted = false;
    this.registerForm.reset();
  }
  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get emailId() { return this.registerForm.get('emailId'); }
  get mobileNo() { return this.registerForm.get('mobileNo'); }
  get userName() { return this.registerForm.get('userName'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() {

    return this.registerForm.get('confirmPassword');
  }
}
