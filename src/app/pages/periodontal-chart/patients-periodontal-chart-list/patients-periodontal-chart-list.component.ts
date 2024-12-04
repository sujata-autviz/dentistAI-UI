
import { Component, Input } from '@angular/core';
import { PeriodontalChartService } from '../../../core/services/periodontal-chart.service';
import { AuthService } from '../../../core/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-patients-periodontal-chart-list',
  standalone: true,
  imports: [],
  templateUrl: './patients-periodontal-chart-list.component.html',
  styleUrl: './patients-periodontal-chart-list.component.scss',
  providers : [DatePipe]
})
export class PatientsPeriodontalChartListComponent {
  @Input() patientId: string =''; 
  tenantId:  string | null ='';
  charts: any[] = [];
  constructor(private chartService : PeriodontalChartService,
    private authService : AuthService
    
  ){
  this.tenantId = this.authService.getTenantIdFromCookie();
  }
  ngOnInit(): void {
    this.loadCharts();  
  }
loadCharts(): void {
  if(this.tenantId)
    this.chartService.getChartsByPatientAndTenantId(this.patientId, this.tenantId)
      .subscribe({
        next: (response) => {
          if (response?.Success) {
            this.charts = response.Charts;
            console.log('Charts retrieved successfully', this.charts);
          } else {
            console.error('Failed to retrieve charts:', response?.Message);
          }
        },
        error: (error) => {
          console.error('Error fetching charts:', error);
        }
      });
  }
}
