import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Page } from './models/page.model';
import { CarPoolingType, CarType } from './types/car.types';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private baseURL =
    'https://node-mkdytx-xbvnkinm--3000.local.webcontainer.io/api';

  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<Page<CarType>> {
    return this.httpClient.get<Page<CarType>>(`${this.baseURL}/cars`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCarById(id: string): Observable<CarType> {
    return this.httpClient.get<CarType>(`${this.baseURL}/cars/${id}`).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCarStatusById(id: string): Observable<CarPoolingType> {
    return this.httpClient
      .get<CarPoolingType>(`${this.baseURL}/cars/status/${id}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
