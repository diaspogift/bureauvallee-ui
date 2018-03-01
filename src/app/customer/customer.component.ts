import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Customer} from '../domain/model/Customer';
import {Article} from '../domain/model/Article';
import {appStore} from '../store/AppStore';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BASE_API_URL} from '../Constante';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../domain/model/User';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['id', 'name', 'email', 'phonenumber', 'country', 'city', 'address'];

  user: User;

  customers: Customer[];
  success: boolean;
  failiure: boolean;
  loading: boolean;
  message: string;

  dataSourceMatTable: MatTableDataSource<Customer>;

  modalReference: any;

  firstname:string;
  lastname: string;
  email: string;
  phonenumber: string;
  country: string;
  city: string;
  address:string;

  rFormNewCustomer: FormGroup;
  createdCustomer : any;
  messageNew: string

  constructor(private modalService: NgbModal, private fb: FormBuilder, private httpClient: HttpClient, private route: Router, private r:ActivatedRoute) {
    this.failiure = false;
    this.success = false;
    this.loading = false;
    this.message = '';
    this.dataSourceMatTable = new MatTableDataSource<Customer>(this.customers);
    this.user = appStore.getState().userState.user;
    this.messageNew = '';

    this.rFormNewCustomer = fb.group({
      'email' : [null, Validators.required],
      'phonenumber' : [null, Validators.required],
      'firstname': [null],
      'lastname': [null],
      'country':[null],
      'city': [null],
      'address': [null]

    });
    //protected $fillable = ['firstname', 'lastname', 'email', 'phonenumber', 'country', 'city', 'address'];

  }

  ngAfterViewInit() {
    this.dataSourceMatTable.paginator = this.paginator;
  }


  ngOnInit() {

    this.failiure = false;
    this.loading = true;
    this.failiure = false;
    this.success = false;

    this.httpClient.get(BASE_API_URL + "customers?api_token=" + appStore.getState().userState.user.getToken(), {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')

    }).subscribe((data)=>{
      this.success = true;
      this.failiure = false;
      this.message = 'Success';
      console.log("Customers : " + JSON.stringify(data));
      let receivedData = data['customers'];
      let index: number;
      this.customers = [];
      console.log("LENGTH LENGTH LENGTH: " + receivedData.length);
      for (index=0; index < receivedData.length; index++){
        let aCustomer: Customer = new Customer(
          "" + receivedData[index]['id'],
          receivedData[index]['firstname'],
          receivedData[index]['lastname'],
          receivedData[index]['email'],
          receivedData[index]['phonenumber'],
          receivedData[index]['country'],
          receivedData[index]['city'],
          receivedData[index]['address'],
          receivedData[index]['created_at'],
          receivedData[index]['updated_at']);
        console.log(index + " - adding: " + JSON.stringify(aCustomer));
        this.customers.push(aCustomer);
      }
//constructor(id:string, firstname: string, lastname: string, email: string, phonenumber: string, country: string,
     // city: string, address: string, created_at: string, updated_at: string){
      console.log("Artoucles: " + JSON.stringify(this.customers));
      this.dataSourceMatTable = new MatTableDataSource<Customer>(this.customers);
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

  openRegisterUser(content) {
    this.messageNew = '';
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      console.log("Opening modal...");
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //protected $fillable = ['firstname', 'lastname', 'email', 'phonenumber', 'country', 'city', 'address'];
  createNewCustomer(form: any) {

    this.messageNew = '';
    this.firstname = form.firstname;
    this.lastname = form.lastname;
    this.email = form.email;
    this.phonenumber = form.phonenumber;
    this.country = form.country;
    this.city = form.city;
    this.address = form.address;



    this.loading = true;
    this.messageNew = '';
    this.failiure = false;
    this.success = false;

    this.createdCustomer = null;

    let httpParams:HttpParams = new HttpParams().set('api_token', appStore.getState().userState.user.getToken())
      .set('email',this.email).set('phonenumber', this.phonenumber);

    if(!(this.firstname === null)){
      httpParams = httpParams.set('firstname', this.firstname);
    }

    if(!(this.lastname === null)){
      httpParams = httpParams.set('lastname', this.lastname);
    }

    if(!(this.country === null)){
      httpParams = httpParams.set('country', this.country);
    }

    if(!(this.city === null)){
      httpParams = httpParams.set('city', this.city);
    }

    if(!(this.address === null)){
      httpParams = httpParams.set('address', this.address);
    }

    this.httpClient.post(BASE_API_URL + "customers", {}, {
      headers: new HttpHeaders().set('Accept', 'application/json').set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      params: httpParams
    }).subscribe((data)=>{

      this.loading = false;
      this.success = true;
      this.failiure = false;
      //console.log("Response data: " + JSON.stringify(data));
      this.messageNew = 'Enregistre avec success';

      console.log("this.message: " + this.messageNew);

      if(data['type'] == 'old'){
        this.messageNew = "Le client dont l'email est: " + data['customer']['email'] + " Existe deja dans le systeme";
      }

      this.createdCustomer = data['customer'];

      this.ngOnInit();

      this.rFormNewCustomer.reset();

      //this.failedCustomerToSend = null;


    }, (data) => {
      this.message = "Une erreur est survenu: " + data;
      this.failiure = true;
      this.success = false;
      this.loading = false;
    },()=>{
      this.loading = false;
    });
  }

  abandonne() {
    this.modalReference.close();
  }
}
