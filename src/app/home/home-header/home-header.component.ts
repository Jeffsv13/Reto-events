import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [MatButtonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent {
  authService = inject(AuthService);
  searchBarFormControl = new FormControl();
  @Output() searchValueChange = new EventEmitter<string>();

  constructor(){
    this.searchBarFormControl.valueChanges.subscribe(
      (value: string)=>{
        this.searchValueChange.emit(value);
      }
    );
  }
}
