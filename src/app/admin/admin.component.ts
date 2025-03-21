import { Component } from '@angular/core';
import { LoggedInHeaderComponent } from '../shared/components/logged-in-header/logged-in-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    LoggedInHeaderComponent,
    FooterComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}