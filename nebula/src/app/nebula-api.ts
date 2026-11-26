import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

import { Urhajo } from '../models/urhajo';
import { Kuldetes, UjKuldetes } from '../models/kuldetes';

export const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class NebulaApi {

  private readonly http = inject(HttpClient);

  getUrhajok(): Observable<Urhajo[]> {
    return this.http
      .get<Urhajo[]>(`${API_URL}/urhajok`).pipe(
        retry({ count: 2, delay: 500 }),
        catchError(handleError)
      );
  }

  getUrhajo(id: string): Observable<Urhajo> {
    return this.http.get<Urhajo>(`${API_URL}/urhajok/${id}`).pipe(catchError(handleError));
  }

  getKuldetesek(): Observable<Kuldetes[]> {
    return this.http
      .get<Kuldetes[]>(`${API_URL}/kuldetesek`).pipe(
        retry({ count: 2, delay: 500 }),
        catchError(handleError)
      );
  }

  getKuldetes(id: string): Observable<Kuldetes> {
    return this.http.get<Kuldetes>(`${API_URL}/kuldetesek/${id}`).pipe(catchError(handleError));
  }

  createKuldetes(kuldetes: UjKuldetes): Observable<Kuldetes> {
    return this.http.post<Kuldetes>(`${API_URL}/kuldetesek`, kuldetes)
      .pipe(catchError(handleError));
  }

  updateKuldetes(kuldetes: Kuldetes): Observable<Kuldetes> {
    return this.http.put<Kuldetes>(`${API_URL}/kuldetesek/${kuldetes.id}`,kuldetes)
      .pipe(catchError(handleError));
  }

  patchKuldetes(id: string,adatok: Partial<Kuldetes>): Observable<Kuldetes> {
    return this.http.patch<Kuldetes>(`${API_URL}/kuldetesek/${id}`,adatok)
      .pipe(catchError(handleError));
  }

  deleteKuldetes(id: string): Observable<void> {
    return this.http.delete<void>(`${API_URL}/kuldetesek/${id}`)
      .pipe(catchError(handleError));
  }
}

function handleError(error: HttpErrorResponse) {

  const message = error.status === 0
    ? 'Nem sikerült kapcsolódni a szerverhez!'
    : `Szerverhiba: ${error.status}`;

  console.error('Nebula API hiba:', error);

  return throwError(() => new Error(message));
}