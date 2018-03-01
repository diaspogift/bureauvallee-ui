import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {appStore} from '../store/AppStore';
import {BASE_API_URL, LOGOUT_LINK} from '../Constante';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private httpClient: HttpClient, public router: Router,private r:ActivatedRoute) {

    console.log("Loging out");
    console.log("Cookie.get(user)" + Cookie.get("user"));

    if (Cookie.get('logout') !== null && Cookie.get('logout') == "logout"){
      this.router.navigate(['/auth']);
      return;
    }

    this.httpClient.post(BASE_API_URL + "users/logout", {} , {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
        ,//set('Authorization', 'Basic ' + btoa(CLIENT_APP_ID + ":" + "123456")).
        //set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken),
      params: new HttpParams().set('api_token', appStore.getState().userState.user.getToken())/*.set("grant_type", 'password').
      set('password', this.password).
      set('username', initialAppsState.tenantState.tenant.getTenantId() + '_' + this.username).set('client_id', 'identity-and-access-ui')*/
    }).subscribe((data)=>{
      Cookie.deleteAll();
      Cookie.set("logout", "logout");
      this.router.navigate(['/auth']);

    }, (error)=>{
      Cookie.deleteAll();
      Cookie.set("logout", "logout");
      this.router.navigate(['/auth']);
    });

  }

  ngOnInit() {
  }
}
