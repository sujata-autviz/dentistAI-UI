import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseDestroyCompoent } from '../../shared/utils/basedestroy';
import { PeriodontalChartService } from '../../core/services/periodontal-chart.service';
import { finalize, takeUntil } from 'rxjs';
import { PeriodontalChart, PeriodontalChartDto } from '../../interfaces/periodontal-chart';
import { Bleeding, clinicalAttachmentLevel, GingivalMargin, MucogingivalJunction, PocketDepth, Suppuration, Tooth } from '../../interfaces/tooth';
import { SpeechRecognitionService } from '../../core/services/speech-recognition.service';
import { VoiceRecognitionRequest } from '../../interfaces/voice-recognition-request';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-periodontal-chart',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './periodontal-chart.component.html',
  styleUrl: './periodontal-chart.component.scss'
})
export class PeriodontalChartComponent extends BaseDestroyCompoent implements OnInit {
  isEditMode: boolean = false; 
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

  pdValues: PocketDepth[] = [];
  gmValues: GingivalMargin[] = [];
  calValues: clinicalAttachmentLevel[] = [];
  bleedingValues: Bleeding[] = [];
  suppurationValues: Suppuration[] = [];
  mgjValues: MucogingivalJunction[] = [];
  constructor(private _periodontalChartService: PeriodontalChartService,
    private speechService : SpeechRecognitionService,
    private notificationService : NotificationsService
  ){
    super();
  }
  ngOnInit(): void {
    this.getPatientChart();
    this.generatePdValues()
    this.generateBleedingValues();
    this.generateGmValues();
    this.generateCalValues();
    this.generateSuppurationValues();
    this.generateMgjValues();


  }
  generatePdValues() {
    this.pdValues = []; // Reset the array before pushing values
    for (let i = 1; i <= 32; i++) {
      this.pdValues.push({
        toothNumber: i,
        pocketDepthBuccalLeft: 0,
        pocketDepthBuccalCenter: 0,
        pocketDepthBuccalRight: 0,
        pocketDepthLingualLeft: 0,
        pocketDepthLingualCenter: 0,
        pocketDepthLingualRight: 0,
      });
    }
    
  }

  // Generate Gingival Margin Values
generateGmValues() {
  this.gmValues = []; // Reset the array before pushing values
  for (let i = 1; i <= 32; i++) {
    this.gmValues.push({
      toothNumber: i,
      gingivalMarginBuccalLeft: 0,
      gingivalMarginBuccalCenter: 0,
      gingivalMarginBuccalRight: 0,
      gingivalMarginLingualLeft: 0,
      gingivalMarginLingualCenter: 0,
      gingivalMarginLingualRight: 0,
    });
  }
}

// Generate Clinical Attachment Level Values
generateCalValues() {
  this.calValues = []; // Reset the array before pushing values
  for (let i = 1; i <= 32; i++) {
    this.calValues.push({
      toothNumber: i,
      clinicalAttachmentLevelBuccalLeft: 0,
      clinicalAttachmentLevelBuccalCenter: 0,
      clinicalAttachmentLevelBuccalRight: 0,
      clinicalAttachmentLevelLingualLeft: 0,
      clinicalAttachmentLevelLingualCenter: 0,
      clinicalAttachmentLevelLingualRight: 0,
    });
  }
}

// Generate Bleeding Values
generateBleedingValues() {
  this.bleedingValues = []; // Reset the array before pushing values
  for (let i = 1; i <= 32; i++) {
    this.bleedingValues.push({
      toothNumber: i,
      isBleedingBuccalLeft: false,
      isBleedingBuccalCenter: false,
      isBleedingBuccalRight: false,
      isBleedingLingualLeft: false,
      isBleedingLingualCenter: false,
      isBleedingLingualRight: false,
    });
  }
}

// Generate Suppuration Values
generateSuppurationValues() {
  this.suppurationValues = []; // Reset the array before pushing values
  for (let i = 1; i <= 32; i++) {
    this.suppurationValues.push({
      toothNumber: i,
      isSuppurationBuccalLeft: false,
      isSuppurationBuccalCenter: false,
      isSuppurationBuccalRight: false,
      isSuppurationLingualLeft: false,
      isSuppurationLingualCenter: false,
      isSuppurationLingualRight: false,
    });
  }
}

generateMgjValues() {
  this.mgjValues = []; // Reset the array before pushing values
  for (let i = 1; i <= 32; i++) {
    this.mgjValues.push({
      toothNumber: i,
     mucogingivalJunctionBuccalLeft: 0,
     mucogingivalJunctionBuccalCenter: 0,
     mucogingivalJunctionBuccalRight: 0,
     mucogingivalJunctionLingualLeft: 0,
     mucogingivalJunctionLingualCenter: 0,
     mucogingivalJunctionLingualRight: 0,
    });
  }
}

