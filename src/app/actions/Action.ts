

import {ActionCreator} from "redux";
import {LOGIN_USER, LOGOUT_USER, userActionActionCreator} from "./UserAction";
import {MyAction} from "../common/MyAction";


export const appActionCreator:ActionCreator<MyAction> = (type:string, pld:any)=>
{
  if (type === LOGIN_USER || type === LOGOUT_USER){
    return userActionActionCreator(type, pld);
  }
  let myAction : MyAction = {type:type, payload: pld};
  return myAction;
};
