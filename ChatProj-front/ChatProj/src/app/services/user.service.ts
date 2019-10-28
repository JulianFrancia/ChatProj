import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserLogged } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Form } from '@angular/forms';

@Injectable()
export class UserService {
  public user:User;
  public url: string;
  public usserLogged:UserLogged;


  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private router: Router) {
    this.url = environment.serviceUrl;
    //this.userLogged();
  }

  RegisterUser(user: User): Observable<any> {
    const params = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(this.url+'/user/register', params, {
      headers
    });
  }
  uploadImage(avatar : File, username:string ):Observable<any>{
    const formData = new FormData();
    formData.append('file', avatar);
    return this._http.post(this.url+'/user/'+username+'/avatar', formData);
  }
  
  getUser(id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.get(this.url + '/user/' + id, { headers: headers });
  };

  login(username: string, password: string): Observable<any> {
    return this._http.post(this.url + '/user/login', { username, password })
  }
  logout(){
    localStorage.removeItem('currentToken');
    this.router.navigateByUrl('/');
  }
  userLogged(){
    if(this.router.url != '/register'){
      if(localStorage.getItem('currentToken') == null){
        this.router.navigateByUrl('/');
      }
    }
  }
}
