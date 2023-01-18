import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../services/http.service';

@Injectable()
export class ListResolver implements Resolve<Observable<any>> {
  constructor(private http: HttpService) {}

  resolve(): Observable<any> {
    return this.http.get();
  }
}