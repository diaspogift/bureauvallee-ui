
import {ListenerCallBack} from "../event/listener/Callback";
import {rootReducer} from "../reducer/RootReducer";
import {AppState, initialAppsState} from "../state/AppState";
import {MyAction} from "../common/MyAction";
//import {Action} from "redux";

export class AppStore{
  private state: AppState;
  private listeners: ListenerCallBack[];

  constructor(initialStat: AppState){
    this.state = initialStat;
    this.listeners = [];
  }

  getState():AppState{
    return this.state;
  }

  dispatch(action: MyAction){
    console.log("in dispatch: "+ JSON.stringify(action));
    this.state = rootReducer(this.state, action);
    this.listeners.forEach((l:ListenerCallBack) => {
      l();
    });
  }

  subscribe(listener : ListenerCallBack): ListenerCallBack{
    this.listeners.push(listener);
    return ()=>{
      this.listeners = this.listeners.filter((l)=>l!==listener);
    };
  }

  getListeners():ListenerCallBack[]{
    return this.listeners;
  }
}

export let appStore: AppStore= new AppStore(initialAppsState);

export let unregisterAppStore: ListenerCallBack = appStore.subscribe(()=>{
  console.log("I get Token: " , JSON.stringify(appStore.getState().userState.user.getEmail()));
});

//unregisterAppStore();

