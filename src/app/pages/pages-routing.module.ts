import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodontalChartComponent } from './periodontal-chart/periodontal-chart.component';
import { PatientsComponent } from './patients/patients.component';
import { AddPatientComponent } from './patients/add-patient/add-patient.component';
import { EditPatientComponent } from './patients/edit-patient/edit-patient.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PeriodontalChartComponent },
  { path: 'patient-list', component: PatientsComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'home', component: EditPatientComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
