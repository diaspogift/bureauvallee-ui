import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthComponent} from './auth.component';
import {Cookie} from 'ng2-cookies';
import {appStore} from '../store/AppStore';


@Injectable()
export class AuthService {

  cookies:any;

  constructor(private httpClient: HttpClient, private  router: Router,){

  }

  login(username: string, password: string, authComponent: AuthComponent) {

   /* authComponent.loading = true;
    authComponent.message = "";
    authComponent.failiure = false;
    authComponent.success = false;
    this.httpClient.get(BASE_API_URL + encodeURIComponent(appStore.getState().tenantState.tenant.getTenantId()) + "/users/" +
      encodeURIComponent(username) + "/autenticated-with/" + encodeURIComponent(password), {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
        .set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken)
    }).subscribe((data)=>{



      this.httpClient.get(BASE_API_URL + appStore.getState().tenantState.tenant.getTenantId(), {
        headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
          .set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken)
      }).subscribe((donnee)=>{

        authComponent.loading = false;
        authComponent.message = "Success...";
        authComponent.failiure = false;
        authComponent.success = true;
        console.log("Tenant Tenant Tenant Tenant: " + JSON.stringify(donnee));

        let tnt: Tenant = new Tenant(donnee["tenantId"], donnee["name"], donnee["description"],
          donnee["active"], donnee["links"]);
        //appStore.getState().tenantState.tenant
        let mmyAction:MyAction = appActionCreator(LOAD_TENANT, tnt);
        appStore.dispatch(mmyAction);
        console.log("after asignement tenant: " + JSON.stringify(appStore.getState().tenantState.tenant));


        console.log("User Representation: " + JSON.stringify(data));

        let user: User = new User(data['tenantId'], data['username'], data['emailAddress'], false, null, data['roles'], '', '');

        Cookie.set("complete_user", JSON.stringify(user));

        let monAction:MyAction = appActionCreator(LOGIN_USER, user);

        console.log("USER Cookies:" + JSON.stringify(user));

        console.log("users ----------- user---------------> ", JSON.stringify(monAction));
        appStore.dispatch(monAction);

        this.router.navigate(['/autorized']);

      },(error) =>{
        authComponent.loading = false;
        authComponent.message = "Error";
        authComponent.failiure = true;
        authComponent.success = false;
      },()=>{
        authComponent.loading = false;
      });

    }, (data)=>{

      authComponent.loading = false;
      authComponent.message = "Error";
      authComponent.failiure = true;
      authComponent.success = false;

    },()=>{
      authComponent.loading = false;
    });*/
  }


  validateEmailAddress(emailAddress: string):boolean{
    let re : RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
  }



  isLoggedIn() : boolean{
    let check: boolean = this.checkCookieToken();
    let booleen: boolean = (appStore.getState().userState.user !== null &&
      this.validateEmailAddress(appStore.getState().userState.user.getEmail()) &&
      appStore.getState().userState.user.getToken() != null &&
      appStore.getState().userState.user.getToken().length === 60);
    console.log("prima parte: " + booleen);
    console.log("seconda parte: " + check);
    return booleen || check;
    //return check;
  }


  /*canManageTenant():boolean{
    let theUser: User = appStore.getState().userState.user;
    let b: boolean = false;
    if (!(theUser === null)){
      let roles: Array<string> = theUser.getRoles();
      for (let role of roles){
        if (role === DG_ADMINISTRATOR){
          b = true;
          break;
        }
      }
    }
    return b  ;
  }*/

  /*isValideToken():boolean{
    return (new Date().getTime()) < appStore.getState().tokenState.token.receivedAt;
  }*/

  public getToken(): string {
    return localStorage.getItem('token');
  }

  /*public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(token);
  }*/


    /*getCompleteToken():AccessToken{
      let data  = Cookie.getAll();
      return new AccessToken(data['access_token'], data['token_type'], data['refresh_token'],
        data['expires_in_token'], data['scope_token'], data['received_at_token'], data['username_token']);
    }*/

  checkCookieToken(): boolean{
    if (Cookie.check('user')){
      let dataUser  = Cookie.get('user');
      console.log("cookies data: " + JSON.stringify(dataUser));
      this.cookies = JSON.parse(dataUser);
      console.log("cookies data: " + JSON.stringify(dataUser));
      console.log("dataUser['email']: " + this.cookies['email']);
      return this.validateEmailAddress(this.cookies['email']);
    }else{
      console.log("NoCookies");
      return false;
    }
  }


}

