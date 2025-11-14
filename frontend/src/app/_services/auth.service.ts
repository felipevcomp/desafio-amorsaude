import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from './storage.service';
import { EventBusService } from '../_shared/event-bus.service';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private eventBusService: EventBusService,
  ) {}

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

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }

}
