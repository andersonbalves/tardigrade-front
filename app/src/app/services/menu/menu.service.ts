import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ApiModel } from '../../app.model';
import { MenuModel } from '../../components/menu/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandler,
  ) {}

  getMenu(): Observable<MenuModel[]> {
    return this.httpClient
      .get<MenuModel[]>(`${this.baseUrl}/v1/menu`)
      .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  getFieldsFromAPI(api: string): Observable<ApiModel> {
    return this.httpClient
      .get<ApiModel>(`${this.baseUrl}/${api}`)
      .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.errorHandler.handleError(error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
