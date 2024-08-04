import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'emp-management';
  createFlag: boolean = false;
  editableEmp: any;
  empData: any = [];

  addEmployee() {
    this.createFlag = true;
  }

  //to add the employees to the data list on submit button
  addItem(newItem: any) {
    this.empData.push(newItem);
    this.createFlag = false;
  }

  //to edit the employee on click of edit button from view component
  editEmployee(emp: any) {
    this.empData = this.removeObjectWithId(this.empData, emp.id);
    this.empData.push(emp);
  }

  //to delete the employee on delete button from view component
  deleteEmployee(emp: any) {
    this.empData = this.removeObjectWithId(this.empData, emp.id);
  }

  //generic function to filter an object
  removeObjectWithId(arr: any, id: number) {
    return arr.filter((obj: any) => obj.id !== id);
  }
}
