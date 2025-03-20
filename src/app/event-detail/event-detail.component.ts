import { Component, inject, OnInit } from '@angular/core';
import { LoggedInHeaderComponent } from '../shared/components/logged-in-header/logged-in-header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { EventCardComponent } from '../shared/components/event-card/event-card.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventsService } from '../shared/services/events.service';
import { Event } from '../shared/models/event.model';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { VoucherDialogComponent } from '../shared/components/voucher-dialog/voucher-dialog.component';
import confetti from 'canvas-confetti';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-event-detail',
    standalone: true,
    imports: [LoggedInHeaderComponent,
        FooterComponent,
        EventCardComponent,
        MatButtonModule
    ],
    templateUrl: './event-detail.component.html',
    styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit{
  event!: Event;
  authService = inject(AuthService);
  router = inject(Router);
  matDialog = inject(MatDialog);
  eventId = '';
  activedRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  notifications = inject(NotificationsService);

  ngOnInit(): void {
    this.eventId = this.activedRoute.snapshot.params['id'];
    this.eventsService.getEventById(this.eventId).subscribe((response)=>{
      this.event = response.data;
    });
  }

  openBuyDialog(){
    if(!this.authService.getIsLoggedIn()){
      this.notifications.error('Error','Debes iniciar sesión para comprar');

      this.router.navigate(['/login']);
    }

    if(this.authService.getRole() === "Administrator"){
      this.notifications.error('Error','Los administradores no pueden comprar entradas');
      return;
    }

    const buyDialogRef = this.matDialog.open(BuyDialogComponent,{
      data: this.event,
    });

    buyDialogRef.afterClosed().subscribe((saleId)=>{
      this.notifications.success('Compra exitosa','Tu compra ha sido exitosa');
      confetti({
        zIndex: 9999,
      });
      const voucherDialogRef = this.matDialog.open(VoucherDialogComponent,{data:{saleId}});
      voucherDialogRef.afterClosed().subscribe(()=>{
        this.router.navigate(['/']);
      });
    });
  }
}
