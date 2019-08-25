import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IListResponse } from '../models/IListResponse';
// import { AuthService } from './auth.service';

export abstract class BaseService<T> {
  baseUrl: string;

  constructor(
    private http: HttpClient,
    // private authService: AuthService
  ) { }

  getAll<S = T>(params?: {}): Observable<IListResponse<S>> {
    let httpParams;
    if (params) {
      httpParams = new HttpParams();
      // tslint:disable-next-line:forin
      Object.getOwnPropertyNames(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    // const token = this.authService.getToken();
    return this.http.get<IListResponse<S>>(`${this.baseUrl}/search`, {
      params: httpParams,
      headers: {
        // authorization: 'Bearer ' + token
      }
    });
  }

  get<S = T>(id: string, relations?: string): Observable<S> {
    // const token = this.authService.getToken();
    return this.http.get<S>(`${this.baseUrl}/${id}`, {
      headers: {
        // authorization: 'Bearer ' + token,
        relations: relations ? relations : null
      }
    });
  }

  delete(id: string): Observable<any> {
    // const token = this.authService.getToken();
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: {
        // authorization: 'Bearer ' + token
      }
    });
  }

  create<S = T>(entity: S): Observable<any> {
    // const token = this.authService.getToken();
    return this.http.post<S>(`${this.baseUrl}`, entity, {
      headers: {
        // authorization: 'Bearer ' + token
      }
    });
  }

  update<S = T>(entity: S): Observable<any> {
    // const token = this.authService.getToken();
    return this.http.put<S>(`${this.baseUrl}/${entity['id']}`, entity, {
      headers: {
        // authorization: 'Bearer ' + token
      }
    });
  }
}
