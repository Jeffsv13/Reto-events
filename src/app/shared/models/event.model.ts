export interface Event{
    id: number;
    title: string;
    extendedDescription: string;
    description: string;
    place: string;
    unitPrice:number;
    genre:string;
    genreId: number;
    dateEvent: string;
    timeEvent: string;
    imageUrl: string;
    ticketsQuantity: number;
    finalized: boolean;
    status: string;
}

export interface getEventByIdResponse{
    data: Event;
    success: boolean;
    errorMessage: string;
}

export interface BuyTicketsResponse{
    data: number;
    success: boolean;
    errorMessage: string;
}

export interface Sale {
    saleId: number;
    dateEvent: string;
    timeEvent: string;
    genre: string;
    imageUrl: string;
    title: string;
    operationNumber: string;
    fullname: string;
    quantity: number;
    saleDate: string;
    total: number;
  }
  
  export interface GetSaleByIdResponse {
    data: Sale;
    success: boolean;
    errorMessage: string;
  }