import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { verifyActions } from '../store/actions';
import { selectRole } from '../store/reducers';
import { map, switchMap, take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

export function roleGuardGuard(role: string, isAuthorized: boolean): CanActivateFn {
  return (route, state) => {

    const router: Router = inject(Router);
    const store: Store = inject(Store);
    const actions$: Actions = inject(Actions);

    store.dispatch(verifyActions.verify());

    return actions$.pipe(
      ofType(verifyActions.verifySuccess, verifyActions.verifyFailure),
      take(1),
      switchMap(() => store.select(selectRole).pipe(
        take(1),
        map(userRole => {
          if (userRole !== role && isAuthorized) {
            router.navigate(['/auth']);
            return false;
          }
          return true;
        })
      ))
    );
  }
};

export const notAuthenticatedGuard: CanActivateFn = roleGuardGuard('', false);
export const userGuard: CanActivateFn = roleGuardGuard('USER', true);
export const adminGuard: CanActivateFn = roleGuardGuard('ADMIN', true);
