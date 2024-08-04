import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { departments  } from '../department';
import * as uuid from 'uuid';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
@Input() createFlag: any;
@Input() editableEmp: any
@Output() saveDataEvt = new EventEmitter<string>();
@Output() removeDataEvt = new EventEmitter<string>();
userForm : any;
department: any;
departments: any;
empData: any = [];
avatarsList: any = []
avatar: any
ngOnInit(){
  this.departments = departments
  this.userForm = this.fb.group({
    name: ['', Validators.required], 
    companyName: ['', Validators.required],
    email: ['', Validators.required],
    contact: ['', Validators.required],
    department: ['', Validators.required],
    avatar: ['', Validators.required],
  });

  for(let i=65;i<91; i++){
    this.avatarsList.push({label : String.fromCharCode(i), code: String.fromCharCode(i)})
 }


}

  constructor(private fb: FormBuilder) { };

  addUser() {
    let id = uuid.v4()
    this.userForm.value['id']= id;
    this.empData = this.userForm.value;
    if(this.editableEmp){
      this.removeDataEvt.emit(this.editableEmp)
    }
    this.saveDataEvt.emit(this.empData);
  }
}
