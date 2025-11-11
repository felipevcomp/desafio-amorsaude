import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from './_services/storage.service';
import {AuthService} from './_services/auth.service';
import {EventBusService} from './_shared/event-bus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

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
