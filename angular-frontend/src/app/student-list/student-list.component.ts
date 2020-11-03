import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: Student[];

  constructor(private studentServicce: StudentService, private router: Router) { }

  ngOnInit(): void {
    console.log("Here ngOnInit");
    this.getStudents();
  }

  private getStudents(){
    this.studentServicce.getStudentsList().subscribe(data=>{
      this.students = data;
    });
  }

  studentDetails(id: number){

    this.router.navigate(['getStudent', id]);
  }

  updateStudent(id: number){
    this.router.navigate(['updateStudent', id]);
  }

  deleteStudent(id: number){
    this.studentServicce.deleteStudent(id).subscribe(data=>{
      console.log(data);
      this.getStudents();
    })
  }  
}
