import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lings } from '../models/Lings';
import { MUser } from '../models/mUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LingsService {
  php_server = "http://leoviquez.com:8080/fingerlings";
  //php_server = "http://localhost/fingerlings";
  public static userFns: Lings[] = [];
  public static allFns: Lings[] = [];
  public static lengthFns: number = 0;
  public static lengthUserFns: number = 0;
  public static pageSize_U: number = 6;
  public static pageIndex_U: number = 0;
  public static pageSize: number = 6;
  public static pageIndex: number = 0;
  constructor(private http: HttpClient) { }

  // Load all lings in db
  async LingsAll(lim:number, i:number) {
    this.http.get<Lings[]>(`${this.php_server}/read.php?lim=${lim}&i=${i}`).toPromise().then((lings: Lings[]) => {
      LingsService.allFns = lings;
      return true;
    }).catch(error => { console.log(error); return false});
  }

  async Length() {
    this.http.get<number>(`${this.php_server}/length.php`).toPromise().then((length: number) => {
      LingsService.lengthFns = length;
    }).catch(error => { console.log(error) });
  }


  async LengthUser(userID: string) {
    this.http.get<number>(`${this.php_server}/length.php?UserID=${userID}`).toPromise().then((length: number) => {
      LingsService.lengthUserFns = length;
    }).catch(error => { console.log(error) });
  }

  async LoadUserFns(userID: string, lim: number, i: number) {
    this.http.get<Lings[]>(`${this.php_server}/read.php?idUser=${userID}&lim=${lim}&i=${i}`).toPromise().then((lings: Lings[]) => {
      LingsService.userFns = lings
      return true;
    }).catch(error => { console.log(error); return false;});
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
