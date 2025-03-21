export interface genreRequest{
    name: string;
    status: boolean;
}

export interface genreResponse{
    data: number;
    success: boolean;
    errorMessage: string;
}