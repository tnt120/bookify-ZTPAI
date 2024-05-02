import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../models/user.model";

export const verifyActions = createActionGroup({
  source: 'user',
  events: {
    'Verify': emptyProps(),
    'Verify success': props<{user: User}>(),
    'Verify failure': emptyProps()
  }
})
