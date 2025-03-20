import { Sale } from '../../shared/models/event.model';

export interface MyPurchasesApiResponse {
  data: Sale[];
  success: boolean;
  errorMessage: null | string;
}

export interface MyPurchasesTableDataModel {
  transactionNumber: string;
  event: string;
  tickets: number;
  payment: number;
  purchaseDate: string;
  eventDate: string;
  ticketId: string;
}