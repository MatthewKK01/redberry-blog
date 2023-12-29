import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService)
  const router = inject(Router)

  return _auth.responseStatus$.pipe(
    map((status: number) => {
      if (status === 204) {
        return true;
      } else {
        router.navigate(['/'])
        return false;
      }
    })
  )

};
