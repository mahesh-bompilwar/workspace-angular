import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  id: number
  student: Student

  constructor(private studentService : StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.id = this.activatedRoute.snapshot.params['id'];
    this.studentService.getStudentById(this.id).subscribe(data=>{
      this.student = data;
    }, error =>console.log(error));
  }


}
