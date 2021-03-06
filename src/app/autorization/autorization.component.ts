import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../domain/model/User';
import {appStore} from '../store/AppStore';
import {BASE_API_URL, DG_ADMINISTRATOR} from '../Constante';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/AuthService';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {MyAction} from '../common/MyAction';
import {appActionCreator} from '../actions/Action';
import {LOGIN_USER} from '../actions/UserAction';
import {BsModalComponent} from 'ng2-bs3-modal';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit, AfterViewInit {

  //title: string = "AutorizationComponent";
  cookies: any;

  @ViewChild("articles", {read: ElementRef}) articles: ElementRef;

  @ViewChild("customers", {read: ElementRef}) customers: ElementRef;

  /*@ViewChild("services", {read: ElementRef}) services: ElementRef;

  @ViewChild("groups", {read: ElementRef}) groups: ElementRef;

  @ViewChild("groupmembers", {read: ElementRef}) groupmembers: ElementRef;

  @ViewChild("roles", {read: ElementRef}) roles: ElementRef;*/

  modalReference: any;
  message: string;
  loading: boolean;
  failiure: boolean;
  success: boolean;

  rForm: FormGroup;

  currentpassword: string;
  newpassword: string;
  newpasswordrep: string;

  errorMessage:string;
  successMessage:string;

  user: User;


  /**
   * MODAL config
   */

  @ViewChild('modal') modal: BsModalComponent;
  selected: string;
  output: string;
  //model: Person = new Person();


  closed() {
    this.output = '(closed) ' + this.selected;
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }

  /* navigate() {
     this.router.navigateByUrl('/hello');
   }*/

  open() {
    this.modal.open();
  }

  /************** END MODAL CONFIG ***********************************************/


  constructor(private modalService: NgbModal, private fb: FormBuilder,  private httpClient: HttpClient,
              private _authService: AuthService, private router: Router, private r: ActivatedRoute) {

    //console.log("ET voila 1111111" + this.modal.animation);
    this.cookies = Cookie.getAll();


    //console.log("canManageTenant: " + this._authService.canManageTenant());

    //if (!this._authService.canManageTenant()) {
    //  this.router.navigate(["../autorized/users"], {relativeTo: this.r});
    //}else {

    this.rForm = fb.group({
      //'tenantId' : [null, Validators.required],
      'currentpassword': [null, Validators.required],
      'newpassword': [null, Validators.required],
      'newpasswordrep': [null, Validators.required],
      //'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      //'validate' : ''
    });


    this.errorMessage = '';
    this.successMessage = '';

    this.message = "";
    this.loading = false;

    this.failiure = false;

    this.success = false;
    //let date = new Date();
    //this.copyrightDate = new Date();//(date.getMonth() + 1) + "/" + date.getFullYear();


    if (appStore.getState().userState.user == null) {
      console.log("\n\n\nmust request many thing");

      let jsonUser = Cookie.get('user');
      let jsonObjectUser = JSON.parse(jsonUser);

      if (this._authService.isLoggedIn()) {

        /*
            Save Login user in the state
         */

        console.log("TEST TEST : " + JSON.stringify(jsonObjectUser));

        let user: User = new User(jsonObjectUser['id'], jsonObjectUser['email'], jsonObjectUser['name'],
          jsonObjectUser['canwritearticle'], jsonObjectUser['canpublisharticle'], jsonObjectUser['token']);

        console.log("USER Cookies-----: " + JSON.stringify(user));

        let monAction1: MyAction = appActionCreator(LOGIN_USER, user);

        console.log("users ----------- user---------------> ", JSON.stringify(monAction1) + "\n\n\n");
        appStore.dispatch(monAction1);



        /*if (!this._authService.canManageA()) {
          //this.manageActiveLinkByUrl("../autorized/users");
          this.router.navigate(["../autorized/users"], {relativeTo: this.r});
        }else{
          //this.manageActiveLinkByUrl("../autorized/tenants");
          this.router.navigate(["../autorized/tenants"], {relativeTo: this.r});
        }*/

        this.router.navigate(["../autorized/articles"], {relativeTo: this.r});

      } else {
        this.router.navigate(["../autorized/logout"], {relativeTo: this.r});
      }

    } else {

      console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSss");
      //this.router.navigate(["../autorized/tenants"], {relativeTo: this.r});

      /*if (!this._authService.canManageTenant()) {
        //this.manageActiveLinkByUrl("../autorized/users");
        this.router.navigate(["../autorized/users"], {relativeTo: this.r});
      }else{
        //this.manageActiveLinkByUrl("../autorized/tenants");
        this.router.navigate(["../autorized/tenants"], {relativeTo: this.r});
      }*/
      this.router.navigate(["../autorized/articles"], {relativeTo: this.r});
    }

    this.user = appStore.getState().userState.user;
    //console.log("\n\n\nappStore.getState().tenantState.tenant: " + JSON.stringify(appStore.getState().tenantState.tenant) + "\n\n\n");
    //this.tenant = appStore.getState().tenantState.tenant;
  }


  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      console.log("Subscribe Subscribe Subscribe: " + event);
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url);
        this.manageActiveLinkByUrl(event.url);
      }
    });
  }

  ngOnInit(): void {

    /*this.httpClient.get(BASE_API_URL + appStore.getState().tenantState.tenant.getTenantId(), {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
        .set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken)
    }).subscribe((data)=>{
      console.log("Tenant Tenant Tenant Tenant: " + JSON.stringify(data));

      appStore.getState().tenantState.tenant = Object.assign({}, appStore.getState().tenantState.tenant, data);
      console.log("after asignement tenant: " + JSON.stringify(appStore.getState().tenantState.tenant));

    });*/

  }

  manageActiveLink(event: any){
    //console.log("VIOLAAAAAAAAA" + event.target);
    event.preventDefault();
    //event.target.classList.remove('class1');
    let parent: HTMLUListElement = event.target.parentNode.parentNode;
    //console.log("PARENTTTTTT : " + parent);
    let cibling = parent.children;//querySelector('li');
    // console.log("cibling.length: " + cibling.length);
    for (let i = 0; i<cibling.length; i++){
      cibling[i].classList.remove('active');
      console.log((i+1) + "- removing class on: " + cibling[i]);
    }
    event.target.parentNode.classList.add('active');

    console.log("event.target.classList: " + event.target.classList);
    //parent.classList.remove('active');

  }

  gotoLogout(event: any) {
    event.preventDefault();
    this.router.navigate(["../autorized/logout"], { relativeTo: this.r });
  }
  gotoHome(event: any) {
    event.preventDefault();
    this.router.navigate(["../autorized/article"], { relativeTo: this.r });
  }

  manageActiveLinkByUrl(url:string){
    if (!(url.indexOf('/autorized/customers') === -1)){
      let parent = this.customers.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.customers.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.customers.nativeElement.classList);
    }
    else if (!(url.indexOf('/autorized/articles') === -1)){
      let parent = this.articles.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.articles.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.articles.nativeElement.classList);
    }

    /*else if (!(url.indexOf('/autorized/services') === -1)){
      let parent = this.services.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.services.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.services.nativeElement.classList);
    }

    else if (!(url.indexOf('/autorized/groups') === -1)){
      let parent = this.groups.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.groups.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.groups.nativeElement.classList);
    }

    else if (!(url.indexOf('/autorized/groupmembers') === -1)){
      let parent = this.groupmembers.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.groupmembers.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.groupmembers.nativeElement.classList);
    }
    else if (!(url.indexOf('/autorized/roles') === -1)){
      let parent = this.roles.nativeElement.parentNode;
      let brothers = parent.children;
      for (let i = 0; i<brothers.length; i++){
        brothers[i].classList.remove('active');
        console.log((i+1) + "- removing class on: " + brothers[i]);
      }
      this.roles.nativeElement.classList.add('active');
      console.log("event.target.classList: " + this.roles.nativeElement.classList);
    }*/

  }

  canManageArticles():boolean{
    return appStore.getState().userState.user.getCanwritearticle();
  }

  changePassword(post) {
    //this.tenantId = post.tenantId;
    this.message = '';
    this.success = false;
    this.failiure = false;
    this.loading = true;

    console.log(JSON.stringify(post));

    this.currentpassword = post.currentpassword;
    this.newpassword = post.newpassword;
    this.newpasswordrep = post.newpasswordrep;

    this.errorMessage = '';
    this.successMessage = '';

    if (this.currentpassword==='' || this.newpassword==='' || this.newpassword !== this.newpasswordrep){
      if (this.currentpassword == ''){
        this.errorMessage = "Current password can not be empty";
        return;
      }
      if (this.newpassword === ''){
        this.errorMessage = "New password can not be empty";
        return;
      }

      if (this.newpassword !== this.newpasswordrep){
        this.errorMessage = "New Password an the repeated one are different";
        return;
      }

    }

    const body = {
      currentPassword: this.currentpassword,
      changedPassword: this.newpassword
    };


    console.log("Body: " + JSON.stringify(body));
    let url: string = BASE_API_URL /*+ encodeURIComponent(appStore.getState().tenantState.tenant.getTenantId()) +
      "/users/" + appStore.getState().userState.user.getUsername() +  "/password"*/;
    console.log("url: " + url);
    this.httpClient.post(url, body, {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
        /*.set('Authorization', 'Bearer '+ appStore.getState().tokenState.token.accessToken)*/
    }).subscribe((data) => {

      console.log("data change password: " + JSON.stringify(data));
      this.success = true;
      this.message = 'Save successfully';

      setTimeout(()=>{
        this.abandonne();
      },2500);
    }, (data) => {
      console.log("Errorrrrrrr", data);
      this.failiure = true;
      this.message = 'Failed: ' + JSON.stringify(data);
    }, ()=>{
      this.loading = false;
    });

  }

  openChangePasswordUI(content){
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      console.log("Opening modal...");
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  abandonne() {
    this.modalReference.close();
  }

}
