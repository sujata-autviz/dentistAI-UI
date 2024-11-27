import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountModule } from './account/account.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AccountModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dentistAi-ui';
}
