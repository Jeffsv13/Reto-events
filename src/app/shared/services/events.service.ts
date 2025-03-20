import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BuyTicketsResponse, getEventByIdResponse, GetSaleByIdResponse } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private baseUrl = 'https://localhost:7117/api/';
  private http = inject(HttpClient);

  getEventById(id:string){
    console.log(id);
    return this.http.get<getEventByIdResponse>(this.baseUrl + 'events/' + id);
  }

  buyTickets(eventId: string, quantity: number,email:string,name:string){
    return this.http.post<BuyTicketsResponse>(this.baseUrl + "Sales",{
      eventId: eventId,
      ticketsQuantity: quantity,
      email: email,
      fullName: name
    });
  }

  getSaleById(saleId: number) {
    return this.http.get<GetSaleByIdResponse>(
      this.baseUrl + 'Sales/' + saleId
    );
  }
}
