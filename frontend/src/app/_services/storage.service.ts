import { Injectable } from '@angular/core';

/**
 *
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private USER_KEY = 'auth-user';

  /**
   *
   */
  clean(): void {
    sessionStorage.clear();
  }

  /**
   *
   * @param user
   */
  public saveUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   *
   */
  public getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   *
   */
  public getToken(): string | null {
    const user = this.getUser();
    return user?.token || null;
  }

  /**
   *
   */
  public isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
