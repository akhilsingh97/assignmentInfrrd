import { Component, EventEmitter, Input, Output } from '@angular/core';
import { departments } from '../department';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css',
})
export class ViewEmployeeComponent {
  @Input() data: any;
  @Output() editDataEvt = new EventEmitter<string>();
  @Output() deleteDataEvt = new EventEmitter<string>();
  departments: any;

  cloned: { [s: number]: any } = {};

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.departments = departments;
  }

  deleteEmployee(emp: any) {
    this.deleteDataEvt.emit(emp);
  }

  onRowEditInit(emp: any) {
    this.cloned[emp.id] = { ...emp };
  }

  //emitting event to edit employee
  onRowEditSave(emp: any) {
    this.editDataEvt.emit(emp);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Employee is updated',
    });
  }

  //delete confirmation popup
  confirm2(event: Event, emp: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.deleteEmployee(emp);
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  //cancel editing of event
  onRowEditCancel(emp: any, index: number) {
    this.data[index] = this.cloned[emp.id];
    delete this.cloned[emp.id];
  }
}
