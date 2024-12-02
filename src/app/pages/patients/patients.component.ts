import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [TableModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {

  products = [
    {
      "serialNo": 1,
      "name": "John Doe",
      "patientId": "P1001",
      "dateOfBirth": "1985-07-12",
      "mobile": "1234567890",
      "edit": true
    },
    {
      "serialNo": 2,
      "name": "Jane Smith",
      "patientId": "P1002",
      "dateOfBirth": "1990-03-05",
      "mobile": "9876543210",
      "edit": true
    },
    {
      "serialNo": 3,
      "name": "Alice Brown",
      "patientId": "P1003",
      "dateOfBirth": "1992-11-22",
      "mobile": "5556667777",
      "edit": true
    },
    {
      "serialNo": 4,
      "name": "Bob White",
      "patientId": "P1004",
      "dateOfBirth": "1988-01-14",
      "mobile": "4443332222",
      "edit": true
    },
    {
      "serialNo": 5,
      "name": "Charlie Green",
      "patientId": "P1005",
      "dateOfBirth": "1980-06-30",
      "mobile": "9998887777",
      "edit": true
    },
    {
      "serialNo": 6,
      "name": "Diana Blue",
      "patientId": "P1006",
      "dateOfBirth": "1995-09-09",
      "mobile": "6665554444",
      "edit": true
    },
    {
      "serialNo": 7,
      "name": "Ethan Grey",
      "patientId": "P1007",
      "dateOfBirth": "1982-04-17",
      "mobile": "3332221111",
      "edit": true
    },
    {
      "serialNo": 8,
      "name": "Fiona Red",
      "patientId": "P1008",
      "dateOfBirth": "1989-08-23",
      "mobile": "1112223333",
      "edit": true
    },
    {
      "serialNo": 9,
      "name": "George Yellow",
      "patientId": "P1009",
      "dateOfBirth": "1997-12-01",
      "mobile": "4445556666",
      "edit": true
    },
    {
      "serialNo": 10,
      "name": "Hannah Pink",
      "patientId": "P1010",
      "dateOfBirth": "1991-02-15",
      "mobile": "7778889999",
      "edit": true
    }
  ]


}
