import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {AuthService} from './_services/auth.service';
import {StorageService} from './_services/storage.service';
import {EventBusService} from './_shared/event-bus.service';

/**
 *
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  /**
   *
   * @param storageService
   * @param authService
   * @param eventBusService
   * @param router
   */
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
  ) {
  }

  /**
   *
   */
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });

    this.eventBusService.on('login', () => {
      this.isLoggedIn = true;
      const user = this.storageService.getUser();
      this.username = user?.username;
    });
  }

  /**
   *
   */
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.storageService.clean();
        this.router.navigate(['/login']);
      }
    });
  }

}
