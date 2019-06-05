import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lings } from '../models/Lings';
import { MUser } from '../models/mUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingsService {
  //php_server = "http://leoviquez.com:8080/fingerlings";
  php_server = "http://localhost/fingerlings";

  constructor(private http: HttpClient) { }

  // Load all lings in db
  LingsAll(): Observable<Lings[]> {
    return this.http.get<Lings[]>(`${this.php_server}/read.php`);
  }
  async getNameByID(id:string): Promise<string>{
    return await this.http.get<string>(`${this.php_server}/info/index.php?idToName=${id}`).toPromise();
  }
  async getCode(id:string): Promise<string[]>{
    return await this.http.get<string[]>(`${this.php_server}/info/index.php?code=${id}`).toPromise();
  }

  AddUser(user: MUser): Observable<MUser> {
    return this.http.post<MUser>(`${this.php_server}/users.php`, user);
  }

  LingsSearch(category:string, parameters:string): Observable<Lings[]>{
    return this.http.get<Lings[]>(`${this.php_server}/api/search_lib_function.php/?category=${category}&parameters=${parameters}`);
  }


}
