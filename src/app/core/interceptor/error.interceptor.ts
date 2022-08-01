import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { ErrorLevel, ErrorMessage } from '../models/error-message';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse)  => {
                    if ([401, 403].indexOf(err.status) !== -1) {
                        this.authService.logout();
                    }
                    console.log("Not passed through the interceptor in response");
                    let error!: ErrorMessage;

                    if (err.error instanceof ErrorEvent) {
                        error = this.handleClientError(err)
                    } else {
                        error = this.handleServerError(err);
                    }
                    return throwError(() => error);
                }
            )
        )
    }

    private handleClientError(err: any): ErrorMessage {
        let error: ErrorMessage = new ErrorMessage();

        error.message = err.error.message;
        error.level = ErrorLevel.FATAL;
        error.status = 'UNKNOWN_ERROR';
        return error;
    }

    private handleServerError(err: any): ErrorMessage {
        let error: ErrorMessage = new ErrorMessage();

        error.title = err.error?.title || 'Default title';
        error.message = err.error && err.error.message ? err.error.message : err.error ? err.error : err.message;
        error.level = ErrorLevel.ERROR;
        error.status = err.status ? err.status : 'RESPONSE_FAIL';
        return error;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};