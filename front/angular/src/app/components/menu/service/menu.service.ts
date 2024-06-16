import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuModel } from '../../../model/menu.model';
import { OrquestracaoModel } from '../../../model/api.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getMenu(): Observable<MenuModel> {
    return this.httpClient.get<MenuModel>(`${this.baseUrl}/v1/menu`).pipe(
      retry(2),
      catchError((error) =>
        throwError(
          () =>
            new Error(
              error instanceof HttpErrorResponse
                ? error.message
                : `Código do erro: ${error.status}, ` +
                  `menssagem: ${error.message}`,
            ),
        ),
      ),
    );
  }

  getFieldsFromAPI(api: string): Observable<OrquestracaoModel> {
    return this.httpClient
      .get<OrquestracaoModel>(`${this.baseUrl}/${api}`)
      .pipe(
        retry(2),
        catchError((error) =>
          throwError(
            () =>
              new Error(
                error instanceof HttpErrorResponse
                  ? error.message
                  : `Código do erro: ${error.status}, ` +
                    `menssagem: ${error.message}`,
              ),
          ),
        ),
      );
  }
}
