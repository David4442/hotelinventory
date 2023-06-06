import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],

})
export class EmployeeComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private roomsService: RoomsService) {}
  empName: string = 'John';
}
