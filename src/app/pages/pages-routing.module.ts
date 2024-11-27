import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodontalChartComponent } from './periodontal-chart/periodontal-chart.component';

const routes: Routes = [
  { path : '' ,redirectTo: 'home', pathMatch: 'full' },
  { path: 'home' , component: PeriodontalChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