  getPatientChart(){
  
    if(this.patientId)
      this._periodontalChartService.getChartsByPatientId(this.patientId).subscribe(
        response => {
          if (response.success) {
            this.charts = response.charts;
            this.chartId = response.charts[0].id;
            this.tenantId = response.charts[0].tenantId 
            this.updateValuesFromCharts();
          } else {
          }
        },
        error => {
          console.error('Error fetching charts:', error);
        
        }
      );
    }
      
    
    updateValuesFromCharts() {
      this.charts.forEach(chart => {
        chart.teeth.forEach(tooth => {
          // Update PD Values
          const pdIndex = this.pdValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (pdIndex !== -1) {
            this.pdValues[pdIndex].pocketDepthBuccalLeft = tooth.pocketDepthBuccalLeft;
            this.pdValues[pdIndex].pocketDepthBuccalCenter = tooth.pocketDepthBuccalCenter;
            this.pdValues[pdIndex].pocketDepthBuccalRight = tooth.pocketDepthBuccalRight;
            this.pdValues[pdIndex].pocketDepthLingualLeft = tooth.pocketDepthLingualLeft;
            this.pdValues[pdIndex].pocketDepthLingualCenter = tooth.pocketDepthLingualCenter;
            this.pdValues[pdIndex].pocketDepthLingualRight = tooth.pocketDepthLingualRight;
            this.pdValues[pdIndex].mobilityGrade = tooth.mobilityGrade;
          }
    
          // Update GM Values
          const gmIndex = this.gmValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (gmIndex !== -1) {
            this.gmValues[gmIndex].gingivalMarginBuccalLeft = tooth.gingivalMarginBuccalLeft;
            this.gmValues[gmIndex].gingivalMarginBuccalCenter = tooth.gingivalMarginBuccalCenter;
            this.gmValues[gmIndex].gingivalMarginBuccalRight = tooth.gingivalMarginBuccalRight;
            this.gmValues[gmIndex].gingivalMarginLingualLeft = tooth.gingivalMarginLingualLeft;
            this.gmValues[gmIndex].gingivalMarginLingualCenter = tooth.gingivalMarginLingualCenter;
            this.gmValues[gmIndex].gingivalMarginLingualRight = tooth.gingivalMarginLingualRight;
          }
    
          // Update CAL Values
          const calIndex = this.calValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (calIndex !== -1) {
            this.calValues[calIndex].clinicalAttachmentLevelBuccalLeft = tooth.clinicalAttachmentLevelBuccalLeft;
            this.calValues[calIndex].clinicalAttachmentLevelBuccalCenter = tooth.clinicalAttachmentLevelBuccalCenter;
            this.calValues[calIndex].clinicalAttachmentLevelBuccalRight = tooth.clinicalAttachmentLevelBuccalRight;
            this.calValues[calIndex].clinicalAttachmentLevelLingualLeft = tooth.clinicalAttachmentLevelLingualLeft;
            this.calValues[calIndex].clinicalAttachmentLevelLingualCenter = tooth.clinicalAttachmentLevelLingualCenter;
            this.calValues[calIndex].clinicalAttachmentLevelLingualRight = tooth.clinicalAttachmentLevelLingualRight;
          }
    
          // Update Bleeding Values
          const bleedingIndex = this.bleedingValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (bleedingIndex !== -1) {
            this.bleedingValues[bleedingIndex].isBleedingBuccalLeft = tooth.isBleedingBuccalLeft;
            this.bleedingValues[bleedingIndex].isBleedingBuccalCenter = tooth.isBleedingBuccalCenter;
            this.bleedingValues[bleedingIndex].isBleedingBuccalRight = tooth.isBleedingBuccalRight;
            this.bleedingValues[bleedingIndex].isBleedingLingualLeft = tooth.isBleedingLingualLeft;
            this.bleedingValues[bleedingIndex].isBleedingLingualCenter = tooth.isBleedingLingualCenter;
            this.bleedingValues[bleedingIndex].isBleedingLingualRight = tooth.isBleedingLingualRight;
          }
    
          // Update Suppuration Values
          const suppurationIndex = this.suppurationValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (suppurationIndex !== -1) {
            this.suppurationValues[suppurationIndex].isSuppurationBuccalLeft = tooth.isSuppurationBuccalLeft;
            this.suppurationValues[suppurationIndex].isSuppurationBuccalCenter = tooth.isSuppurationBuccalCenter;
            this.suppurationValues[suppurationIndex].isSuppurationBuccalRight = tooth.isSuppurationBuccalRight;
            this.suppurationValues[suppurationIndex].isSuppurationLingualLeft = tooth.isSuppurationLingualLeft;
            this.suppurationValues[suppurationIndex].isSuppurationLingualCenter = tooth.isSuppurationLingualCenter;
            this.suppurationValues[suppurationIndex].isSuppurationLingualRight = tooth.isSuppurationLingualRight;
          }
    
          // Update MGJ Values
          const mgjIndex = this.mgjValues.findIndex(item => item.toothNumber === tooth.toothNumber);
          if (mgjIndex !== -1) {
            this.mgjValues[mgjIndex].mucogingivalJunctionBuccalLeft = tooth.mucogingivalJunctionBuccalLeft;
            this.mgjValues[mgjIndex].mucogingivalJunctionBuccalCenter = tooth.mucogingivalJunctionBuccalCenter;
            this.mgjValues[mgjIndex].mucogingivalJunctionBuccalRight = tooth.mucogingivalJunctionBuccalRight;
            this.mgjValues[mgjIndex].mucogingivalJunctionLingualLeft = tooth.mucogingivalJunctionLingualLeft;
            this.mgjValues[mgjIndex].mucogingivalJunctionLingualCenter = tooth.mucogingivalJunctionLingualCenter;
            this.mgjValues[mgjIndex].mucogingivalJunctionLingualRight = tooth.mucogingivalJunctionLingualRight;
          }
        });
      });
    
      // Sort each array by toothNumber and limit to the first 16 entries
      this.pdValues.sort((a, b) => a.toothNumber - b.toothNumber);
      this.gmValues.sort((a, b) => a.toothNumber - b.toothNumber);
      this.calValues.sort((a, b) => a.toothNumber - b.toothNumber);
      this.bleedingValues.sort((a, b) => a.toothNumber - b.toothNumber);
      this.suppurationValues.sort((a, b) => a.toothNumber - b.toothNumber);
      this.mgjValues.sort((a, b) => a.toothNumber - b.toothNumber);
    
      this.pdValues = this.pdValues.slice(0, 32);
      this.gmValues = this.gmValues.slice(0, 32);
      this.calValues = this.calValues.slice(0, 32);
      this.bleedingValues = this.bleedingValues.slice(0, 32);
      this.suppurationValues = this.suppurationValues.slice(0, 32);
      this.mgjValues = this.mgjValues.slice(0, 32);
    }
    
