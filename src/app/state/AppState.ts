
import {initialUserState, UserState} from "./UserState";

export interface AppState{
  userState: UserState;
}

export const initialAppsState: AppState = {
  userState: initialUserState
};
