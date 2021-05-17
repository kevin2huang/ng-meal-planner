import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    
    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5Dya6BxG8AP03Hb2IdKL87l8wLRTQ-gU',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(this.handleError));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5Dya6BxG8AP03Hb2IdKL87l8wLRTQ-gU',
            { 
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occurred!';

            if (!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS': 
                errorMessage = 'This email exists already';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password or email is invalid';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Password or email is invalid';
                break;
        }

        return throwError(errorMessage);
    }
}