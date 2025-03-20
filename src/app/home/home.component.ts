import { Component, inject, OnInit } from '@angular/core';
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { FooterComponent } from "../shared/components/footer/footer.component";
import { EventCardComponent } from "../shared/components/event-card/event-card.component";
import { Event } from '../shared/models/event.model';
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field'
import { Genre } from '../shared/models/genre.model';
import { HomeService } from './home.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HighlightableDirective } from '../shared/directives/highlightable.directive';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [HomeHeaderComponent,
        FooterComponent,
        EventCardComponent,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HighlightableDirective,
        RouterLink,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  events: Event[] = [];
  genres: Genre[] = [];
  initialEvents: Event[] = [];
  homeService = inject(HomeService);
  currentGenre = new FormControl(0);
  searchGenreValue = 0;
  searchBarValue = '';

  ngOnInit(): void {
    this.homeService.getData().subscribe((response) =>{
      console.log("API Response:", response);
      this.initialEvents = response.events;
      this.genres = response.genres;
      this.events = this.initialEvents;
    });

    this.currentGenre.valueChanges.subscribe(
      (value) =>{
        this.searchGenreValue = value || 0;
        this.filterEvents();
      }
    );
  }

  onSearchValueChange(value:string){
    this.searchBarValue = value;
    this.filterEvents();
  }

  filterEvents(){
    this.filterByGenre();
    this.filterByDescription();
  }

  filterByGenre(){
    if (!this.initialEvents) return;

    if(this.searchGenreValue===0){
      this.events = this.initialEvents;
    }else{
      this.events = this.initialEvents.filter(
        (event) => event.genreId === this.searchGenreValue
      );
    }
  }

  filterByDescription(){
    if(this.searchBarValue){
      this.events = this.events.filter(
        (event) => event.description.toLowerCase().includes(this.searchBarValue.toLowerCase())
      );
    }
  }

}
