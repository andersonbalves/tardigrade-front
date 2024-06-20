import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private ngZone: NgZone) {}

  handleError(error: any): void {
    this.ngZone.run(() => {
      let message = '';
      if (error instanceof HttpErrorResponse) {
        message = `Error Status: ${error.status}\nMessage: ${error.message}`;
      } else {
        message = `Error: ${error.message}`;
      }
      console.error(message);
    });
  }
}
