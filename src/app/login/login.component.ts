import { Component, inject } from '@angular/core';
import { SimpleHeaderComponent } from "../shared/components/simple-header/simple-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [SimpleHeaderComponent, 
    FooterComponent,
    ReactiveFormsModule, 
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  notifications = inject(NotificationsService);
  
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  });

  login(){
    const email:string = this.loginForm.controls.email.value!;
    const password:string = this.loginForm.controls.password.value!;

    this.authService.login(email,password).pipe(
      catchError((res:HttpErrorResponse)=>{
        console.log('error: ', res.error.errorMessage);
        this.notifications.error('Error',res.error.errorMessage);
        return EMPTY;
      })
    ).subscribe((response)=>{
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("tokenExpiration",response.data.expirationDate);
      this.authService.decodeToken();
      this.notifications.success('Login exitoso','Bienvenido');
      this.router.navigate(['/']);
    });
  }
}
