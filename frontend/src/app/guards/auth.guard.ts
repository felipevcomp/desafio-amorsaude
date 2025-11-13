// src/app/guards/auth.guard.ts

import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {StorageService} from '../_services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
