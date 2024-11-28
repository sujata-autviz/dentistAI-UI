import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyCompoent } from '../../shared/utils/basedestroy';
import { PeriodontalChartService } from '../../core/services/periodontal-chart.service';
import { finalize, takeUntil } from 'rxjs';
import { PeriodontalChart } from '../../interfaces/periodontal-chart';

@Component({
  selector: 'app-periodontal-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './periodontal-chart.component.html',
  styleUrl: './periodontal-chart.component.scss'
})
export class PeriodontalChartComponent extends BaseDestroyCompoent implements OnInit {

  // patientId: string | null = null;
  patientId = '67457849dc74504f172751f9';
  periodontalChart: PeriodontalChart | undefined;
  menuShow: boolean = false;

  constructor(private _periodontalChartService: PeriodontalChartService) {
    super();
  }
  ngOnInit(): void {
    this.getPatientChart();

  }

  showMenu() {
    this.menuShow = !this.menuShow;
    console.log(this.menuShow);

  }


  getPatientChart() {
    this.patientId = '67457849dc74504f172751f9';
    if (this.patientId)
      this._periodontalChartService.getChartsByPatientId(this.patientId).pipe((takeUntil(this.destroy$), finalize(() => {
      }))).subscribe({
        next: (response: PeriodontalChart) => {
          this.periodontalChart = response;
          console.log(this.periodontalChart);
        },
        error: (err) => {

        },

      })
  }

}






