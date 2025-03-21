import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { eventRequest } from './eventRequest.model';
import { EventsService } from './events.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HomeService } from '../../home/home.service';
import { Genre } from '../../shared/models/genre.model';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  viewMode: string = 'registro';
  notifications = inject(NotificationsService);
  eventsService = inject(EventsService);
  homeService = inject(HomeService);
  router = inject(Router);
  setViewMode(mode: string) {
    this.viewMode = mode;
  }
  genres: Genre[] = [];
  currentGenre = new FormControl(1);
  searchGenreValue = 0;
  ngOnInit(): void {
    this.homeService.getData().subscribe((response) =>{
      console.log("API Response:", response);
      this.genres = response.genres;
    });

    this.currentGenre.valueChanges.subscribe(
      (value) =>{
        this.searchGenreValue = value || 0;
      }
    );
  }
  registerForm = new FormGroup({
    Title: new FormControl('',[Validators.required,Validators.maxLength(99)]),
    Description: new FormControl('',[Validators.required, Validators.maxLength(199)]),
    ExtendedDescription: new FormControl('',[Validators.required, Validators.maxLength(999)]),
    Place: new FormControl('',[Validators.required, Validators.maxLength(99)]),
    UnitPrice: new FormControl('',[Validators.required]),
    GenreId: new FormControl('',[Validators.required]),
    DateEvent: new FormControl('',[Validators.required]),
    TimeEvent: new FormControl('',[Validators.required]),
    Image: new FormControl('Prueba',[Validators.required]),
    TicketsQuantity: new FormControl('',[Validators.required]),
  })
  
  register(){
    const body: eventRequest = {
      Title: this.registerForm.controls.Title.value!,
      Description: this.registerForm.controls.Description.value!,
      ExtendedDescription: this.registerForm.controls.ExtendedDescription.value!,
      Place: this.registerForm.controls.Place.value!,
      UnitPrice: Number.parseFloat(this.registerForm.controls.UnitPrice.value!),
      GenreId: Number.parseInt(this.registerForm.controls.GenreId.value!),
      DateEvent: this.registerForm.controls.DateEvent.value!,
      TimeEvent: this.registerForm.controls.TimeEvent.value!,
      Image: this.registerForm.controls.Image.value!,
      TicketsQuantity: Number.parseFloat(this.registerForm.controls.TicketsQuantity.value!),
    }
    this.eventsService.register(body).pipe(
          catchError((res:HttpErrorResponse)=>{
            console.log('error: ', res.error.errorMessage);
            this.notifications.error('Error',res.error.errorMessage);
            return EMPTY;
          })
    ).subscribe((response)=>{
      this.notifications.success('Registro exitoso','Se registro el evento con exitosamente.');
      this.router.navigate(['/']);
    })
  }

  selectedImage: string | null = null;
formSubmitted = false;

triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
}

onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        //this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);

      // Asignar el archivo al formulario
      //this.registerForm.patchValue({ Image: file });
      this.registerForm.get('Image')?.updateValueAndValidity();
    }
  }
}
