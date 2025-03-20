import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MyPurchasesApiResponse } from './my-purchases.model';
//import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MyPurchasesService {
  private baseUrl ="https://localhost:7117/api/";
  private http = inject(HttpClient);

  getMyPurchases(email: string, title = '', page = 1, recordsPerPage = 999) {
    const apiUrl = new URL(this.baseUrl + 'Sales/ListSales');
    apiUrl.searchParams.append('email', email);
    apiUrl.searchParams.append('title', title);
    apiUrl.searchParams.append('Page', page.toString());
    apiUrl.searchParams.append('RecordsPerPage', recordsPerPage.toString());
    return this.http.get<MyPurchasesApiResponse>(apiUrl.toString());
  }
}