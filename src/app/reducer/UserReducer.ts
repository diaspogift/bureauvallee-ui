

import {UserState} from "../state/UserState";
import {Reducer} from "redux";
import {LOGIN_USER, LOGOUT_USER, userActionActionCreator} from "../actions/UserAction";
import {MyAction} from "../common/MyAction";
import {User} from "../domain/model/User";

export const UserReducer: Reducer<UserState> = (userState: UserState, action: MyAction): UserState => {
    console.log("Enter User Reducer with: " + JSON.stringify(action) + "\n\n\n" + JSON.stringify(action.payload));
    switch (action.type) {
      case userActionActionCreator(action.type, action.payload).type:
        switch (userActionActionCreator(action.type, action.payload).type){
          case LOGOUT_USER:
            return Object.assign({}, userState, {user:Object.assign({}, userState.user, {username:null})});
          case LOGIN_USER:
            console.log("updating user: -------....>>>>> ", JSON.stringify(action.payload));
            return Object.assign({}, userState, {user:action.payload});
          default:
            return userState;
        }
        //const user: User = <User>action.payload;
       default:
        return userState;
    }
  };
