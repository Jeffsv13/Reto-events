import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EventsService } from '../../shared/services/events.service';
import { Event } from '../../shared/models/event.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-buy-dialog',
  standalone: true,
  imports: [FormsModule, MatButtonModule,MatFormField,MatInputModule],
  templateUrl: './buy-dialog.component.html',
  styleUrl: './buy-dialog.component.css'
})
export class BuyDialogComponent {
  data = inject(MAT_DIALOG_DATA) as Event;
  eventsService = inject(EventsService);
  authService = inject(AuthService);
  matDialogRef = inject(MatDialogRef);

  buyTickets(quantity:number){
    this.eventsService.buyTickets(this.data.id.toString(),quantity,this.authService.getEmail(),this.authService.getName())
    .subscribe((response)=>{
      this.matDialogRef.close(response.data);
    });
  }
}
