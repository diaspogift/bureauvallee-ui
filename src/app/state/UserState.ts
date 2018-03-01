
import {User} from "../domain/model/User";

export interface UserState {
  user: User;
}

export const initialUserState: UserState = {user: null};