    calculateCAL(value: any): void {
      const toothNumber = value.toothNumber;
      // Find the corresponding PD and GM values based on the tooth number
      const pdValue = this.pdValues.find(item => item.toothNumber === toothNumber);
      const gmValue = this.gmValues.find(item => item.toothNumber === toothNumber);
    
      // Find the index in the calValues array to update the CAL for the specific tooth
      const calIndex = this.calValues.findIndex(item => item.toothNumber === toothNumber);
    
      if (calIndex !== -1 && pdValue && gmValue) {
        // Calculate CAL for each region (Buccal and Lingual) using PD and GM values
        this.calValues[calIndex].clinicalAttachmentLevelBuccalLeft =
          (pdValue.pocketDepthBuccalLeft ?? 0) + (gmValue.gingivalMarginBuccalLeft ?? 0);
        
        this.calValues[calIndex].clinicalAttachmentLevelBuccalCenter =
          (pdValue.pocketDepthBuccalCenter ?? 0) + (gmValue.gingivalMarginBuccalCenter ?? 0);
        
        this.calValues[calIndex].clinicalAttachmentLevelBuccalRight =
          (pdValue.pocketDepthBuccalRight ?? 0) + (gmValue.gingivalMarginBuccalRight ?? 0);
        
        this.calValues[calIndex].clinicalAttachmentLevelLingualLeft =
          (pdValue.pocketDepthLingualLeft ?? 0) + (gmValue.gingivalMarginLingualLeft ?? 0);
        
        this.calValues[calIndex].clinicalAttachmentLevelLingualCenter =
          (pdValue.pocketDepthLingualCenter ?? 0) + (gmValue.gingivalMarginLingualCenter ?? 0);
        
        this.calValues[calIndex].clinicalAttachmentLevelLingualRight =
          (pdValue.pocketDepthLingualRight ?? 0) + (gmValue.gingivalMarginLingualRight ?? 0);
        
        console.log(`Updated CAL for Tooth Number ${toothNumber}:`, this.calValues[calIndex]);
      } else {
        // If the PD or GM value is not found, log a warning message
        console.warn(`Tooth with number ${toothNumber} not found in PD or GM values.`);
      }
    }
    
  
saveChart() {
  this.teeth = this.pdValues.map(pd => {
    const gm = this.gmValues.find(item => item.toothNumber === pd.toothNumber);
    const cal = this.calValues.find(item => item.toothNumber === pd.toothNumber);
    const bleeding = this.bleedingValues.find(item => item.toothNumber === pd.toothNumber);
    const suppuration = this.suppurationValues.find(item => item.toothNumber === pd.toothNumber);
    const mgj = this.mgjValues.find(item => item.toothNumber === pd.toothNumber);

    return {
      hasImplant : false,
      isMissingTooth : false,
      tenantId : this.tenantId,
      chartId : this.chartId,
      toothNumber: pd.toothNumber,
      notes :"",
      mobilityGrade : pd.mobilityGrade,
      pocketDepthBuccalLeft: pd.pocketDepthBuccalLeft,
      pocketDepthBuccalCenter: pd.pocketDepthBuccalCenter,
      pocketDepthBuccalRight: pd.pocketDepthBuccalRight,
      pocketDepthLingualLeft: pd.pocketDepthLingualLeft,
      pocketDepthLingualCenter: pd.pocketDepthLingualCenter,
      pocketDepthLingualRight: pd.pocketDepthLingualRight,

      gingivalMarginBuccalLeft: gm?.gingivalMarginBuccalLeft || 0,
      gingivalMarginBuccalCenter: gm?.gingivalMarginBuccalCenter || 0,
      gingivalMarginBuccalRight: gm?.gingivalMarginBuccalRight || 0,
      gingivalMarginLingualLeft: gm?.gingivalMarginLingualLeft || 0,
      gingivalMarginLingualCenter: gm?.gingivalMarginLingualCenter || 0,
      gingivalMarginLingualRight: gm?.gingivalMarginLingualRight || 0,

      clinicalAttachmentLevelBuccalLeft: cal?.clinicalAttachmentLevelBuccalLeft || 0,
      clinicalAttachmentLevelBuccalCenter: cal?.clinicalAttachmentLevelBuccalCenter || 0,
      clinicalAttachmentLevelBuccalRight: cal?.clinicalAttachmentLevelBuccalRight || 0,
      clinicalAttachmentLevelLingualLeft: cal?.clinicalAttachmentLevelLingualLeft || 0,
      clinicalAttachmentLevelLingualCenter: cal?.clinicalAttachmentLevelLingualCenter || 0,
      clinicalAttachmentLevelLingualRight: cal?.clinicalAttachmentLevelLingualRight || 0,

      isBleedingBuccalLeft: bleeding?.isBleedingBuccalLeft || false,
      isBleedingBuccalCenter: bleeding?.isBleedingBuccalCenter || false,
      isBleedingBuccalRight: bleeding?.isBleedingBuccalRight || false,
      isBleedingLingualLeft: bleeding?.isBleedingLingualLeft || false,
      isBleedingLingualCenter: bleeding?.isBleedingLingualCenter || false,
      isBleedingLingualRight: bleeding?.isBleedingLingualRight || false,

      isSuppurationBuccalLeft: suppuration?.isSuppurationBuccalLeft || false,
      isSuppurationBuccalCenter: suppuration?.isSuppurationBuccalCenter || false,
      isSuppurationBuccalRight: suppuration?.isSuppurationBuccalRight || false,
      isSuppurationLingualLeft: suppuration?.isSuppurationLingualLeft || false,
      isSuppurationLingualCenter: suppuration?.isSuppurationLingualCenter || false,
      isSuppurationLingualRight: suppuration?.isSuppurationLingualRight || false,

      mucogingivalJunctionBuccalLeft: mgj?.mucogingivalJunctionBuccalLeft || 0,
      mucogingivalJunctionBuccalCenter: mgj?.mucogingivalJunctionBuccalCenter || 0,
      mucogingivalJunctionBuccalRight: mgj?.mucogingivalJunctionBuccalRight || 0,
      mucogingivalJunctionLingualLeft: mgj?.mucogingivalJunctionLingualLeft || 0,
      mucogingivalJunctionLingualCenter: mgj?.mucogingivalJunctionLingualCenter || 0,
      mucogingivalJunctionLingualRight: mgj?.mucogingivalJunctionLingualRight || 0,
    };
  });

  this._periodontalChartService.addOrUpdateTeeth(this.patientId, this.teeth)
    .subscribe(response => {
      if (response.success) {
        this.notificationService.successAlert('Chart saved successfully!')
        console.log('Chart saved successfully!');
      }
    }, error => {
      console.error('Error saving chart:', error);
    });
}

