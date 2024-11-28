import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VoiceRecognitionRequest } from '../../interfaces/voice-recognition-request';
declare var annyang: any;
@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private apiUrl = `${environment.baseUrl}/api/Speech`; // Replace with your .NET API URL

  constructor(private http: HttpClient) {}

  startVoiceRecognition(request: VoiceRecognitionRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/Start`, request); // Call the Start endpoint
  }
}