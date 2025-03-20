import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { NotificationsService, Options, SimpleNotificationsModule } from 'angular2-notifications';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleNotificationsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  authService = inject(AuthService)
  title = 'reto-events';
  notificationsOptions: Options = {
    position: ['top', 'right'],
    timeOut: 3000,
  };

  constructor(){
    this.authService.decodeToken();
  }


}