  toggleRecording() {
    if (this.isRecording) {
     // this.stopRecording();
    } else {
      this.startRecognition();
    }
  }

  startRecognition() {
    const request: VoiceRecognitionRequest = {
      tenantId: this.tenantId,
      chartId: this.chartId
    };

    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      this.speechService.startVoiceRecognition(request).subscribe(
        response => {
          if (response.success) {
            this.transcript = response.transcript; // Store the transcript
            this.processTranscript(this.transcript);
            this.isRecording = false; // Process the transcript
          } else {
            this.isRecording = false;
            console.error('Error:', response.Message);
          }
        },
        error => {
          this.isRecording = false;
          console.error('Error starting voice recognition:', error);
        }
      );
    }
  }
  processTranscript(transcript: string): void {
    debugger
    const lines = transcript.toLowerCase().split('.');
    for (const line of lines) {
      const toothMatches = line.match(/(?:tooth|teeth)\s+(?:number\s+)?(\d+(?:\s*,\s*\d+)*)/i);
      if (toothMatches) {
        const toothNumbers = toothMatches[1].split(',').map(num => parseInt(num.trim(), 10));
        for (const toothNumber of toothNumbers) {
          debugger
          this.updateToothData(toothNumber, line);
        }
      }
    }

  }


  private updateToothData(toothNumber: number, data: string): void {
    debugger
    const pd = this.pdValues.find(item => item.toothNumber === toothNumber);
    const gm = this.gmValues.find(item => item.toothNumber === toothNumber);
    const cal = this.calValues.find(item => item.toothNumber === toothNumber);
    const bleeding = this.bleedingValues.find(item => item.toothNumber === toothNumber);
    const suppuration = this.suppurationValues.find(item => item.toothNumber === toothNumber);
    const mgj = this.mgjValues.find(item => item.toothNumber === toothNumber);

    if (pd) {
      const mobilityMatch = data.match(/mobility (\d+)/i);
        if (mobilityMatch) {
          pd.mobilityGrade = parseInt(mobilityMatch[1], 10);
        }

        const pdBuccalMatch = data.match(/(?:pd|pocket depth)\s+(?:buccal|buccle|buckle)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
        if (pdBuccalMatch) {
          if (pdBuccalMatch[2] && pdBuccalMatch[3]) {
            pd.pocketDepthBuccalLeft = parseInt(pdBuccalMatch[1], 10);
            pd.pocketDepthBuccalCenter = parseInt(pdBuccalMatch[2], 10);
            pd.pocketDepthBuccalRight = parseInt(pdBuccalMatch[3], 10);
          } else {
            pd.pocketDepthBuccalLeft = parseInt(pdBuccalMatch[1], 10);
            pd.pocketDepthBuccalCenter = parseInt(pdBuccalMatch[1], 10);
            pd.pocketDepthBuccalRight = parseInt(pdBuccalMatch[1], 10);
          }
        }
  
        const pdLingualMatch = data.match(/(?:pd|pocket depth)\s+(?:lingual|lingue)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
        if (pdLingualMatch) {
          if (pdLingualMatch[2] && pdLingualMatch[3]) {
            pd.pocketDepthLingualLeft = parseInt(pdLingualMatch[1], 10);
            pd.pocketDepthLingualCenter = parseInt(pdLingualMatch[2], 10);
            pd.pocketDepthLingualRight = parseInt(pdLingualMatch[3], 10);
          } else {
            pd.pocketDepthLingualLeft = parseInt(pdLingualMatch[1], 10);
            pd.pocketDepthLingualCenter = parseInt(pdLingualMatch[1], 10);
            pd.pocketDepthLingualRight = parseInt(pdLingualMatch[1], 10);
          }
        }
      }
      
 

      if (gm) {
        const gmBuccalMatch = data.match(/gm\s+(?:buccal|buccle|buckle)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
        if (gmBuccalMatch) {
          if (gmBuccalMatch[2] && gmBuccalMatch[3]) {
            gm.gingivalMarginBuccalLeft = parseInt(gmBuccalMatch[1], 10);
            gm.gingivalMarginBuccalCenter = parseInt(gmBuccalMatch[2], 10);
            gm.gingivalMarginBuccalRight = parseInt(gmBuccalMatch[3], 10);
          } else {
            gm.gingivalMarginBuccalLeft = parseInt(gmBuccalMatch[1], 10);
            gm.gingivalMarginBuccalCenter = parseInt(gmBuccalMatch[1], 10);
            gm.gingivalMarginBuccalRight = parseInt(gmBuccalMatch[1], 10);
          }
        }
  
        const gmLingualMatch = data.match(/gm\s+(?:lingual|lingue)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
        if (gmLingualMatch) {
          if (gmLingualMatch[2] && gmLingualMatch[3]) {
            gm.gingivalMarginLingualLeft = parseInt(gmLingualMatch[1], 10);
            gm.gingivalMarginLingualCenter = parseInt(gmLingualMatch[2], 10);
            gm.gingivalMarginLingualRight = parseInt(gmLingualMatch[3], 10);
          } else {
            gm.gingivalMarginLingualLeft = parseInt(gmLingualMatch[1], 10);
            gm.gingivalMarginLingualCenter = parseInt(gmLingualMatch[1], 10);
            gm.gingivalMarginLingualRight = parseInt(gmLingualMatch[1], 10);
          }
        }
      }
    if (cal) {
      // Calculate CAL based on PD and GM
      if (pd && gm) {
        cal.clinicalAttachmentLevelBuccalLeft = (pd.pocketDepthBuccalLeft || 0) + (gm.gingivalMarginBuccalLeft || 0);
        cal.clinicalAttachmentLevelBuccalCenter = (pd.pocketDepthBuccalCenter || 0) + (gm.gingivalMarginBuccalCenter || 0);
        cal.clinicalAttachmentLevelBuccalRight = (pd.pocketDepthBuccalRight || 0) + (gm.gingivalMarginBuccalRight || 0);
        cal.clinicalAttachmentLevelLingualLeft = (pd.pocketDepthLingualLeft || 0) + (gm.gingivalMarginLingualLeft || 0);
        cal.clinicalAttachmentLevelLingualCenter = (pd.pocketDepthLingualCenter || 0) + (gm.gingivalMarginLingualCenter || 0);
        cal.clinicalAttachmentLevelLingualRight = (pd.pocketDepthLingualRight || 0) + (gm.gingivalMarginLingualRight || 0);
      }
    }

    // if (bleeding) {
    //   const bleedingMatch = data.match(/bleeding (buccal|lingual) (left|center|right)/i);
    //   if (bleedingMatch) {
    //     const surface = bleedingMatch[1].toLowerCase();
    //     const position = bleedingMatch[2].toLowerCase();
    //     const key = `isBleeding${surface.charAt(0).toUpperCase() + surface.slice(1)}${position.charAt(0).toUpperCase() + position.slice(1)}` as keyof Bleeding;
    //     bleeding[key] = true;
    //   }
    // }

    // if (suppuration) {
    //   const suppurationMatch = data.match(/suppuration (buccal|lingual) (left|center|right)/i);
    //   if (suppurationMatch) {
    //     const surface = suppurationMatch[1].toLowerCase();
    //     const position = suppurationMatch[2].toLowerCase();
    //     const key = `isSuppuration${surface.charAt(0).toUpperCase() + surface.slice(1)}${position.charAt(0).toUpperCase() + position.slice(1)}` as keyof Suppuration;
    //     suppuration[key] = true;
    //   }
    // }

    if (mgj) {
      const mgjBuccalMatch = data.match(/mgj\s+(?:buccal|buccle|buckle)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
      if (mgjBuccalMatch) {
        if (mgjBuccalMatch[2] && mgjBuccalMatch[3]) {
          mgj.mucogingivalJunctionBuccalLeft = parseInt(mgjBuccalMatch[1], 10);
          mgj.mucogingivalJunctionBuccalCenter = parseInt(mgjBuccalMatch[2], 10);
          mgj.mucogingivalJunctionBuccalRight = parseInt(mgjBuccalMatch[3], 10);
        } else {
          mgj.mucogingivalJunctionBuccalLeft = parseInt(mgjBuccalMatch[1], 10);
          mgj.mucogingivalJunctionBuccalCenter = parseInt(mgjBuccalMatch[1], 10);
          mgj.mucogingivalJunctionBuccalRight = parseInt(mgjBuccalMatch[1], 10);
        }
      }

      const mgjLingualMatch = data.match(/mgj\s+(?:lingual|lingue)\s+(\d+)(?:\s+(\d+)\s+(\d+))?/i);
      if (mgjLingualMatch) {
        if (mgjLingualMatch[2] && mgjLingualMatch[3]) {
          mgj.mucogingivalJunctionLingualLeft = parseInt(mgjLingualMatch[1], 10);
          mgj.mucogingivalJunctionLingualCenter = parseInt(mgjLingualMatch[2], 10);
          mgj.mucogingivalJunctionLingualRight = parseInt(mgjLingualMatch[3], 10);
        } else {
          mgj.mucogingivalJunctionLingualLeft = parseInt(mgjLingualMatch[1], 10);
          mgj.mucogingivalJunctionLingualCenter = parseInt(mgjLingualMatch[1], 10);
          mgj.mucogingivalJunctionLingualRight = parseInt(mgjLingualMatch[1], 10);
        }
      }
    }
  }
//   processTranscript(transcript: string) {
//     const lines = transcript.split(','); // Split by commas for multiple entries
//     for (const line of lines) {
//         const toothMatch = line.match(/tooth (\d+)/i);
//         if (toothMatch) {
//             const toothNumber = parseInt(toothMatch[1], 10);
//             const tooth: Tooth = {
//                 tenantId: this.tenantId,
//                 chartId: this.chartId,
//                 toothNumber,
//                 isMissingTooth: false,
//                 hasImplant: false,
//                 isBleedingBuccalLeft: false,
//                 isBleedingBuccalCenter: false,
//                 isBleedingBuccalRight: false,
//                 isBleedingLingualLeft: false,
//                 isBleedingLingualCenter: false,
//                 isBleedingLingualRight: false,
//                 isSuppurationBuccalLeft: false,
//                 isSuppurationBuccalCenter: false,
//                 isSuppurationBuccalRight: false,
//                 isSuppurationLingualLeft: false,
//                 isSuppurationLingualCenter: false,
//                 isSuppurationLingualRight: false,
//             };

//             // Check for mobility
//             const mobilityMatch = line.match(/mobility (\d+)/i);
//             if (mobilityMatch) {
//                 tooth.mobilityGrade = parseInt(mobilityMatch[1], 10);
//             }

//             // Check for pocket depth
//             const pdMatch = line.match(/(?:pocket depth|pd) buccal (\d+) (\d+) (\d+)/i);
//             if (pdMatch) {
//                 tooth.pocketDepthBuccalLeft = parseInt(pdMatch[1], 10);
//                 tooth.pocketDepthBuccalCenter = parseInt(pdMatch[2], 10);
//                 tooth.pocketDepthBuccalRight = parseInt(pdMatch[3], 10);
//             }

//             const pdLingualMatch = line.match(/(?:pocket depth|pd) lingual (\d+) (\d+) (\d+)/i);
//             if (pdLingualMatch) {
//                 tooth.pocketDepthLingualLeft = parseInt(pdLingualMatch[1], 10);
//                 tooth.pocketDepthLingualCenter = parseInt(pdLingualMatch[2], 10);
//                 tooth.pocketDepthLingualRight = parseInt(pdLingualMatch[3], 10);
//             }

//             // Check for clinical attachment level
//             const calMatch = line.match(/(?:clinical attachment level|cal) buccal (\d+) (\d+) (\d+)/i);
//             if (calMatch) {
//                 tooth.clinicalAttachmentLevelBuccalLeft = parseInt(calMatch[1], 10);
//                 tooth.clinicalAttachmentLevelBuccalCenter = parseInt(calMatch[2], 10);
//                 tooth.clinicalAttachmentLevelBuccalRight = parseInt(calMatch[3], 10);
//             }

//             const calLingualMatch = line.match(/(?:clinical attachment level|cal) lingual (\d+) (\d+) (\d+)/i);
//             if (calLingualMatch) {
//                 tooth.clinicalAttachmentLevelLingualLeft = parseInt(calLingualMatch[1], 10);
//                 tooth.clinicalAttachmentLevelLingualCenter = parseInt(calLingualMatch[2], 10);
//                 tooth.clinicalAttachmentLevelLingualRight = parseInt(calLingualMatch[3], 10);
//             }

//             // Check for bleeding
//             if (line.includes('bleeding')) {
//                 tooth.isBleedingBuccalLeft = true;
//                 tooth.isBleedingBuccalCenter = true;
//                 tooth.isBleedingBuccalRight = true;
//                 tooth.isBleedingLingualLeft = true;
//                 tooth.isBleedingLingualCenter = true;
//                 tooth.isBleedingLingualRight = true;
//             }

//             // Add or update the tooth in the teeth array
//             const existingToothIndex = this.teeth.findIndex(t => t.toothNumber === toothNumber);
//             if (existingToothIndex > -1) {
//                 this.teeth[existingToothIndex] = { ...this.teeth[existingToothIndex], ...tooth }; // Update existing tooth
//             } else {
//                 this.teeth.push(tooth); // Add new tooth
//             }
//         }
//     }

//     console.log(this.teeth); // Log the created Tooth objects
// }

  stopRecording() {
    // Logic to stop recording if needed
    this.isRecording = false; // Set recording state to false
  }
  getToothValue(toothNumber: number, property: keyof Tooth): number | boolean {
    const tooth = this.teeth.find(t => t.toothNumber === toothNumber);
    
    // Check if the tooth exists and the property is defined
    if (tooth && tooth[property] !== undefined) {
        const value = tooth[property];

        // Ensure the value is either a number or boolean
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value;
        }
    }

    // Return a default value if not found or type is incorrect
    return 0; // or false, depending on your logic
}

clearAll() {
  debugger
  this.generatePdValues(); // Reset to default values
  this.generateGmValues();
  this.generateCalValues();
  this.generateBleedingValues();
  this.generateSuppurationValues();
  this.generateMgjValues();
}
toggleEdit() {
  this.isEditMode = !this.isEditMode;
}
newReport(){

}

cancel(){

}
  }









