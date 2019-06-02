import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lings } from '../models/Lings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingsService {
  //php_server = "http://leoviquez.com:8080/fingerlings/";
  php_server = "http://127.0.0.1:8080";

  constructor(private http: HttpClient) { }

  // Load all lings in db
  LingsAll(): Observable<Lings[]> {
    return this.http.get<Lings[]>(`${this.php_server}/read/`);
  }

  LingsSearch(category:string, parameters:string): Observable<Lings[]>{
    return this.http.get<Lings[]>(`${this.php_server}/api/search_lib_function.php/?category=${category}&parameters=${parameters}`);
  }


}
