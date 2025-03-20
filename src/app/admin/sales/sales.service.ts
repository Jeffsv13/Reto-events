import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SaleApiResponse } from './sale.model';
//import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private http = inject(HttpClient);
  private baseUrl ="https://localhost:7117/api/";

  getSales(dateStart: Date, dateEnd: Date, page = 1, recordsPerPage = 999) {
    //format dateStart and dateEnd to mm-dd-yyyy
    const dateStartFormatted = `${(dateStart.getDate())
      .toString()
      .padStart(2, '0')}-${(dateStart.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dateStart.getFullYear()}`;
    const dateEndFormatted = `${(dateEnd.getDate())
      .toString()
      .padStart(2, '0')}-${(dateEnd.getMonth()+1)
      .toString()
      .padStart(2, '0')}-${dateEnd.getFullYear()}`;

    const apiUrl = new URL(this.baseUrl + 'Sales/ListSalesByDate');
    apiUrl.searchParams.append('DateStart', dateStartFormatted);
    apiUrl.searchParams.append('DateEnd', dateEndFormatted);
    apiUrl.searchParams.append('Page', page.toString());
    apiUrl.searchParams.append('RecordsPerPage', recordsPerPage.toString());
    return this.http.get<SaleApiResponse>(apiUrl.toString());
  }
}