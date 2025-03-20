import { Sale } from '../../shared/models/event.model';

export interface SalesTableDataModel {
  client: string;
  event: string;
  tickets: number;
  total: number;
  eventDate: string;
  saleDate: string;
  genre: string;
}
export interface SaleApiResponse {
  data: Sale[];
  success: boolean;
  errorMessage: null | string;
}