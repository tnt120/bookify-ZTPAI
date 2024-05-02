import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import { verifyActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';

export const verifyEffect = createEffect((
  actions$ = inject(Actions),
  authService = inject(AuthService),
) => {
  return actions$.pipe(
    ofType(verifyActions.verify),
    switchMap(() => {
      return authService.verify().pipe(
        map((user: User) => verifyActions.verifySuccess({ user })),
        catchError(() => of(verifyActions.verifyFailure()))
      )
    })
  )
}, { functional: true });
