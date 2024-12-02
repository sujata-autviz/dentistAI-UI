import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodontalChart } from '../../interfaces/periodontal-chart';
import { AddOrUpdateTeethDto, Tooth } from '../../interfaces/tooth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodontalChartService {
  private apiUrl = `${environment.baseUrl}/api/PeriodontalChart`; // Adjust the base URL as necessary

  constructor(private http: HttpClient) {}

  // Get a chart by ID
  getChart(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetChart/${id}`);
  }

  // Get charts by patient ID
  getChartsByPatientId(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetChartsByPatientId/${patientId}`); // Call the GetChartsByPatientId endpoint
  }

  // Add a new chart
  addChart(chart: PeriodontalChart): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddChart`, chart);
  }

  // Update an existing chart
  updateChart(id: string, chart: PeriodontalChart): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateChart/${id}`, chart);
  }

  // Delete a chart
  deleteChart(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteChart/${id}`);
  }

  // Add or update teeth
  // addOrUpdateTeeth(patientId: string, teeth: Tooth[]): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/AddOrUpdateTeeth/${patientId}`, teeth);
  // }
  addOrUpdateTeeth(data: AddOrUpdateTeethDto): Observable<any> {
    const url = `${this.apiUrl}/AddOrUpdateTeeth`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(url, data, { headers });
  }

  getChartsByPatientAndTenantId(patientId: string, tenantId: string): Observable<any> {
    const params = new HttpParams()
      .set('patientId', patientId)
      .set('tenantId', tenantId);

    return this.http.get<any>(`${this.apiUrl}/GetChartsByPatientAndTenantId`, { params });
  }
}


