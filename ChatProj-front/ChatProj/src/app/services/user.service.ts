import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  public url: string;
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {
    this.url = environment.serviceUrl;
  }

  createUser(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(this.url + '/user/create', params, {
      headers
    });
  }
  getUser(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.get(this.url + '/user/' + id, { headers: headers });
  };
}
