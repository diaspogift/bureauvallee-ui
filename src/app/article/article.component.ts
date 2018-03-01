import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Article} from '../domain/model/Article';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {appStore} from '../store/AppStore';
import {BASE_API_URL} from '../Constante';
import {User} from '../domain/model/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  title: string;
  object: string;
  body: string;

  dataSource: Article[];
  failedCustomerToSend: any;
  user: User;
  createdArticle: any;

  displayedColumns = ['id', 'title', 'object', 'body', 'createdBy', 'createdAt', 'updatedAt', 'publishedBy', 'publishedOn', 'actions'];

  failiure: boolean;
  success: boolean;
  loading: boolean;
  message: string;
  rFormNewArticle: FormGroup;

  modalReference: any;
  dataSourceMatTable: MatTableDataSource<Article>;
  //@ViewChild("registrationInvitationmModal", {read: ElementRef}) registrationInvitationmModal: ElementRef;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private httpClient: HttpClient, private route: Router, private r:ActivatedRoute) {
    this.failiure = false;
    this.success = false;
    this.loading = false;
    this.message = '';
    console.log("TenantComponent constructor");
    this.user = appStore.getState().userState.user;

    this.rFormNewArticle = fb.group({
      //'tenantId' : [null, Validators.required],
      'title' : [null, Validators.required],
      'object' : [null, Validators.required],
      'body' : [null, Validators.required],
      //'until' : [null, Validators.required],
      //'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      //'validate' : ''
    });

    this.createdArticle = null;

    this.dataSourceMatTable = new MatTableDataSource<Article>(this.dataSource);

  }

  ngAfterViewInit() {
    this.dataSourceMatTable.paginator = this.paginator;
  }



  ngOnInit() {

    this.failedCustomerToSend = null;
    //let leToken : string = appStore.getState().tokenState.token.accessToken;

    //console.log("leTokenleTokenleToken: " + leToken);

    this.failiure = false;
    this.loading = true;
    this.failiure = false;
    this.success = false;

    this.httpClient.get(BASE_API_URL + "articles?api_token=" + appStore.getState().userState.user.getToken(), {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')

    }).subscribe((data)=>{
      this.success = true;
      this.failiure = false;
      this.message = '';
      console.log("Artocles : " + JSON.stringify(data));
      let receivedData = data['articles'];
      let index: number;
      this.dataSource = [];
      console.log("LENGTH LENGTH LENGTH: " + receivedData.length);
      for (index=0; index < receivedData.length; index++){
        let anArticle: Article = new Article(
          receivedData[index]['id'],
          receivedData[index]['title'],
          receivedData[index]['body'],
          receivedData[index]['object'],
          receivedData[index]['created_by'],
          receivedData[index]['created_at'],
          receivedData[index]['updated_at'],
          receivedData[index]['published_by'],
          receivedData[index]['published_on'],
          receivedData[index]['created_by_name'],
          receivedData[index]['publised_by_name']);
        console.log(index + " - adding: " + JSON.stringify(anArticle));
        this.dataSource.push(anArticle);
      }

      console.log("Artoucles: " + JSON.stringify(this.dataSource));
      this.dataSourceMatTable = new MatTableDataSource<Article>(this.dataSource);
      this.ngAfterViewInit();
      //let user: User = new User(data['tenantId'], data['username'], data['emailAddress']);
      //constructor(tenantId: string, name: string, description: string, isActive: boolean, links: any){
    }, (data)=>{
      this.loading = false;
      this.failiure = true;
      this.success = false;
      this.message = 'Fail to retrive articles' ;

    }, ()=>{
      setTimeout(()=>{
        this.loading = false;
      }, 0);


    });
  }

  abandonne() {
    this.modalReference.close();
  }

  openNewArticle(content) {
    this.message = '';
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      console.log("Opening modal...");
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createNewArticle(form){

    this.message = '';
    this.title = form.title;
    this.object = form.object;
    this.body = form.body;


    if(this.title === '' ){
      this.message = 'Tous les champ sont obligatoire';
      this.failiure = true;
      this.success = false;
      this.loading = false;
      return ;
    }


    this.loading = true;
    this.message = '';
    this.failiure = false;
    this.success = false;

    this.createdArticle = null;


    this.httpClient.post(BASE_API_URL + "articles", {}, {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      params: new HttpParams().set('title', this.title).set('object', this.object).set('body', this.body)
        .set('api_token', appStore.getState().userState.user.getToken())
    }).subscribe((data)=>{

      this.loading = false;
      this.success = true;
      this.failiure = false;
      console.log("Response data: " + JSON.stringify(data));
      this.message = 'Creer avec success...';

      this.createdArticle = data;

      this.ngOnInit();

      this.rFormNewArticle.reset();

      this.failedCustomerToSend = null;


    }, (data) => {
      this.message = "Une erreur est survenu: " + data;
      this.failiure = true;
      this.success = false;
      this.loading = false;
    },()=>{
      this.loading = false;
    });
  }

  publish(){

    if (!(this.createdArticle === null)){
      this.loading = true;
      this.message = '';
      this.failiure = false;
      this.success = false;


      this.httpClient.request('put', BASE_API_URL + "articles/" + this.createdArticle['id'],
        {
          headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8'),
          params: new HttpParams()//.set('title', this.title).set('object', this.object).set('body', this.body)
            .set('api_token', appStore.getState().userState.user.getToken())
        }
      ).subscribe((data)=>{

        this.loading = false;
        this.success = true;
        this.failiure = false;
        console.log("Response data: " + JSON.stringify(data));

        //this.createdArticle = data;



        //return array('success' => $success, 'failed' => $failed);

        this.failedCustomerToSend = data['failed'];

        this.createdArticle = null;

        if(this.failedCustomerToSend.length == 0){
          this.message = 'Publier avec success...';
        }else{
          this.message = '  ';
        }

      }, (data) => {
        this.message = "Une erreur est survenu: " + data;
        this.failiure = true;
        this.success = false;
        this.loading = false;
      },()=>{
        this.loading = false;
      });
    }
  }

  publier(id){
    this.createdArticle = {};
    this.createdArticle['id'] = id;
    this.publish();
  }
}
