import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private url = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  get(customUrl?: string): Observable<any> {
    return this.http.get(customUrl ? customUrl : this.url).pipe(delay(2000));
  }

  patch(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, data).pipe(delay(2000));
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(delay(2000));
  }

  post(data: any): Observable<any> {
    return this.http.post(this.url, data).pipe(delay(2000));
  }
}