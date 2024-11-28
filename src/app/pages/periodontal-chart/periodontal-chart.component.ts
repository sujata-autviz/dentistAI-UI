import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyCompoent } from '../../shared/utils/basedestroy';
import { PeriodontalChartService } from '../../core/services/periodontal-chart.service';
import { finalize, takeUntil } from 'rxjs';
import { PeriodontalChart, PeriodontalChartDto } from '../../interfaces/periodontal-chart';
import { Tooth } from '../../interfaces/tooth';
import { SpeechRecognitionService } from '../../core/services/speech-recognition.service';
import { VoiceRecognitionRequest } from '../../interfaces/voice-recognition-request';

@Component({
  selector: 'app-periodontal-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './periodontal-chart.component.html',
  styleUrl: './periodontal-chart.component.scss'
})
export class PeriodontalChartComponent extends BaseDestroyCompoent implements OnInit {

  // patientId: string | null = null;
  patientId = '6745601e5e34594ff9d75afb';
  periodontalChart: PeriodontalChart | undefined
  charts: PeriodontalChartDto[] = []; 
  tenantId: string = ''; // Initialize with appropriate value
  chartId: string = ''; 
  teeth: Tooth[] = []; //
  transcript: string = '';
  transcripts: string[] = []; 
  isRecording: boolean = false;
  constructor(private _periodontalChartService: PeriodontalChartService,
    private speechService : SpeechRecognitionService
  ){
    super();
  }
  ngOnInit(): void {
    this.getPatientChart();

  }



  getPatientChart(){
  
    if(this.patientId)
      this._periodontalChartService.getChartsByPatientId(this.patientId).subscribe(
        response => {
          if (response.success) {
            this.charts = response.charts;
            this.chartId = response.charts[0].id;
            this.tenantId = response.charts[0].tenantId // Store the retrieved charts
            // Store the success message
          } else {
            
          }
        },
        error => {
          console.error('Error fetching charts:', error);
        
        }
      );
    }
      
    

    
  
  saveTeeth(): void {
    this._periodontalChartService.addOrUpdateTeeth(this.patientId, this.teeth).subscribe(response => {
      console.log(response);
      // Handle success response
    }, error => {
      console.error(error);
      // Handle error response
    });
  }

  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecognition();
    }
  }

  startRecognition() {
    debugger
    this.isRecording = true; // Set recording state to true
    const request: VoiceRecognitionRequest = {
      tenantId: this.tenantId,
      chartId: this.chartId
    };
    this.speechService.startVoiceRecognition(request).subscribe(
      response => {
        if (response.success) {
          this.transcript = response.transcript; 
          this.isRecording = false;// Store the transcript
        } else {
          console.error('Error:', response.Message);
          this.isRecording = false;
        }
      },
      error => {
        this.isRecording = false;
        console.error('Error starting voice recognition:', error);
      }
    );
  }
  stopRecording() {
    // Logic to stop recording if needed
    this.isRecording = false; // Set recording state to false
  }
  }








