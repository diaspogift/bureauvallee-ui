
import {Routes} from "@angular/router";
import {AuthComponent} from "../auth/auth.component";
import {AutorizationComponent} from "../autorization/autorization.component";
import {ArticleComponent} from "../article/article.component";
import {AuthorizationGuard} from '../guards/authorization.guard';
import {NotAutorizedComponent} from '../not-autorized/not-autorized.component';
import {LogoutComponent} from '../logout/logout.component';
import {CustomerComponent} from '../customer/customer.component';


export const childRoutes : Routes = [
  {path:'', redirectTo:'articles', pathMatch:'full'},
  {path:'articles', component:ArticleComponent},
  {path:'customers', component:CustomerComponent},
  {path:'logout', component:LogoutComponent},
];

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth/', component: AuthComponent},
  { path: 'autorized', component: AutorizationComponent, canActivate: [AuthorizationGuard], children:childRoutes},
  { path: 'notautorized', component: NotAutorizedComponent},
  { path: '**', component: AuthComponent}
];

// considerer la desactivation du guard




