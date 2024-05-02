import { createFeature, createReducer, on } from "@ngrx/store";
import { verifyActions } from "./actions";
import { AppState } from "../models/app-state.model";

const initialState: AppState = {
  user: {
    email: '',
    role: '',
    firstName: '',
    lastName: ''
  },
  isLogged: false
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(verifyActions.verifySuccess, (state, action) => ({ ...state, user: action.user, isLogged: true })),
    on(verifyActions.verifyFailure, () => initialState)
  )
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectUserState,
  selectUser,
  selectIsLogged
} = userFeature;
