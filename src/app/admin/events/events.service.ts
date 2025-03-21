import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { eventRequest } from './eventRequest.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private http = inject(HttpClient);
  private baseUrl ="https://localhost:7117/api/";

  register(body: eventRequest){
    const apiUrl = new URL(this.baseUrl + 'events');
        apiUrl.searchParams.append('Title', body.Title);
        apiUrl.searchParams.append('Description', body.Description);
        apiUrl.searchParams.append('ExtendedDescription', body.ExtendedDescription);
        apiUrl.searchParams.append('Place', body.Place);
        apiUrl.searchParams.append('UnitPrice', body.UnitPrice.toFixed(2));
        apiUrl.searchParams.append('GenreId', body.GenreId.toString());
        apiUrl.searchParams.append('DateEvent', body.DateEvent);
        apiUrl.searchParams.append('TimeEvent', body.TimeEvent);
        apiUrl.searchParams.append('Image', body.Image);
        apiUrl.searchParams.append('TicketsQuantity', body.TicketsQuantity.toString());
        return this.http.post(apiUrl.toString(),body);
  }
}
