import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Header } from '../models/header';
import { Options } from '../models/options';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private http: HttpClient) {}

  load(): Observable<Header> {
    return this.http.get<Header>('assets/data/headerInfo.json');
  }

  loadOptions(): Observable<Options[]> {
    return this.http.get<Options[]>('assets/data/marketPlaceIApps.json');
  }
}
