import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { EventBusService } from '../_shared/event-bus.service';

import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   *
   * @param http
   * @param storageService
   * @param eventBusService
   */
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private eventBusService: EventBusService,
  ) {}

  /**
   *
   * @param credentials
   * @param credentials.email
   * @param credentials.password
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      credentials,
      httpOptions
    ).pipe(
      tap((user: any) => {
        this.storageService.saveUser(user);
        this.eventBusService.emit({ name: 'login', value: null });
      })
    );
  }

  /**
   *
   */
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }

}
