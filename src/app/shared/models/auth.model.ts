export interface LoginApiResponse{
    data: {
        token: string;
        expirationDate: string;
    };
    success: boolean;
    errorMessage: string;
}

export interface registerRequestBody{
    documnetNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    documentType: string;
    age: number;
    confirmPassword: string;
}

export interface ResetPasswordRequestBody{
    email: string;
    token: string;
    newPassword: string;
    confirmNewPassword: string;
}