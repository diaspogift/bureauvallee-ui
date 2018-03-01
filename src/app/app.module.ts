import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CookieService} from "ng2-cookies";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthComponent } from './auth/auth.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { ArticleComponent } from './article/article.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {AuthService} from './auth/AuthService';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotAutorizedComponent } from './not-autorized/not-autorized.component';
import {childRoutes, routes} from './route-config/Config';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormField, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTable, MatTableModule} from '@angular/material';
import {BsModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AuthComponent,
    AutorizationComponent,
    ArticleComponent,
    NotAutorizedComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes), // <-- routes
    RouterModule.forRoot(childRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    BsModalModule,
    MatPaginatorModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: AuthService, useClass: AuthService }, { provide: AuthorizationGuard, useClass: AuthorizationGuard },
    {provide:NgbActiveModal, useClass:NgbActiveModal},
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
