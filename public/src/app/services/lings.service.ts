import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lings } from '../models/Lings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingsService {
  //php_server = "http://leoviquez.com:8080/fingerlings/";
  php_server = "http://localhost/fingerlings"
  constructor(private http: HttpClient) { }

  LingsAll(): Observable<Lings[]> {
    return this.http.get<Lings[]>(`${this.php_server}/read/`);
  }
}