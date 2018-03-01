
import {AppState, initialAppsState} from "../state/AppState";
import {UserState} from "../state/UserState";
import {UserReducer} from "./UserReducer";
import {Reducer} from "redux";
import {MyAction} from "../common/MyAction";
import {LOGIN_USER, LOGOUT_USER} from "../actions/UserAction";

export const  rootReducer: Reducer<AppState> = (appState: AppState = initialAppsState, action: MyAction): AppState => {
  console.log("in root reducer: ", JSON.stringify(appState), " Action: ", JSON.stringify(action));

  switch (action.type){
    case LOGOUT_USER:
      console.log("");
      let utenteState0: UserState = UserReducer(appState.userState, action);
      return Object.assign({},appState, {userState: utenteState0});
    case LOGIN_USER:
        console.log("BEFOR USER REDUCER LOGIN_USERLOGIN_USERLOGIN_USER: " + JSON.stringify(appState.userState) + "\n\n\n" +  JSON.stringify(action));
        let utenteState: UserState = UserReducer(appState.userState, action);
      let retVal = Object.assign({},appState, {userState: utenteState});
      console.log("AFTER USER REDUCER LOGIN_USERLOGIN_USERLOGIN_USER: " + JSON.stringify(retVal.userState) + "\n\n\n" +  JSON.stringify(action));
      return retVal;
    default:
      return appState;
  }
};
