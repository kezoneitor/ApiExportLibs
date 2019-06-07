import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lings } from '../models/Lings';
import { MUser } from '../models/mUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingsService {
  //php_server = "http://leoviquez.com:8080/fingerlings";
  php_server = "http://localhost/fingerlings";
  public static userFns: Lings[] = [];
  public static allFns: Lings[] = [];
  constructor(private http: HttpClient) { }

  // Load all lings in db
  async LingsAll() {
    this.http.get<Lings[]>(`${this.php_server}/read.php`).toPromise().then((lings: Lings[]) => {
      LingsService.allFns = lings
    }).catch(error => { console.log(error) });
  }
  async LoadUserFns(userID: string) {
    this.http.get<Lings[]>(`${this.php_server}/read.php?idUser=${userID}`).toPromise().then((lings: Lings[]) => {
      LingsService.userFns = lings
    }).catch(error => { console.log(error) });
  }

  async getNameByID(id: string): Promise<string> {
    return await this.http.get<string>(`${this.php_server}/function.php?idToName=${id}`).toPromise();
  }
  async getCode(id: string): Promise<Lings> {
    return await this.http.get<Lings>(`${this.php_server}/function.php?code=${id}`).toPromise();
  }

  AddUser(user: MUser): Observable<unknown> {
    return this.http.post<unknown>(`${this.php_server}/users.php`, user);
  }

  AddFunction(ling: Lings) {
    return this.http.post<unknown>(`${this.php_server}/function.php`, ling);
  }

  LingsSearch(category: string, parameters: string): Observable<Lings[]> {
    return this.http.get<Lings[]>(`${this.php_server}/search_lib_function.php/?category=${category}&parameters=${parameters}`);
  }

  downloadFile(path, name) {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = path;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async compile(id) {
    let name = await this.getNameByID(id);
    console.log(name);
    if (!name) return;
    this.http.get(`${this.php_server}/import.php?code=${id}`, { responseType: 'text' as 'json' }).subscribe({
      next: (code: string) => {
        let link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(code);
        link.setAttribute('type', 'hidden');
        link.download = name + '.js';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }, error: msg => {
        console.log(msg);
      }
    });
  }
}
