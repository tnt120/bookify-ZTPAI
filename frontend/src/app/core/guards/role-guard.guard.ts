import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { verifyActions } from '../store/actions';
import { selectUser } from '../store/reducers';
import { map, switchMap, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { Roles } from '../enums/roles.enum';
import { TokenService } from '../services/token/token.service';

export function roleGuardGuard(role: string, isAuthorized: boolean): CanActivateFn {
  return (route, state) => {

    const router: Router = inject(Router);
    const store: Store = inject(Store);
    const actions$: Actions = inject(Actions);
    const tokenService = inject(TokenService);

    if (tokenService.token) {
      store.dispatch(verifyActions.verify());

      return actions$.pipe(
        ofType(verifyActions.verifySuccess, verifyActions.verifyFailure),
        take(1),
        switchMap(() => store.select(selectUser).pipe(
          take(1),
          map(user => {
            if (user.role !== role && isAuthorized) {
              if (role === Roles.unAuthorized) {
                router.navigate(['/auth']);
              } else {
                router.navigate(['/home']);
              }
              return false;
            }
            return true;
          })
        ))
      );
    }

    if (isAuthorized) {
      router.navigate(['/auth']);
      return false;
    }

    return true;
  }
};

export const notAuthenticatedGuard: CanActivateFn = roleGuardGuard(Roles.unAuthorized, false);
export const userGuard: CanActivateFn = roleGuardGuard(Roles.User, true);
export const adminGuard: CanActivateFn = roleGuardGuard(Roles.Admin, true);
