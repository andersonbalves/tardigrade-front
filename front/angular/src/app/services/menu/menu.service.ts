import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { OrquestracaoModel } from '../../model/api.model';
import { MenuModel } from '../../model/menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    private errorHandler: ErrorHandler,
  ) {}

  getMenu(): Observable<MenuModel> {
    return this.httpClient
      .get<MenuModel>(`${this.baseUrl}/v1/menu`)
      .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  getFieldsFromAPI(api: string): Observable<OrquestracaoModel> {
    return this.httpClient
      .get<OrquestracaoModel>(`${this.baseUrl}/${api}`)
      .pipe(retry(2), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.errorHandler.handleError(error);
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
