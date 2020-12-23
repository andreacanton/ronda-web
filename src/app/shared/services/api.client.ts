import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EnvironmentInterface } from 'src/environments/environment.interface';
import { ENVIRONMENT } from 'src/environments/environment.token';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(ENVIRONMENT) private readonly appConfig: EnvironmentInterface
  ) {}

  public get<T>(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.httpClient
      .get<T>(`${this.appConfig.apiUrl}/${path}`, {
        observe: 'response',
        responseType: 'json',
        ...options,
      })
      .pipe(map((response) => response.body));
  }

  public post<T>(
    path: string,
    body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.httpClient
      .post<T>(`${this.appConfig.apiUrl}/${path}`, body, options)
      .pipe(map((response) => response.body));
  }

  public patch<T>(
    path: string,
    body: any,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };
      observe: 'response';
      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.httpClient
      .patch<T>(`${this.appConfig.apiUrl}/${path}`, body, {
        observe: 'response',
        responseType: 'json',
        ...options,
      })
      .pipe(map((response) => response.body));
  }

  public delete<T>(
    path: string,
    options?: {
      headers?:
        | HttpHeaders
        | {
            [header: string]: string | string[];
          };

      params?:
        | HttpParams
        | {
            [param: string]: string | string[];
          };
      reportProgress?: boolean;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.httpClient
      .delete<T>(`${this.appConfig.apiUrl}/${path}`, {
        observe: 'response',
        responseType: 'json',
        ...options,
      })
      .pipe(map((response) => response.body));
  }
}
