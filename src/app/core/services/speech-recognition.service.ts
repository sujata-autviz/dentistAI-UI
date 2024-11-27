import { Injectable } from '@angular/core';
declare var annyang: any;
@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private updateChartCallback!: (toothNumber: number, mobility: string, pd: string) => void;

 
  constructor() {
    if (annyang) {
      // Set up the commands
      const commands = {
        'tooth *number mobility *value': (number: string, value: string) => {
          const toothNumber = parseInt(number);
          this.updateChartCallback(toothNumber, value, ''); // Call the callback to update mobility
        },
        'tooth *number pd *value': (number: string, value: string) => {
          const toothNumber = parseInt(number);
          this.updateChartCallback(toothNumber, '', value); // Call the callback to update PD
        }
      };

      // Add the commands to annyang
      annyang.addCommands(commands);
    }
  }

  startRecognition(updateChart: (toothNumber: number, mobility: string, pd: string) => void) {
    this.updateChartCallback = updateChart; // Store the callback
    if (annyang) {
      annyang.start();
    }
  }

  stopRecognition() {
    if (annyang) {
      annyang.abort();
    }
  }
}