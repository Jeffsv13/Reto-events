import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { registerRequestBody } from '../shared/models/auth.model';
import { SimpleHeaderComponent } from '../shared/components/simple-header/simple-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        SimpleHeaderComponent,
        FooterComponent,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule,
        RouterLink
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router)
    notifications = inject(NotificationsService);
  
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    age: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    documentType: new FormControl('',[Validators.required]),
    documentNumber: new FormControl('',[Validators.required]),
  })

  register(){
    const body: registerRequestBody = {
      age: Number.parseInt(this.registerForm.controls.age.value!),
      password: this.registerForm.controls.password.value!,
      confirmPassword: this.registerForm.controls.password.value!,
      documentType: this.registerForm.controls.documentType.value!,
      documnetNumber: this.registerForm.controls.documentNumber.value!,
      email: this.registerForm.controls.email.value!,
      firstName: this.registerForm.controls.name.value!,
      lastName: this.registerForm.controls.lastName.value!,
    }
    this.authService.register(body).pipe(
          catchError((res:HttpErrorResponse)=>{
            console.log('error: ', res.error.errorMessage);
            this.notifications.error('Error',res.error.errorMessage);
            return EMPTY;
          })
    ).subscribe((response)=>{
      this.notifications.success('Registro exitoso','Inicia sesión');
      this.router.navigate(['/']);
    })
  }
}
