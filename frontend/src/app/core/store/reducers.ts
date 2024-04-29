import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../models/user.model";
import { verifyActions } from "./actions";

const initialState: User = {
  email: '',
  role: '',
  firstName: '',
  lastName: ''
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(verifyActions.verifySuccess, (state, action) => ({ ...state, ...action.user })),
    on(verifyActions.verifyFailure, () => initialState)
  )
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectUserState,
  selectRole
} = userFeature;
