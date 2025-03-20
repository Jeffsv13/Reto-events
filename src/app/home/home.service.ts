import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HomeApiResponse } from './home.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl ="https://localhost:7117/api/";
  http = inject(HttpClient);

  getData(){
    return this.http.get<HomeApiResponse>(this.baseUrl + "home");
  }
}
