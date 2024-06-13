export interface AuthResponse {
body: {
    user: User;
    accessToken: string;
    refreshToken: string;
};
}
export interface AuthResponseError{
    body: {
        error: string;
    };
}

export interface User{
    _id: string;
    name: string;
    mail: string;
    //no se guarda la password acá
}

export interface AccessTokenResponse{
    statusCode: number;
    body:{
        accessToken: string;
    },
    error?: string;
}