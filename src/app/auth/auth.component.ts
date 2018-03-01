import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './AuthService';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ACCESSTOKEN_LINK, BASE_API_URL} from '../Constante';
import {User} from '../domain/model/User';
import {Cookie} from 'ng2-cookies';
import {MyAction} from '../common/MyAction';
import {appActionCreator} from '../actions/Action';
import {LOGIN_USER} from '../actions/UserAction';
import {appStore} from '../store/AppStore';
import {ErrorStateMatcher} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public failiure: boolean;
  public success: boolean;
  public loading: boolean;
  public  message: string;

  rForm: FormGroup;
  email:string = '';
  password:string = '';

  /*matcher : MyErrorStateMatcher;
  emailFormControl: FormControl;
  passwordFromControl: FormControl;
  emailGroup: FormGroup;
  passwordGroup: FormGroup;*/
  constructor(private fb: FormBuilder, private http:HttpClient,  private _router: Router, private authService: AuthService ,private r:ActivatedRoute) {

    /*this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);

    this.passwordFromControl = new FormControl('', [
      Validators.required,
      Validators.pattern('.{6,}')
    ]);

    this.matcher = new MyErrorStateMatcher();*/


    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });

    /*this.emailGroup = new FormGroup({
      email: new FormControl()
    });

    this.passwordGroup = new FormGroup({
      password: new FormControl()
    });*/

    /*
     <div [formGroup]="myGroup">
      <input formControlName="firstName">
    </div>

    In your class:

    this.myGroup = new FormGroup({
       firstName: new FormControl()
    });
     */
    this.failiure = false;
    this.success = false;
    this.loading = false;
    this.message = '';
  }

  ngOnInit() {
  }


  addAuthenticate(post) {
    //this.tenantId = post.tenantId;
    this.email = post.email;
    this.password = post.password;
    //console.log("submitting: ", this.username, this.password + " | " + initialAppsState.tenantState.tenant.getTenantId());

    const body = {
      email: this.email,
      password: this.password
    };

    //console.log("ACCESSTOKEN_LINK in component", ACCESSTOKEN_LINK);

    //console.log("Body: " + JSON.stringify(body));
    this.failiure = false;
    this.loading = true;
    this.failiure = false;
    this.success = false;
    this.http.post(BASE_API_URL + "users/login", body, {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      params: new HttpParams().set('email', this.email).set('password', this.password)
    }).subscribe((data) => {
      this.success = true;
      this.failiure = false;
      this.message = 'Success';

      let utilisateur = data['user'];

      let user: User = new User(utilisateur['id'], utilisateur['email'], utilisateur['name'],
        !(utilisateur['canwritearticle']===0), !(utilisateur['canpublisharticle'] === 0), utilisateur['api_token']);

      Cookie.set("user", JSON.stringify(user));

      let monAction:MyAction = appActionCreator(LOGIN_USER, user);

      //console.log("USER Cookies:" + JSON.stringify(user));

      console.log("users ----------- user---------------> ", JSON.stringify(monAction));
      appStore.dispatch(monAction);

      this._router.navigate(['/autorized']);

    }, (data) => {
      console.log("Errorrrrrrr0000", data);

      this.failiure = false;
      this.loading = false;
      this.failiure = false;
      this.success = false;

    }, ()=>{
      this.loading = false;
    });


  }

}
