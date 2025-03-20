import { Component, Input } from '@angular/core';
import { Event } from '../../models/event.model';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input({required:true}) data!:Event;
  onImageError(){
    this.data.imageUrl ='images/default.jpeg';
  }
}
