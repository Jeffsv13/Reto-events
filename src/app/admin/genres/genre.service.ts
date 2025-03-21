import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { genreResponse } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private http = inject(HttpClient);
  private baseUrl ="https://localhost:7117/api/";

  register(name: string,status:boolean){
      return this.http.post<genreResponse>(this.baseUrl + 'users/genres',{
        name: name,
        status
      });
  }

  getGenres(){}
}
