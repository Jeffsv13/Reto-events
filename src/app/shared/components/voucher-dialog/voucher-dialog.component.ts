import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sale } from '../../models/event.model';
import { EventsService } from '../../services/events.service';

@Component({
    selector: 'app-voucher-dialog',
    standalone: true,
    imports: [],
    templateUrl: './voucher-dialog.component.html',
    styleUrl: './voucher-dialog.component.css'
})
export class VoucherDialogComponent {
  data = inject(MAT_DIALOG_DATA) as {saleId:number};
  sale!: Sale;
  eventsService = inject(EventsService);

  constructor(){
    this.eventsService.getSaleById(this.data.saleId).subscribe((response)=>{
      this.sale = response.data;
    });
  }
}
