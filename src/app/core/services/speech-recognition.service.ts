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
  // private apiUrl = `${environment.baseUrl}/api/Speech`; // Replace with your .NET API URL

  // constructor(private http: HttpClient) {}

  // startVoiceRecognition(request: VoiceRecognitionRequest): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/Start`, request); // Call the Start endpoint
  // }

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  public audioUrl: string | null = null;
  public isRecording: boolean = false;

  // Start recording
  startRecording(): void {
    this.isRecording = true;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
          this.audioUrl = URL.createObjectURL(audioBlob);
          this.audioChunks = []; // Reset the audio chunks for future recordings
        };
      })
      .catch(error => console.error('Error accessing media devices.', error));
  }

  // Stop recording
  stopRecording(): void {
    this.isRecording = false;
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }

  // Download the audio file
  downloadAudio(): void {
    if (this.audioUrl) {
      const a = document.createElement('a');
      a.href = this.audioUrl;
      a.download = 'recorded-audio.mp3';
      a.click();
    }
  }
}
