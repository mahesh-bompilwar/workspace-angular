import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  id: number;
  student : Student =new Student();
  constructor(private studentService : StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe(data=>{
      this.student = data;
    }, error =>console.log(error));
  }

  onSubmit(){
    console.log(this.student);
    this.updateStudent();
    
  }
  updateStudent(){ 
    this.student.id = this.id;
    this.studentService.updateStudent(this.student).subscribe(data=>
      {

        this.goToStudentList();
      }, error=>console.log(error));
  }
  goToStudentList(){

    this.router.navigate(['/getStudents']);
    }
}
