import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { QuestWorker } from 'src/shared/quest-worker';
import { Flight } from 'src/shared/flight';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiURL = 'https://interview-mock.herokuapp.com/api/workers/';

  constructor(private http: HttpClient) { }

  getWorkers(): Observable<QuestWorker[]> {
    return this.http.get<QuestWorker[]>(this.apiURL)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  getFlights(id: number): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiURL + id)
    .pipe(
      retry(1),
      catchError(this.handleError),
    )
  }

  handleError(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
