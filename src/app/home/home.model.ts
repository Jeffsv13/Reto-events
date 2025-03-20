import { Event } from "../shared/models/event.model";
import { Genre } from "../shared/models/genre.model";

export interface HomeApiResponse{
    events: Event[],
    genres: Genre[],
    success: boolean
}