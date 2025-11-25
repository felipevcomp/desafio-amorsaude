import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { EventBusService } from '../_shared/event-bus.service';
import {
  LoginRequest,
  LoginResponse,
} from '../_shared/models/auth.model';

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

   * @param credentials
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      AUTH_API + 'login',
      credentials,
      httpOptions
    ).pipe(
      tap((user: LoginResponse) => {
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
